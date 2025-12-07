// Game State
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;
let isAnswered = false;
let audioPlayer = null;
// 图片缓存对象，用于存储已预加载的图片
let imageCache = {};
let preloadComplete = false;

// DOM Elements
const pages = {
    home: document.getElementById('home-page'),
    quiz: document.getElementById('quiz-page'),
    explanation: document.getElementById('explanation-page'),
    result: document.getElementById('result-page'),
    leaderboard: document.getElementById('leaderboard-page')
};

// Quiz Elements
const questionNumEl = document.getElementById('current-question-num');
const scoreEl = document.getElementById('current-score');
const timerFillEl = document.getElementById('timer-fill');
const timeLeftEl = document.getElementById('time-left');
const mediaAreaEl = document.getElementById('media-area');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');

// Explanation Elements
const resultIconEl = document.getElementById('result-icon');
const resultTitleEl = document.getElementById('result-title');
const correctAnswerTextEl = document.getElementById('correct-answer-text');
const explanationTextEl = document.getElementById('explanation-text');
const nextCountdownEl = document.getElementById('next-countdown');

// Result Elements
const finalScoreNumEl = document.getElementById('final-score-num');
const fanLevelTitleEl = document.getElementById('fan-level-title');
const fanLevelDescEl = document.getElementById('fan-level-desc');
const nicknameInputEl = document.getElementById('nickname-input');

// Audio
const bgmPlayer = document.getElementById('bgm-player');

// 预加载所有图片
function preloadImages() {
    let loadedCount = 0;
    const imageQuestions = questionBank.filter(q => q.type === 'image' && q.media);
    
    if (imageQuestions.length === 0) {
        preloadComplete = true;
        return;
    }
    
    // 创建加载指示器
    const loadingIndicatorEl = document.createElement('div');
    loadingIndicatorEl.id = 'loading-indicator';
    loadingIndicatorEl.textContent = '加载资源中...';
    loadingIndicatorEl.style.position = 'fixed';
    loadingIndicatorEl.style.top = '50%';
    loadingIndicatorEl.style.left = '50%';
    loadingIndicatorEl.style.transform = 'translate(-50%, -50%)';
    loadingIndicatorEl.style.fontSize = '18px';
    loadingIndicatorEl.style.zIndex = '1000';
    document.body.appendChild(loadingIndicatorEl);
    
    imageQuestions.forEach(q => {
        const img = new Image();
        img.onload = () => {
            // 图片加载成功，存入缓存
            imageCache[q.media] = img;
            loadedCount++;
            
            // 更新加载进度
            loadingIndicatorEl.textContent = `加载资源中... ${loadedCount}/${imageQuestions.length}`;
            
            if (loadedCount === imageQuestions.length) {
                preloadComplete = true;
                // 隐藏加载指示器
                loadingIndicatorEl.style.display = 'none';
                console.log('所有图片预加载完成');
            }
        };
        
        img.onerror = () => {
            console.error(`图片加载失败: ${q.media}`);
            loadedCount++;
            
            // 即使加载失败也继续
            loadingIndicatorEl.textContent = `加载资源中... ${loadedCount}/${imageQuestions.length}`;
            
            if (loadedCount === imageQuestions.length) {
                preloadComplete = true;
                loadingIndicatorEl.style.display = 'none';
            }
        };
        
        // 开始加载图片
        img.src = q.media;
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后预加载图片
    preloadImages();
    
    // 确保设置事件监听器和加载排行榜
    setupEventListeners();
    // Initialize global leaderboard
    initializeGlobalLeaderboard();
    loadLeaderboard();
});

function setupEventListeners() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('rank-btn-home').addEventListener('click', () => {
    // Clear current user score info when accessing leaderboard from home
    currentUserScoreInfo = null;
    showPage('leaderboard');
});
    document.getElementById('quit-btn').addEventListener('click', confirmQuit);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-score-btn').addEventListener('click', submitScore);
    document.getElementById('restart-btn').addEventListener('click', () => showPage('home'));
    document.getElementById('back-home-btn').addEventListener('click', () => showPage('home'));
}

function showPage(pageName) {
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    pages[pageName].classList.remove('hidden');
    pages[pageName].classList.add('active');
    
    // Load leaderboard when switching to leaderboard page
    if (pageName === 'leaderboard') {
        loadLeaderboard();
    }
}

function startGame() {
    // Reset State
    score = 0;
    currentQuestionIndex = 0;

    // Select 10 random questions
    currentQuestions = getRandomQuestions(10);
    
    // 调试输出：验证题目类型和难度分布
    console.log('======= 题目分配统计 =======');
    const typeStats = {};
    const difficultyStats = {};
    
    currentQuestions.forEach(q => {
        // 统计类型
        typeStats[q.type] = (typeStats[q.type] || 0) + 1;
        // 统计难度
        difficultyStats[q.difficulty] = (difficultyStats[q.difficulty] || 0) + 1;
    });
    
    console.log('类型分布:', typeStats);
    console.log('难度分布:', difficultyStats);
    console.log('===========================');

    showPage('quiz');
    loadQuestion();
}

function getRandomQuestions(count) {
    // 类型比例：文本60%、音乐30%、图片10%
    const typeDistribution = {
        'text': Math.round(count * 0.6),  // 6题
        'audio': Math.round(count * 0.3), // 3题
        'image': Math.round(count * 0.1)  // 1题
    };
    
    // 难度比例：简单40%、中等30%、困难30%
    const difficultyDistribution = {
        'easy': 0.4,    // 40%
        'medium': 0.3,  // 30%
        'hard': 0.3     // 30%
    };
    
    const selectedQuestions = [];
    const usedIds = new Set(); // 用于跟踪已选中的题目ID，避免重复
    
    // 按类型分配题目
    Object.entries(typeDistribution).forEach(([type, typeCount]) => {
        // 获取该类型的所有题目
        let typeQuestions = questionBank.filter(q => q.type === type && !usedIds.has(q.id));
        
        // 如果该类型题目不足，尽可能选择所有可用的
        const actualTypeCount = Math.min(typeCount, typeQuestions.length);
        
        // 文本题、音乐题和图片题都采用相同的等概率抽取方式
        if (actualTypeCount > 0) {
            // 直接从所有该类型题目中随机选择所需数量
            const shuffled = [...typeQuestions].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, actualTypeCount);
            
            selected.forEach(q => {
                selectedQuestions.push(q);
                usedIds.add(q.id);
            });
        }
    });
    
    // 如果题目总数不足10题，从剩余题目中随机补充
    if (selectedQuestions.length < count) {
        const remainingQuestions = questionBank.filter(q => !usedIds.has(q.id));
        const neededCount = count - selectedQuestions.length;
        
        const shuffledRemaining = [...remainingQuestions].sort(() => 0.5 - Math.random());
        const additionalQuestions = shuffledRemaining.slice(0, neededCount);
        
        selectedQuestions.push(...additionalQuestions);
    }
    
    // 最后打乱题目顺序
    return selectedQuestions.sort(() => 0.5 - Math.random());
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    isAnswered = false;

    // Update UI
    questionNumEl.textContent = currentQuestionIndex + 1;
    scoreEl.textContent = score;
    questionTextEl.textContent = q.question;
    optionsContainerEl.innerHTML = '';
    mediaAreaEl.innerHTML = '';
    mediaAreaEl.classList.add('hidden');



    // Handle Media
    if (q.type === 'image' && q.media) {
        mediaAreaEl.classList.remove('hidden');
        // 为图片题添加特殊类名，用于应用不同的选项布局
        optionsContainerEl.classList.add('image-question-options');
        
        const img = document.createElement('img');
        
        // 设置图片样式，确保更好的显示效果
        img.style.maxWidth = '100%';
        img.style.maxHeight = '300px';
        img.style.objectFit = 'contain';
        img.style.display = 'none'; // 初始隐藏，加载成功后显示
        
        // 创建加载指示器
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'image-loading';
        loadingIndicator.textContent = '图片加载中...';
        loadingIndicator.style.textAlign = 'center';
        loadingIndicator.style.padding = '20px';
        
        // 创建错误提示元素
        const errorIndicator = document.createElement('div');
        errorIndicator.className = 'image-error';
        errorIndicator.innerHTML = `
            <div style="margin-bottom: 10px;">图片加载失败</div>
            <button id="retry-img-btn" style="
                padding: 8px 16px;
                background-color: #2196F3;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            ">重试</button>
        `;
        errorIndicator.style.display = 'none';
        errorIndicator.style.textAlign = 'center';
        errorIndicator.style.padding = '20px';
        
        mediaAreaEl.appendChild(loadingIndicator);
        mediaAreaEl.appendChild(img);
        mediaAreaEl.appendChild(errorIndicator);
        
        // 图片加载成功处理
        img.onload = function() {
            clearTimeout(loadTimeout); // 清除超时计时器
            img.style.display = 'block';
            loadingIndicator.style.display = 'none';
            errorIndicator.style.display = 'none';
        };
        
        // 图片加载错误处理
        img.onerror = function() {
            console.error('图片加载失败:', q.media);
            img.style.display = 'none';
            loadingIndicator.style.display = 'none';
            errorIndicator.style.display = 'block';
            
            // 添加重试按钮事件
            const retryBtn = errorIndicator.querySelector('#retry-img-btn');
            retryBtn.onclick = function() {
                // 隐藏错误提示，显示加载中
                errorIndicator.style.display = 'none';
                loadingIndicator.style.display = 'block';
                
                // 清除缓存中的失败图片
                delete imageCache[q.media];
                
                // 重新加载图片
                img.src = '';
                setTimeout(() => {
                    img.src = q.media;
                }, 100);
            };
        };
        
        // 设置加载超时
        let loadTimeout;
        
        // 设置图片源
        if (imageCache[q.media] && imageCache[q.media].complete) {
            img.src = imageCache[q.media].src;
        } else {
            // 如果缓存中没有或未完成加载，则直接设置src
            // 同时更新缓存
            const cachedImg = imageCache[q.media] || new Image();
            cachedImg.onload = img.onload;
            cachedImg.onerror = img.onerror;
            cachedImg.src = q.media;
            imageCache[q.media] = cachedImg;
            
            // 设置图片源并添加超时处理
            img.src = q.media;
            
            // 5秒后如果图片仍未加载完成，则触发错误处理
            loadTimeout = setTimeout(() => {
                if (!img.complete) {
                    console.warn('图片加载超时:', q.media);
                    img.onerror(); // 触发错误处理
                }
            }, 5000);
        }
    } else {
        // 非图片题移除特殊类名
        optionsContainerEl.classList.remove('image-question-options');
        
        if (q.type === 'audio' && q.media) {
            mediaAreaEl.classList.remove('hidden');
            const playBtn = document.createElement('div');
            playBtn.className = 'audio-control';
            playBtn.innerHTML = '▶';
            playBtn.onclick = () => toggleAudio(q.media, playBtn);
            mediaAreaEl.appendChild(playBtn);

            // Auto play audio
            playAudio(q.media, playBtn);
        }
    }

    // Render Options - 将包含"选项都是"的选项放在最后
    // 创建选项副本以便重新排序
    const sortedOptions = [...q.options];
    const allOptionsIndex = sortedOptions.findIndex(opt => opt.includes('选项都是'));
    
    // 如果找到"选项都是"的选项，则将其移到数组末尾
    if (allOptionsIndex !== -1) {
        const allOptions = sortedOptions.splice(allOptionsIndex, 1)[0];
        sortedOptions.push(allOptions);
    }
    
    // 渲染排序后的选项
    sortedOptions.forEach((opt, index) => {
        // 找到原始索引，因为handleAnswer需要知道原始的选项索引
        const originalIndex = q.options.indexOf(opt);
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(originalIndex, btn);
        optionsContainerEl.appendChild(btn);
    });

    // Start Timer
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    timeLeftEl.textContent = timeLeft;
    const percentage = (timeLeft / 10) * 100;
    timerFillEl.style.width = `${percentage}%`;

    if (timeLeft <= 3) {
        timerFillEl.style.backgroundColor = '#f44336';
    } else {
        timerFillEl.style.backgroundColor = '#00e5ff';
    }
}

// 音频自动暂停定时器
let audioTimer;

function stopAudio() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer = null;
    }
    // 清除自动暂停定时器
    if (audioTimer) {
        clearTimeout(audioTimer);
        audioTimer = null;
    }
}

function playAudio(src, btn) {
    stopAudio();
    audioPlayer = new Audio(src);
    // 确保从音频开始播放
    audioPlayer.currentTime = 0;
    audioPlayer.play().catch(e => console.log("Audio play failed (interaction needed)", e));
    
    audioPlayer.onended = () => {
        btn.innerHTML = '▶';
    };
    
    btn.innerHTML = '⏸';
    
    // 设置5秒后自动暂停
    audioTimer = setTimeout(() => {
        if (audioPlayer) {
            audioPlayer.pause();
            btn.innerHTML = '▶';
        }
    }, 5000);
}

function toggleAudio(src, btn) {
    if (audioPlayer && !audioPlayer.paused) {
        // 如果正在播放，暂停
        audioPlayer.pause();
        btn.innerHTML = '▶';
        // 清除自动暂停定时器
        if (audioTimer) {
            clearTimeout(audioTimer);
            audioTimer = null;
        }
    } else {
        // 如果已暂停或未播放，重新播放前5秒
        playAudio(src, btn);
    }
}

function handleAnswer(selectedIndex, btnElement) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    stopAudio();

    const currentQ = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.answer;

    if (isCorrect) {
        score += 10;
        btnElement.classList.add('correct');
        showExplanation(true);
    } else {
        btnElement.classList.add('wrong');
        // Highlight correct answer
        const options = optionsContainerEl.children;
        options[currentQ.answer].classList.add('correct');
        showExplanation(false);
    }
}

function handleTimeout() {
    if (isAnswered) return;
    isAnswered = true;
    stopAudio();

    // Highlight correct answer
    const currentQ = currentQuestions[currentQuestionIndex];
    const options = optionsContainerEl.children;
    if (options[currentQ.answer]) {
        options[currentQ.answer].classList.add('correct');
    }

    showExplanation(false, true);
}

let nextTimerInterval;

function showExplanation(isCorrect, isTimeout = false) {
    setTimeout(() => {
        showPage('explanation');

        const currentQ = currentQuestions[currentQuestionIndex];

        if (isCorrect) {
            resultIconEl.textContent = '✅';
            resultTitleEl.textContent = '回答正确!';
            resultTitleEl.style.color = '#4caf50';
        } else {
            resultIconEl.textContent = '❌';
            resultTitleEl.textContent = isTimeout ? '时间到!' : '回答错误!';
            resultTitleEl.style.color = '#f44336';
        }

        correctAnswerTextEl.textContent = currentQ.options[currentQ.answer];
        explanationTextEl.textContent = currentQ.explanation;

        // Auto jump countdown
        let jumpTime = 5;
        nextCountdownEl.textContent = jumpTime;

        clearInterval(nextTimerInterval);
        nextTimerInterval = setInterval(() => {
            jumpTime--;
            nextCountdownEl.textContent = jumpTime;
            if (jumpTime <= 0) {
                clearInterval(nextTimerInterval);
                nextQuestion();
            }
        }, 1000);

    }, 1000); // Small delay to see the button color
}

function nextQuestion() {
    clearInterval(nextTimerInterval);
    currentQuestionIndex++;
    showPage('quiz');
    loadQuestion();
}

function confirmQuit() {
    if (confirm("确定要退出游戏返回首页吗？当前进度将丢失。")) {
        clearInterval(timerInterval);
        clearInterval(nextTimerInterval);
        stopAudio();
        showPage('home');
    }
}

function endGame() {
    showPage('result');
    finalScoreNumEl.textContent = score;

    let level = '';
    let desc = '';

    if (score >= 100) {
        level = '钻粉';
        desc = '无与伦比！你就是周杰伦本人吧？';
    } else if (score >= 90) {
        level = '金粉';
        desc = '哎哟，不错哦！绝对的资深杰迷！';
    } else if (score >= 80) {
        level = '银粉';
        desc = '很强！大部分歌都难不倒你。';
    } else if (score >= 70) {
        level = '铜粉';
        desc = '还可以，继续加油！';
    } else if (score >= 60) {
        level = '铁粉';
        desc = '及格了，多听听歌吧！';
    } else {
        level = '路人粉';
        desc = '看来你需要去补补课了~';
    }

    fanLevelTitleEl.textContent = level;
    fanLevelDescEl.textContent = desc;
}

// Leaderboard Logic (Global Online Rank)

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC95b6666666666666666666666666666",
    authDomain: "jay-quiz-12345.firebaseapp.com",
    databaseURL: "https://jay-quiz-12345-default-rtdb.firebaseio.com",
    projectId: "jay-quiz-12345",
    storageBucket: "jay-quiz-12345.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
let firebaseApp, database;
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebaseApp.database();
    console.log("Firebase initialized successfully!");
} catch (error) {
    console.error("Firebase initialization failed:", error);
    // Fallback to localStorage if Firebase fails
    console.log("Falling back to localStorage for leaderboard storage.");
}

// Global leaderboard key in localStorage (fallback)
const GLOBAL_LEADERBOARD_KEY = 'jayQuizGlobalLeaderboard';

// Initialize global leaderboard (fallback)
function initializeGlobalLeaderboard() {
    // Only initialize if leaderboard doesn't exist in localStorage
    if (!localStorage.getItem(GLOBAL_LEADERBOARD_KEY)) {
        localStorage.setItem(GLOBAL_LEADERBOARD_KEY, JSON.stringify([]));
    }
}

// Get leaderboard from localStorage (fallback)
function getGlobalLeaderboard() {
    return JSON.parse(localStorage.getItem(GLOBAL_LEADERBOARD_KEY) || '[]');
}

// Get leaderboard from Firebase
async function fetchLeaderboardFromFirebase() {
    try {
        const snapshot = await database.ref('leaderboard').orderByChild('score').limitToLast(100).once('value');
        const leaderboard = [];
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            leaderboard.push({
                id: childSnapshot.key,
                ...childData
            });
        });
        // Sort by score descending
        return leaderboard.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error("Error fetching leaderboard from Firebase:", error);
        return [];
    }
}

// Submit score to Firebase
async function submitScoreToFirebase(name, score, level) {
    try {
        await database.ref('leaderboard').push({
            name: name,
            score: score,
            level: level,
            date: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error submitting score to Firebase:", error);
        return false;
    }
}

// Calculate fan level based on score
function calculateFanLevel(score) {
    if (score >= 100) {
        return '钻粉';
    } else if (score >= 90) {
        return '金粉';
    } else if (score >= 80) {
        return '银粉';
    } else if (score >= 70) {
        return '铜粉';
    } else if (score >= 60) {
        return '铁粉';
    } else {
        return '路人粉';
    }
}

// Track current user's score information for ranking display
let currentUserScoreInfo = null;

async function submitScore() {
    const nickname = nicknameInputEl.value.trim();
    if (!nickname) {
        alert("请输入昵称！");
        return;
    }

    // Calculate fan level for new score
    const level = calculateFanLevel(score);
    
    // Store current user's score information
    currentUserScoreInfo = {
        name: nickname,
        score: score,
        level: level
    };
    
    // Try to submit score to Firebase first
    if (database) {
        const success = await submitScoreToFirebase(nickname, score, level);
        if (success) {
            showPage('leaderboard');
            renderLeaderboard();
            return;
        }
    }
    
    // Fallback to localStorage if Firebase fails
    console.log("Using localStorage as fallback for leaderboard.");
    let leaderboard = getGlobalLeaderboard();
    
    // Create new entry
    const newEntry = {
        id: Date.now(),
        name: nickname,
        score: score,
        level: level,
        date: new Date().toISOString()
    };
    
    // Add to leaderboard
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Save back to localStorage
    localStorage.setItem(GLOBAL_LEADERBOARD_KEY, JSON.stringify(leaderboard));
    
    showPage('leaderboard');
    renderLeaderboard();
}

async function loadLeaderboard() {
    await renderLeaderboard();
}

async function renderLeaderboard() {
    const listEl = document.getElementById('leaderboard-list');
    
    // Show loading state
    listEl.innerHTML = '<div style="padding:20px;text-align:center;color:#666;">加载前10名排名榜数据中...</div>';
    
    let leaderboard = [];
    let isFirebase = false;
    
    // Try to fetch data from Firebase first
    if (database) {
        leaderboard = await fetchLeaderboardFromFirebase();
        isFirebase = leaderboard.length > 0;
    }
    
    // Fallback to localStorage if Firebase fails or returns no data
    if (!isFirebase) {
        console.log("Using localStorage as fallback for leaderboard display.");
        leaderboard = getGlobalLeaderboard();
        // Sort by score descending
        leaderboard.sort((a, b) => b.score - a.score);
    }

    listEl.innerHTML = '';

    // Check if we need to show user's rank (only when coming from result page)
    let userRank = -1;
    if (currentUserScoreInfo) {
        // Calculate user's rank across all players
        userRank = leaderboard.findIndex(entry => 
            entry.name === currentUserScoreInfo.name && 
            entry.score === currentUserScoreInfo.score
        ) + 1;
        
        // If not found, calculate based on score
        if (userRank === 0) {
            // Create a temporary entry for ranking calculation
            const tempLeaderboard = [...leaderboard, currentUserScoreInfo];
            tempLeaderboard.sort((a, b) => b.score - a.score);
            userRank = tempLeaderboard.findIndex(entry => 
                entry.name === currentUserScoreInfo.name && 
                entry.score === currentUserScoreInfo.score
            ) + 1;
        }
        
        // Add user rank display at the top
        const userRankEl = document.createElement('div');
        userRankEl.className = 'user-rank-display';
        userRankEl.innerHTML = `
            <div class="user-rank-content">
                <h3>你的排名为第${userRank}名</h3>
                <p>得分: ${currentUserScoreInfo.score}分 | 等级: ${currentUserScoreInfo.level}</p>
            </div>
        `;
        listEl.appendChild(userRankEl);
    }

    // Add table header
    const headerEl = document.createElement('div');
    headerEl.className = 'rank-header';
    headerEl.innerHTML = `
        <span class="rank-num">序号</span>
        <span class="rank-name">玩家</span>
        <span class="rank-level">粉级</span>
        <span class="rank-score">得分</span>
        <span class="rank-date">日期</span>
    `;
    listEl.appendChild(headerEl);

    if (leaderboard.length === 0) {
        const emptyEl = document.createElement('div');
        emptyEl.style.padding = '20px';
        emptyEl.style.textAlign = 'center';
        emptyEl.style.color = '#666';
        emptyEl.textContent = '暂无数据，快来挑战吧！';
        listEl.appendChild(emptyEl);
        return;
    }

    // Display only top 10 entries
    leaderboard.slice(0, 10).forEach((item, index) => {
        // Format date to readable format
        const formattedDate = new Date(item.date).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const div = document.createElement('div');
        div.className = 'rank-item';
        div.innerHTML = `
            <span class="rank-num">${index + 1}</span>
            <span class="rank-name">${item.name}</span>
            <span class="rank-level">${item.level}</span>
            <span class="rank-score">${item.score}分</span>
            <span class="rank-date">${formattedDate}</span>
        `;
        listEl.appendChild(div);
    });
}
