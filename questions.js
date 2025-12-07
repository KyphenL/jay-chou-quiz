// 洗牌函数，用于随机打乱选项并更新答案索引
function shuffleOptions() {
    questionBank.forEach(question => {
        // 只处理有options数组的题目
        if (question.options && Array.isArray(question.options)) {
            // 保存原始答案内容
            const correctAnswer = question.options[question.answer];
            
            // Fisher-Yates 洗牌算法
            for (let i = question.options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                // 交换元素
                [question.options[i], question.options[j]] = [question.options[j], question.options[i]];
            }
            
            // 重新找到正确答案的索引
            question.answer = question.options.indexOf(correctAnswer);
        }
    });
}

const questionBank = [
    // --- 文本题 (Text Questions) [1-40] ---
    {
        id: 1,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的处女作专辑是哪一张？",
        options: ["范特西", "Jay", "八度空间", "叶惠美"],
        answer: 1,
        explanation: "周杰伦的首张专辑《Jay》于2000年11月7日发行。",
        media: null
    },
    {
        id: 2,
        type: 'text',

        difficulty: 'medium',
        question: "歌曲《七里香》收录在同名专辑中，该专辑发行于哪一年？",
        options: ["2002", "2003", "2004", "2005"],
        answer: 2,
        explanation: "《七里香》专辑发行于2004年8月3日。",
        media: null
    },
    {
        id: 3,
        type: 'text',

        difficulty: 'easy',
        question: "“天青色等烟雨，而我在等你”出自哪首歌曲？",
        options: ["发如雪", "青花瓷", "兰亭序", "东风破"],
        answer: 1,
        explanation: "这句经典的歌词出自《青花瓷》。",
        media: null
    },
    {
        id: 4,
        type: 'text',

        difficulty: 'medium',
        question: "周杰伦自导自演的第一部电影是？",
        options: ["头文字D", "大灌篮", "不能说的秘密", "天台爱情"],
        answer: 2,
        explanation: "《不能说的秘密》是周杰伦自导自演的首部电影作品，于2007年上映。",
        media: null
    },
    {
        id: 5,
        type: 'text',

        difficulty: 'hard',
        question: "歌曲《听妈妈的话》中，周杰伦提到了哪位好莱坞巨星？",
        options: ["汤姆·克鲁斯", "威尔·史密斯", "周润发", "成龙"],
        answer: 2,
        explanation: "歌词中提到：“赌神未来是你爸爸”，指周润发。",
        media: null
    },
    {
        id: 6,
        type: 'text',

        difficulty: 'hard',
        question: "《夜曲》这首歌是为了纪念哪位音乐家？",
        options: ["莫扎特", "贝多芬", "肖邦", "巴赫"],
        answer: 2,
        explanation: "《夜曲》收录于《十一月的萧邦》，整张专辑都充满了对肖邦的致敬。",
        media: null
    },
    {
        id: 7,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的御用作词人是？",
        options: ["林夕", "黄伟文", "方文山", "姚谦"],
        answer: 2,
        explanation: "方文山是周杰伦的黄金搭档，创作了无数经典歌词。",
        media: null
    },
    {
        id: 8,
        type: 'text',

        difficulty: 'easy',
        question: "“快使用双截棍，哼哼哈兮”出自哪首歌？",
        options: ["龙拳", "双截棍", "霍元甲", "忍者"],
        answer: 1,
        explanation: "这句歌词出自《双截棍》。",
        media: null
    },
    {
        id: 9,
        type: 'text',

        difficulty: 'medium',
        question: "《稻香》这首歌的创作初衷是为了什么？",
        options: ["纪念童年", "鼓励汶川地震受灾人民", "宣传环保", "描写乡村生活"],
        answer: 1,
        explanation: "周杰伦表示《稻香》是为汶川地震创作的，希望用音乐疗伤。",
        media: null
    },
    {
        id: 10,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦与费玉清合唱的歌曲是？",
        options: ["千里之外", "菊花台", "本草纲目", "红模仿"],
        answer: 0,
        explanation: "两人合唱了经典的《千里之外》。",
        media: null
    },
    {
        id: 11,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的英文名是？",
        options: ["Jay Chou", "Jacky Chou", "Jason Chou", "Jimmy Chou"],
        answer: 0,
        explanation: "周杰伦的英文名是 Jay Chou。",
        media: null
    },
    {
        id: 12,
        type: 'text',

        difficulty: 'medium',
        question: "电影《头文字D》中，周杰伦饰演的角色是？",
        options: ["高桥凉介", "中里毅", "藤原拓海", "须藤京一"],
        answer: 2,
        explanation: "周杰伦饰演主角藤原拓海。",
        media: null
    },
    {
        id: 13,
        type: 'text',

        difficulty: 'medium',
        question: "歌曲《简单爱》收录在哪张专辑？",
        options: ["Jay", "范特西", "八度空间", "叶惠美"],
        answer: 1,
        explanation: "《简单爱》收录于2001年的专辑《范特西》。",
        media: null
    },
    {
        id: 14,
        type: 'text',

        difficulty: 'easy',
        question: "“小朋友 你是否有很多问号”出自哪首歌？",
        options: ["听妈妈的话", "稻香", "外婆", "爷爷泡的茶"],
        answer: 0,
        explanation: "这句歌词出自《听妈妈的话》。",
        media: null
    },
    {
        id: 15,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦在2015年与哪位女星结婚？",
        options: ["蔡依林", "侯佩岑", "昆凌", "林志玲"],
        answer: 2,
        explanation: "周杰伦与昆凌于2015年结婚。",
        media: null
    },
    {
        id: 16,
        type: 'text',

        difficulty: 'hard',
        question: "歌曲《以父之名》的MV拍摄地点是？",
        options: ["巴黎", "伦敦", "罗马", "威尼斯"],
        answer: 2,
        explanation: "《以父之名》的MV在意大利罗马拍摄。",
        media: null
    },
    {
        id: 17,
        type: 'text',

        difficulty: 'hard',
        question: "周杰伦凭借哪首歌获得了第15届金曲奖最佳作词人奖（方文山作词）？",
        options: ["东风破", "七里香", "梯田", "威廉古堡"],
        answer: 2,
        explanation: "方文山凭借《东风破》获得最佳作词人，但周杰伦凭借《梯田》入围。",
        media: null
    },
    {
        id: 18,
        type: 'text',

        difficulty: 'medium',
        question: "“最美的不是下雨天，是曾与你躲过雨的屋檐”出自？",
        options: ["晴天", "不能说的秘密", "彩虹", "蒲公英的约定"],
        answer: 1,
        explanation: "这句歌词出自《不能说的秘密》。",
        media: null
    },
    {
        id: 19,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的粉丝名称通常被称为？",
        options: ["杰迷", "伦粉", "双截棍", "杰伦党"],
        answer: 0,
        explanation: "周杰伦的粉丝通常自称为“杰迷”。",
        media: null
    },
    {
        id: 20,
        type: 'text',

        difficulty: 'medium',
        question: "《牛仔很忙》这首歌的曲风是？",
        options: ["R&B", "中国风", "乡村民谣", "爵士"],
        answer: 2,
        explanation: "《牛仔很忙》是一首美国乡村民谣风格的歌曲。",
        media: null
    },
    {
        id: 21,
        type: 'text',

        difficulty: 'hard',
        question: "周杰伦在哪一年登上了美国《时代》周刊封面？",
        options: ["2001", "2003", "2005", "2008"],
        answer: 1,
        explanation: "周杰伦在2003年成为《时代》周刊亚洲版的封面人物。",
        media: null
    },
    {
        id: 22,
        type: 'text',

        difficulty: 'medium',
        question: "歌曲《本草纲目》中提到了哪位古代医学家？",
        options: ["华佗", "扁鹊", "李时珍", "孙思邈"],
        answer: 2,
        explanation: "《本草纲目》是李时珍的著作，歌名即致敬。",
        media: null
    },
    {
        id: 23,
        type: 'text',

        difficulty: 'medium',
        question: "周杰伦执导的第二部电影是？",
        options: ["天台爱情", "大灌篮", "逆战", "刺陵"],
        answer: 0,
        explanation: "《天台爱情》是周杰伦执导的第二部电影。",
        media: null
    },
    {
        id: 24,
        type: 'text',

        difficulty: 'easy',
        question: "“菊花残 满地伤 你的笑容已泛黄”出自？",
        options: ["菊花台", "黄金甲", "霍元甲", "兰亭序"],
        answer: 0,
        explanation: "这句歌词出自《菊花台》。",
        media: null
    },
    {
        id: 25,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的哪张专辑封面是他穿着红色卫衣？",
        options: ["Jay", "范特西", "八度空间", "叶惠美"],
        answer: 1,
        explanation: "《范特西》的封面是周杰伦穿着红色卫衣的特写。",
        media: null
    },
    {
        id: 26,
        type: 'text',

        difficulty: 'medium',
        question: "歌曲《告白气球》收录在哪张专辑？",
        options: ["周杰伦的床边故事", "哎呦，不错哦", "十二新作", "惊叹号"],
        answer: 0,
        explanation: "《告白气球》收录于2016年的专辑《周杰伦的床边故事》。",
        media: null
    },
    {
        id: 27,
        type: 'text',

        difficulty: 'hard',
        question: "周杰伦在《满城尽带黄金甲》中饰演的角色是？",
        options: ["元杰", "元祥", "元成", "元吉"],
        answer: 0,
        explanation: "周杰伦饰演二王子元杰。",
        media: null
    },
    {
        id: 28,
        type: 'text',

        difficulty: 'medium',
        question: "“海鸟跟鱼相爱 只是一场意外”出自？",
        options: ["珊瑚海", "美人鱼", "搁浅", "一路向北"],
        answer: 0,
        explanation: "这句歌词出自《珊瑚海》。",
        media: null
    },
    {
        id: 29,
        type: 'text',

        difficulty: 'hard',
        question: "周杰伦的哪首歌被选为2008年北京奥运会歌曲之一？",
        options: ["千山万水", "霍元甲", "黄金甲", "龙拳"],
        answer: 0,
        explanation: "《千山万水》是周杰伦为北京奥运会创作的歌曲。",
        media: null
    },
    {
        id: 30,
        type: 'text',

        difficulty: 'hard',
        question: "歌曲《可爱女人》是周杰伦写给谁的？",
        options: ["徐若瑄", "蔡依林", "温岚", "侯佩岑"],
        answer: 0,
        explanation: "《可爱女人》由徐若瑄作词，并出演MV。",
        media: null
    },
    {
        id: 31,
        type: 'text',

        difficulty: 'medium',
        question: "周杰伦在好莱坞电影《青蜂侠》中饰演的角色是？",
        options: ["Kato", "Bruce", "Lee", "Chan"],
        answer: 0,
        explanation: "周杰伦饰演青蜂侠的助手Kato。",
        media: null
    },
    {
        id: 32,
        type: 'text',

        difficulty: 'easy',
        question: "“窗外的麻雀 在电线杆上多嘴”出自？",
        options: ["七里香", "稻香", "暗号", "园游会"],
        answer: 0,
        explanation: "这句歌词出自《七里香》。",
        media: null
    },
    {
        id: 33,
        type: 'text',

        difficulty: 'medium',
        question: "周杰伦的哪首歌MV邀请了林志玲出演？",
        options: ["兰亭序", "青花瓷", "千里之外", "红尘客栈"],
        answer: 0,
        explanation: "林志玲出演了《兰亭序》的MV。",
        media: null
    },
    {
        id: 34,
        type: 'text',

        difficulty: 'hard',
        question: "歌曲《双截棍》原本是写给谁的？",
        options: ["张惠妹", "李玟", "陈小春", "吴宗宪"],
        answer: 0,
        explanation: "《双截棍》原本是写给张惠妹的，但被退稿。",
        media: null
    },
    {
        id: 35,
        type: 'text',

        difficulty: 'easy',
        question: "周杰伦的哪张专辑以他的母亲名字命名？",
        options: ["叶惠美", "依然范特西", "十一月的萧邦", "摩羯座"],
        answer: 0,
        explanation: "《叶惠美》专辑以周杰伦母亲的名字命名。",
        media: null
    },
    {
        id: 36,
        type: 'text',

        difficulty: 'medium',
        question: "“我想我是太过依赖 在挂电话的刚才”出自？",
        options: ["彩虹", "倒带", "搁浅", "退后"],
        answer: 0,
        explanation: "这句歌词出自《彩虹》。",
        media: null
    },
    {
        id: 37,
        type: 'text',

        difficulty: 'medium',
        question: "周杰伦的哪首歌是《魔兽争霸3》的推广曲？",
        options: ["半兽人", "龙拳", "无双", "乱舞春秋"],
        answer: 0,
        explanation: "《半兽人》是《魔兽争霸3》的中文推广曲。",
        media: null
    },
    {
        id: 38,
        type: 'text',

        difficulty: 'hard',
        question: "歌曲《烟花易冷》的歌词灵感来源于哪部古籍？",
        options: ["洛阳伽蓝记", "搜神记", "山海经", "聊斋志异"],
        answer: 0,
        explanation: "方文山根据《洛阳伽蓝记》创作了《烟花易冷》的歌词。",
        media: null
    },
    {
        id: 39,
        type: 'text',

        difficulty: 'hard',
        question: "周杰伦的哪首歌MV是在法国巴黎拍摄的？",
        options: ["告白气球", "最伟大的作品", "爱情废柴", "选项都是"],
        answer: 3,
        explanation: "《告白气球》、《最伟大的作品》、《爱情废柴》的MV都在巴黎取景。",
        media: null
    },
    {
        id: 40,
        type: 'text',

        difficulty: 'easy',
        question: "“雨下整夜 我的爱溢出就像雨水”出自？",
        options: ["七里香", "晴天", "雨下一整晚", "心雨"],
        answer: 0,
        explanation: "这句歌词出自《七里香》。",
        media: null
    },

    // --- 音乐题 (Audio Questions) [41-80] ---
    {
        id: 41,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["七里香", "搁浅", "止战之殇", "园游会"],
        answer: 0,
        explanation: "这是《七里香》的前奏。",
        media: "songs/七里香/周杰伦 - 七里香.mp3"
    },
    {
        id: 42,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["晴天", "三年二班", "东风破", "以父之名"],
        answer: 2,
        explanation: "这是《东风破》的前奏。",
        media: "songs/叶惠美/周杰伦 - 东风破.mp3"
    },
    {
        id: 43,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["简单爱", "双截棍", "爱在西元前", "安静"],
        answer: 1,
        explanation: "这是《双截棍》的前奏。",
        media: "songs/范特西/周杰伦 - 双截棍.mp3"
    },
    {
        id: 44,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["夜曲", "发如雪", "黑色毛衣", "枫"],
        answer: 0,
        explanation: "这是《夜曲》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 夜曲.mp3"
    },
    {
        id: 45,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["听妈妈的话", "千里之外", "本草纲目", "退后"],
        answer: 0,
        explanation: "这是《听妈妈的话》的前奏。",
        media: "songs/依然范特西/周杰伦 - 听妈妈的话.mp3"
    },
    {
        id: 46,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["稻香", "给我一首歌的时间", "说好的幸福呢", "兰亭序"],
        answer: 0,
        explanation: "这是《稻香》的前奏。",
        media: "songs/魔杰座/周杰伦 - 稻香.mp3"
    },
    {
        id: 47,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["牛仔很忙", "彩虹", "青花瓷", "最长的电影"],
        answer: 0,
        explanation: "这是《牛仔很忙》的前奏。",
        media: "songs/我很忙/周杰伦 - 牛仔很忙.mp3"
    },
    {
        id: 48,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["以父之名", "懦夫", "晴天", "三年二班"],
        answer: 0,
        explanation: "这是《以父之名》的前奏。",
        media: "songs/叶惠美/周杰伦 - 以父之名.mp3"
    },
    {
        id: 49,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["安静", "黑色幽默", "龙卷风", "星晴"],
        answer: 0,
        explanation: "这是《安静》的前奏。",
        media: "songs/范特西/周杰伦 - 安静.mp3"
    },
    {
        id: 50,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["搁浅", "借口", "外婆", "将军"],
        answer: 0,
        explanation: "这是《搁浅》的前奏。",
        media: "songs/七里香/周杰伦 - 搁浅.mp3"
    },
    {
        id: 51,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["半兽人", "半岛铁盒", "暗号", "回到过去"],
        answer: 0,
        explanation: "这是《半兽人》的前奏。",
        media: "songs/八度空间/周杰伦 - 半兽人.mp3"
    },
    {
        id: 52,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["轨迹", "断了的弦", "晴天", "退后"],
        answer: 0,
        explanation: "这是《轨迹》的前奏。",
        media: "songs/寻找周杰伦EP/周杰伦 - 軌跡.mp3"
    },
    {
        id: 53,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["发如雪", "枫", "珊瑚海", "一路向北"],
        answer: 0,
        explanation: "这是《发如雪》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 发如雪.mp3"
    },
    {
        id: 54,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["本草纲目", "红模仿", "迷迭香", "心雨"],
        answer: 0,
        explanation: "这是《本草纲目》的前奏。",
        media: "songs/依然范特西/周杰伦 - 本草纲目.mp3"
    },
    {
        id: 55,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["青花瓷", "彩虹", "蒲公英的约定", "无双"],
        answer: 0,
        explanation: "这是《青花瓷》的前奏。",
        media: "songs/我很忙/周杰伦 - 青花瓷.mp3"
    },
    {
        id: 56,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["给我一首歌的时间", "花海", "说好的幸福呢", "龙骑战士"],
        answer: 0,
        explanation: "这是《给我一首歌的时间》的前奏。",
        media: "songs/魔杰座/周杰伦 - 给我一首歌的时间.mp3"
    },
    {
        id: 57,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["爱在西元前", "简单爱", "忍者", "爸我回来了"],
        answer: 0,
        explanation: "这是《爱在西元前》的前奏。",
        media: "songs/范特西/周杰伦 - 爱在西元前.mp3"
    },
    {
        id: 58,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["晴天", "梯田", "双刀", "懦夫"],
        answer: 0,
        explanation: "这是《晴天》的前奏。",
        media: "songs/叶惠美/周杰伦 - 晴天.mp3"
    },
    {
        id: 59,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["止战之殇", "乱舞春秋", "困兽之斗", "外婆"],
        answer: 0,
        explanation: "这是《止战之殇》的前奏。",
        media: "songs/七里香/周杰伦 - 止战之殇.mp3"
    },
    {
        id: 60,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["半岛铁盒", "暗号", "分裂", "爷爷泡的茶"],
        answer: 0,
        explanation: "这是《半岛铁盒》的前奏。",
        media: "songs/八度空间/周杰伦 - 半岛铁盒.mp3"
    },
    {
        id: 61,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["黑色毛衣", "麦芽糖", "浪漫手机", "逆鳞"],
        answer: 0,
        explanation: "这是《黑色毛衣》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 黑色毛衣.mp3"
    },
    {
        id: 62,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["千里之外", "退后", "白色风车", "夜的第七章"],
        answer: 0,
        explanation: "这是《千里之外》的前奏。",
        media: "songs/依然范特西/周杰伦、费玉清 - 千里之外.mp3"
    },
    {
        id: 63,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["彩虹", "甜甜的", "阳光宅男", "我不配"],
        answer: 0,
        explanation: "这是《彩虹》的前奏。",
        media: "songs/我很忙/周杰伦 - 彩虹.mp3"
    },
    {
        id: 64,
        type: 'audio',

        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["兰亭序", "流浪诗人", "魔术先生", "乔克先生"],
        answer: 0,
        explanation: "这是《兰亭序》的前奏。",
        media: "songs/魔杰座/周杰伦 - 兰亭序.mp3"
    },
    {
        id: 65,
        type: 'audio',

        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["简单爱", "开不了口", "上海一九四三", "对不起"],
        answer: 0,
        explanation: "这是《简单爱》的前奏。",
        media: "songs/范特西/周杰伦 - 简单爱.mp3"
    },
    {
        id: 66,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["三年二班", "她的睫毛", "爱情悬崖", "同一种调调"],
        answer: 0,
        explanation: "这是《三年二班》的前奏。",
        media: "songs/叶惠美/周杰伦 - 三年二班.mp3"
    },
    {
        id: 67,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["园游会", "借口", "将军", "乱舞春秋"],
        answer: 0,
        explanation: "这是《园游会》的前奏。",
        media: "songs/七里香/周杰伦 - 园游会.mp3"
    },
    {
        id: 68,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["暗号", "回到过去", "米兰的小铁匠", "最后的战役"],
        answer: 0,
        explanation: "这是《暗号》的前奏。",
        media: "songs/八度空间/周杰伦 - 暗号.mp3"
    },
    {
        id: 69,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["枫", "珊瑚海", "飘移", "一路向北"],
        answer: 0,
        explanation: "这是《枫》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 枫.mp3"
    },
    {
        id: 70,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["退后", "心雨", "白色风车", "迷迭香"],
        answer: 0,
        explanation: "这是《退后》的前奏。",
        media: "songs/依然范特西/周杰伦 - 退后.mp3"
    },
    {
        id: 71,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["最长的电影", "蒲公英的约定", "甜甜的", "无双"],
        answer: 0,
        explanation: "这是《最长的电影》的前奏。",
        media: "songs/我很忙/周杰伦 - 最长的电影.mp3"
    },
    {
        id: 72,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["说好的幸福呢", "花海", "时光机", "蛇舞"],
        answer: 0,
        explanation: "这是《说好的幸福呢》的前奏。",
        media: "songs/魔杰座/周杰伦 - 说好的幸福呢.mp3"
    },
    {
        id: 73,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["开不了口", "上海一九四三", "威廉古堡", "对不起"],
        answer: 0,
        explanation: "这是《开不了口》的前奏。",
        media: "songs/范特西/周杰伦 - 开不了口.mp3"
    },
    {
        id: 74,
        type: 'audio',

        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["她的睫毛", "爱情悬崖", "同一种调调", "双刀"],
        answer: 0,
        explanation: "这是《她的睫毛》的前奏。",
        media: "songs/叶惠美/周杰伦 - 她的睫毛.mp3"
    },
    {
        id: 75,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["借口", "将军", "乱舞春秋", "困兽之斗"],
        answer: 0,
        explanation: "这是《借口》的前奏。",
        media: "songs/七里香/周杰伦 - 借口.mp3"
    },
    {
        id: 76,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["回到过去", "米兰的小铁匠", "最后的战役", "火车叨位去"],
        answer: 0,
        explanation: "这是《回到过去》的前奏。",
        media: "songs/八度空间/周杰伦 - 回到过去.mp3"
    },
    {
        id: 77,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["珊瑚海", "飘移", "一路向北", "蓝色风暴"],
        answer: 0,
        explanation: "这是《珊瑚海》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 珊瑚海.mp3"
    },
    {
        id: 78,
        type: 'audio',

        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["夜的第七章", "心雨", "白色风车", "迷迭香"],
        answer: 0,
        explanation: "这是《夜的第七章》的前奏。",
        media: "songs/依然范特西/周杰伦 - 夜的第七章.mp3"
    },
    {
        id: 79,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["蒲公英的约定", "甜甜的", "无双", "扯"],
        answer: 0,
        explanation: "这是《蒲公英的约定》的前奏。",
        media: "songs/我很忙/周杰伦 - 蒲公英的约定.mp3"
    },
    {
        id: 80,
        type: 'audio',

        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["花海", "时光机", "蛇舞", "乔克先生"],
        answer: 0,
        explanation: "这是《花海》的前奏。",
        media: "songs/魔杰座/周杰伦 - 花海.mp3"
    },

    // --- 图片题 (Image Questions) [81-100] ---
    {
        id: 81,
        type: 'image',

        difficulty: 'medium',
        question: "这张图片出自哪首歌的MV？",
        options: ["发如雪", "青花瓷", "千里之外", "菊花台"],
        answer: 1,
        explanation: "这是《青花瓷》MV中的经典画面。",
        media: "./images/青花瓷.jpg"
    },
    {
        id: 82,
        type: 'image',

        difficulty: 'medium',
        question: "这是哪张专辑的封面风格？",
        options: ["范特西", "叶惠美", "十一月的萧邦", "魔杰座"],
        answer: 0,
        explanation: "红色连帽衫是《范特西》专辑封面的经典造型。",
        media: "./images/范特西.jpg"
    },
    {
        id: 84,
        type: 'image',

        difficulty: 'medium',
        question: "这张剧照出自哪部电影？",
        options: ["头文字D", "大灌篮", "逆战", "满城尽带黄金甲"],
        answer: 0,
        explanation: "藤原拓海的造型出自《头文字D》。",
        media: "./images/头文字D.jpg"
    },
    {
        id: 85,
        type: 'image',

        difficulty: 'easy',
        question: "这个人在模仿周杰伦哪个的经典动作？",
        options: ["哎哟，不错哦", "听妈妈的话", "再见", "我困了"],
        answer: 0,
        explanation: "这是周杰伦的招牌动作，意为“哎哟，不错哦”。",
        media: "./images/经典手势.jpg"
    },
    {
        id: 87,
        type: 'image',

        difficulty: 'hard',
        question: "这是周杰伦哪场演唱会的经典造型？",
        options: ["无与伦比", "地表最强", "超时代", "魔天伦"],
        answer: 0,
        explanation: "这是2004年无与伦比演唱会的经典造型。",
        media: "./images/无与伦比演唱会.jpg"
    },
    {
        id: 89,
        type: 'image',

        difficulty: 'medium',
        question: "这是哪部电影的海报风格？",
        options: ["天台爱情", "不能说的秘密", "大灌篮", "功夫灌篮"],
        answer: 0,
        explanation: "色彩鲜艳的复古风格是《天台爱情》的特色。",
        media: "./images/天台爱情海报.jpg"
    },
    {
        id: 90,
        type: 'image',

        difficulty: 'medium',
        question: "这张图片中的跑车出现在哪首MV中？",
        options: ["超跑女神", "飘移", "彩虹", "牛仔很忙"],
        answer: 0,
        explanation: "《超跑女神》MV中展示了多辆跑车。",
        media: "./images/超跑女神.jpg"
    },
    {
        id: 92,
        type: 'image',

        difficulty: 'hard',
        question: "这张图片代表了哪张专辑的概念？",
        options: ["魔杰座", "十二新作", "惊叹号", "跨时代"],
        answer: 0,
        explanation: "魔术师和小丑的形象代表了《魔杰座》。",
        media: "./images/魔杰座.jpg"
    },
    {
        id: 94,
        type: 'image',

        difficulty: 'medium',
        question: "这张图片出自哪部好莱坞电影？",
        options: ["惊天魔盗团2", "青蜂侠", "极限特工", "速度与激情"],
        answer: 0,
        explanation: "周杰伦参演了《惊天魔盗团2》。",
        media: "./images/惊天魔盗团2.jpg"
    },
    {
        id: 96,
        type: 'image',

        difficulty: 'medium',
        question: "这张图片暗示了哪首歌曲？",
        options: ["听妈妈的话", "爷爷泡的茶", "爸我回来了", "外婆"],
        answer: 1,
        explanation: "茶具暗示了歌曲《爷爷泡的茶》。",
        media: "./images/爷爷泡的茶.jpg"
    },
    {
        id: 97,
        type: 'image',

        difficulty: 'hard',
        question: "这是哪张专辑的内页造型？",
        options: ["八度空间", "叶惠美", "七里香", "依然范特西"],
        answer: 2,
        explanation: "军装造型是《七里香》专辑的经典造型之一。",
        media: "./images/七里香.jpg"
    },
    {
        id: 99,
        type: 'image',

        difficulty: 'hard',
        question: "这张图片出自哪首歌曲的MV？",
        options: ["水手怕水", "牛仔很忙", "公公偏头痛", "鞋子特大号"],
        answer: 0,
        explanation: "水手服造型出自《水手怕水》。",
        media: "./images/水手怕水.jpg"
    },
    {
        id: 100,
        type: 'image',

        difficulty: 'hard',
        question: "这是周杰伦的哪家餐厅？",
        options: ["Mr.J义法厨房", "PHANTACi", "Deja Vu", "J大侠中华料理"],
        answer: 0,
        explanation: "Mr.J义法厨房是周杰伦开设的著名餐厅。",
        media: "./images/Mr.J义法厨房.jpg"
    }
,
    // --- 新增文本题 (New Text Questions) [101-140] ---
    {
        id: 101,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦的哪首歌在2023年突破了10亿播放量？",
        options: ["晴天", "七里香", "稻香", "选项都是"],
        answer: 3,
        explanation: "《晴天》《七里香》《稻香》等多首歌曲都突破了10亿播放。",
        media: null
    },
    {
        id: 102,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦的第一首创作歌曲是？",
        options: ["可爱女人", "龙卷风", "双截棍", "星晴"],
        answer: 0,
        explanation: "《可爱女人》是周杰伦第一首公开发表的创作歌曲，演唱者是徐若瑄。",
        media: null
    },
    {
        id: 103,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦出生于哪一年？",
        options: ["1978", "1979", "1980", "1981"],
        answer: 1,
        explanation: "周杰伦出生于1979年1月18日。",
        media: null
    },
    {
        id: 104,
        type: 'text',
        difficulty: 'medium',
        question: "《夜的第七章》是一首什么风格的歌曲？",
        options: ["中国风", "悬疑推理", "R&B", "嘻哈"],
        answer: 1,
        explanation: "《夜的第七章》讲述了一个悬疑推理故事，由方文山作词。",
        media: null
    },
    {
        id: 105,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦的歌曲《龙拳》是为了宣传哪部电影？",
        options: ["功夫", "英雄", "卧虎藏龙", "十面埋伏"],
        answer: 0,
        explanation: "《龙拳》是为周星驰的电影《功夫》创作的宣传曲。",
        media: null
    },
    {
        id: 106,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦担任过哪档选秀节目的导师？",
        options: ["中国好声音", "中国好歌曲", "快乐男声", "蒙面歌王"],
        answer: 0,
        explanation: "周杰伦曾担任《中国好声音》第四季导师。",
        media: null
    },
    {
        id: 107,
        type: 'text',
        difficulty: 'easy',
        question: "“哥练的胸肌如果你还想靠”这句话出自哪首歌？",
        options: ["不爱我就拉倒", "霍元甲", "龙拳", "双截棍"],
        answer: 0,
        explanation: "这句歌词出自《本草纲目》。",
        media: null
    },
    {
        id: 108,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦的哪张专辑销量突破了300万张？",
        options: ["范特西", "叶惠美", "七里香", "十一月的萧邦"],
        answer: 0,
        explanation: "《范特西》是周杰伦销量最高的专辑之一，在亚洲销量突破300万张。",
        media: null
    },
    {
        id: 109,
        type: 'text',
        difficulty: 'medium',
        question: "《说好的幸福呢》这首歌的MV在哪里拍摄？",
        options: ["台北", "上海", "北京", "香港"],
        answer: 0,
        explanation: "《说好的幸福呢》MV在台北拍摄。",
        media: null
    },
    {
        id: 110,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦现在经常去做什么运动？",
        options: ["篮球", "足球", "网球", "游泳"],
        answer: 2,
        explanation: "周杰伦现在非常热爱网球运动。",
        media: null
    },
    {
        id: 111,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦的服装品牌叫什么？",
        options: ["PHANTACi", "STAGE", "CLOT", "NPC"],
        answer: 0,
        explanation: "PHANTACi是周杰伦创立的潮牌。",
        media: null
    },
    {
        id: 112,
        type: 'text',
        difficulty: 'hard',
        question: "《印地安老斑鸠》这首歌收录在哪张专辑？",
        options: ["Jay", "范特西", "八度空间", "叶惠美"],
        answer: 0,
        explanation: "《印地安老斑鸠》收录在首张专辑《Jay》中。",
        media: null
    },
    {
        id: 113,
        type: 'text',
        difficulty: 'easy',
        question: "“转身离开，分手说不出来”这句话出自哪首歌？",
        options: ["开不了口", "简单爱", "安静", "星晴"],
        answer: 0,
        explanation: "这句歌词出自《开不了口》。",
        media: null
    },
    {
        id: 114,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦在哪一年举办了首场个人演唱会？",
        options: ["2001", "2002", "2003", "2004"],
        answer: 1,
        explanation: "周杰伦在2002年举办了首场个人演唱会《THE ONE》。",
        media: null
    },
    {
        id: 115,
        type: 'text',
        difficulty: 'hard',
        question: "《世界末日》这首歌是周杰伦写给谁的？",
        options: ["蔡依林", "S.H.E", "张惠妹", "梁静茹"],
        answer: 1,
        explanation: "《世界末日》是周杰伦为S.H.E创作的歌曲。",
        media: null
    },
    {
        id: 116,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦参演的好莱坞电影《青蜂侠》上映于哪一年？",
        options: ["2009", "2010", "2011", "2012"],
        answer: 2,
        explanation: "《青蜂侠》于2011年上映。",
        media: null
    },
    {
        id: 117,
        type: 'text',
        difficulty: 'easy',
        question: "“我要带你骑单车，我要和你看棒球”这句话出自哪首歌？",
        options: ["听妈妈的话", "稻香", "简单爱", "可爱女人"],
        answer: 2,
        explanation: "这句歌词出自《简单爱》。",
        media: null
    },
    {
        id: 118,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦的哪首歌曲获得过格莱美奖提名？",
        options: ["本草纲目", "千里之外", "青花瓷", "给我一首歌的时间"],
        answer: 1,
        explanation: "《千里之外》获得过格莱美奖最佳无伴奏音乐专辑奖提名。",
        media: null
    },
    {
        id: 119,
        type: 'text',
        difficulty: 'medium',
        question: "《黄金甲》这首歌是为哪部电影创作的？",
        options: ["十面埋伏", "满城尽带黄金甲", "英雄", "赤壁"],
        answer: 1,
        explanation: "《黄金甲》是电影《满城尽带黄金甲》的片尾曲。",
        media: null
    },
    {
        id: 120,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦的母亲是一名？",
        options: ["教师", "护士", "医生", "会计"],
        answer: 0,
        explanation: "周杰伦的母亲叶惠美是一名中学美术老师。",
        media: null
    },
    {
        id: 121,
        type: 'text',
        difficulty: 'hard',
        question: "《一路向北》这首歌的创作灵感来自？",
        options: ["失恋经历", "旅行见闻", "电影情节", "书籍故事"],
        answer: 0,
        explanation: "《一路向北》讲述了失恋后的心情故事。",
        media: null
    },
    {
        id: 122,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦的哪首歌在KTV点唱率最高？",
        options: ["晴天", "简单爱", "七里香", "青花瓷"],
        answer: 0,
        explanation: "《晴天》长期位居KTV点唱榜前列。",
        media: null
    },
    {
        id: 123,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦擅长演奏的乐器是？",
        options: ["钢琴", "吉他", "小提琴", "鼓"],
        answer: 0,
        explanation: "周杰伦从小学习钢琴，是他最擅长的乐器。",
        media: null
    },
    {
        id: 124,
        type: 'text',
        difficulty: 'hard',
        question: "《爷爷泡的茶》中提到的茶叶是？",
        options: ["龙井", "铁观音", "普洱", "歌词未明确提及"],
        answer: 3,
        explanation: "歌词中没有明确提及具体的茶叶种类。",
        media: null
    },
    {
        id: 125,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦的哪张专辑主打复古风格？",
        options: ["范特西", "十一月的萧邦", "跨时代", "Jay"],
        answer: 1,
        explanation: "《十一月的萧邦》整张专辑充满复古古典音乐风格。",
        media: null
    },
    {
        id: 126,
        type: 'text',
        difficulty: 'hard',
        question: "“音乐收割，用听觉找快乐”这句话出自哪首歌？",
        options: ["我的地盘", "龙拳", "双截棍", "本草纲目"],
        answer: 0,
        explanation: "这是《我的地盘》的歌词。",
        media: null
    },
    {
        id: 127,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦在淡江中学时期参加过什么社团？",
        options: ["篮球队", "管乐团", "吉他社", "合唱团"],
        answer: 1,
        explanation: "周杰伦在淡江中学时期参加过管乐团。",
        media: null
    },
    {
        id: 128,
        type: 'text',
        difficulty: 'medium',
        question: "《红尘客栈》这首歌的曲风是？",
        options: ["中国风", "R&B", "摇滚", "爵士"],
        answer: 0,
        explanation: "《红尘客栈》是一首中国风歌曲。",
        media: null
    },
    {
        id: 129,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦的昵称不包括？",
        options: ["周董", "杰伦", "小公举", "周大大"],
        answer: 3,
        explanation: "周董、杰伦、小公举都是粉丝常用的昵称。",
        media: null
    },
    {
        id: 130,
        type: 'text',
        difficulty: 'hard',
        question: "《迷迭香》这首歌的主题是关于？",
        options: ["亲情", "爱情", "师生情", "友情"],
        answer: 1,
        explanation: "《迷迭香》讲述了战争中的爱情故事。",
        media: null
    },
    {
        id: 131,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦在《头文字D》中驾驶的车型是？",
        options: ["AE86", "GT-R", "RX-7", "Supra"],
        answer: 0,
        explanation: "藤原拓海的经典座驾是丰田AE86。",
        media: null
    },
    {
        id: 132,
        type: 'text',
        difficulty: 'easy',
        question: "“不要再这样打我妈妈”这句话出自哪首歌？",
        options: ["爸我回来了", "听妈妈的话", "外婆", "园游会"],
        answer: 0,
        explanation: "这句歌词出自《爸我回来了》。",
        media: null
    },
    {
        id: 133,
        type: 'text',
        difficulty: 'hard',
        question: "周杰伦的哪首歌曲时长超过5分钟？",
        options: ["安静", "半岛铁盒", "开不了口", "以父之名"],
        answer: 3,
        explanation: "《以父之名》时长约5分40秒，是周杰伦较长的歌曲之一。",
        media: null
    },
    {
        id: 134,
        type: 'text',
        difficulty: 'medium',
        question: "《最长的电影》这首歌表达的情感是？",
        options: ["失恋", "暗恋", "热恋", "重逢"],
        answer: 0,
        explanation: "《最长的电影》讲述了分手后的回忆。",
        media: null
    },
    {
        id: 135,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦代言过哪个品牌的奶茶？",
        options: ["喜茶", "奈雪", "Coco", "优乐美"],
        answer: 3,
        explanation: "周杰伦曾代言过优乐美奶茶。",
        media: null
    },
    {
        id: 136,
        type: 'text',
        difficulty: 'hard',
        question: "《上海一九四三》这首歌讲述的历史背景是？",
        options: ["抗日战争", "解放战争", "文化大革命", "改革开放"],
        answer: 0,
        explanation: "《上海一九四三》讲述了抗日战争时期的爱情故事。",
        media: null
    },
    {
        id: 137,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦的哪首歌获得过金曲奖最佳年度歌曲？",
        options: ["稻香", "跨时代", "烟花易冷", "选项都是"],
        answer: 3,
        explanation: "《稻香》《跨时代》《烟花易冷》都获得过金曲奖最佳年度歌曲。",
        media: null
    },
    {
        id: 138,
        type: 'text',
        difficulty: 'easy',
        question: "“你是我的优乐美”这句广告词来自哪里？",
        options: ["奶茶广告", "电影台词", "歌词", "综艺节目"],
        answer: 0,
        explanation: "这是周杰伦代言优乐美奶茶的经典广告词。",
        media: null
    },
    {
        id: 139,
        type: 'text',
        difficulty: 'hard',
        question: "《四面楚歌》这首歌的编曲风格是？",
        options: ["古典", "电子", "摇滚", "R&B"],
        answer: 1,
        explanation: "《四面楚歌》采用了电子音乐编曲风格。",
        media: null
    },
    {
        id: 140,
        type: 'text',
        difficulty: 'medium',
        question: "周杰伦在《大灌篮》中饰演的角色擅长什么？",
        options: ["投篮", "扣篮", "运球", "传球"],
        answer: 2,
        explanation: "在《大灌篮》中，周杰伦饰演的方世杰擅长运球和突破。",
        media: null
    },
    {
        id: 201,
        type: 'text',
        difficulty: 'easy',
        question: "周杰伦2025年12月5日发布的新单曲名称是什么？",
        options: ["恒星不忘Forever Forever", "永远永远Forever Forever", "星辰大海Forever Forever", "星空之下"],
        answer: 0,
        explanation: "周杰伦在2025年12月5日发布了新单曲《恒星不忘 Forever Forever》。",
        media: null
    },
    {
        id: 202,
        type: 'text',
        difficulty: 'medium',
        question: "单曲《恒星不忘 Forever Forever》是哪个组合演唱的？",
        options: ["周杰伦和张惠妹", "周杰伦和F4", "周杰伦和五月天", "新五月天"],
        answer: 3,
        explanation: "《恒星不忘 Forever Forever》是周杰伦、言承旭 、吴建豪 、周渝民 、五月天阿信合作演唱。",
        media: null
    },
    {
        id: 203,
        type: 'text',
        difficulty: 'hard',
        question: "《恒星不忘 Forever Forever》是哪天发布的？",
        options: ["2025年12月1日", "2025年12月3日", "2025年12月5日", "2025年12月7日"],
        answer: 2,
        explanation: "2025年12月5日，周杰伦、言承旭 、吴建豪 、周渝民 、五月天阿信史诗合作全新单曲《恒星不忘 Forever Forever》重磅上线！",
        media: null
    },

    // --- 新增音乐题 (New Audio Questions) [141-150] ---
    {
        id: 141,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["外婆", "将军", "乱舞春秋", "困兽之斗"],
        answer: 0,
        explanation: "这是《外婆》的前奏。",
        media: "songs/七里香/周杰伦 - 外婆.mp3"
    },
    {
        id: 142,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["将军", "困兽之斗", "乱舞春秋", "我的地盘"],
        answer: 0,
        explanation: "这是《将军》的前奏。",
        media: "songs/七里香/周杰伦 - 将军.mp3"
    },
    {
        id: 143,
        type: 'audio',
        difficulty: 'easy',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["我的地盘", "双截棍", "龙拳", "半兽人"],
        answer: 0,
        explanation: "这是《我的地盘》的前奏。",
        media: "songs/七里香/周杰伦 - 我的地盘.mp3"
    },
    {
        id: 144,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["困兽之斗", "乱舞春秋", "止战之殇", "将军"],
        answer: 0,
        explanation: "这是《困兽之斗》的前奏。",
        media: "songs/七里香/周杰伦 - 困兽之斗.mp3"
    },
    {
        id: 145,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["乱舞春秋", "借口", "园游会", "困兽之斗"],
        answer: 0,
        explanation: "这是《乱舞春秋》的前奏。",
        media: "songs/七里香/周杰伦 - 乱舞春秋.mp3"
    },
    {
        id: 146,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["上海一九四三", "威廉古堡", "开不了口", "忍者"],
        answer: 0,
        explanation: "这是《上海一九四三》的前奏。",
        media: "songs/范特西/周杰伦 - 上海一九四三.mp3"
    },
    {
        id: 147,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["威廉古堡", "忍者", "对不起", "爸我回来了"],
        answer: 0,
        explanation: "这是《威廉古堡》的前奏。",
        media: "songs/范特西/周杰伦 - 威廉古堡.mp3"
    },
    {
        id: 148,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["对不起", "忍者", "爸我回来了", "安静"],
        answer: 0,
        explanation: "这是《对不起》的前奏。",
        media: "songs/范特西/周杰伦 - 对不起.mp3"
    },
    {
        id: 149,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["忍者", "爸我回来了", "威廉古堡", "双截棍"],
        answer: 0,
        explanation: "这是《忍者》的前奏。",
        media: "songs/范特西/周杰伦 - 忍者.mp3"
    },
    {
        id: 150,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["爸我回来了", "对不起", "上海一九四三", "安静"],
        answer: 0,
        explanation: "这是《爸我回来了》的前奏。",
        media: "songs/范特西/周杰伦 - 爸我回来了.mp3"
    }
,
    {
        id: 151,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["爷爷泡的茶", "半岛铁盒", "龙拳", "回到过去"],
        answer: 0,
        explanation: "这是《爷爷泡的茶》的前奏。",
        media: "songs/八度空间/周杰伦 - 爷爷泡的茶.mp3"
    },
    {
        id: 152,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["米兰的小铁匠", "火车叨位去", "最后的战役", "分裂"],
        answer: 0,
        explanation: "这是《米兰的小铁匠》的前奏。",
        media: "songs/八度空间/周杰伦 - 米兰的小铁匠.mp3"
    },
    {
        id: 153,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["龙拳", "半兽人", "暗号", "爷爷泡的茶"],
        answer: 0,
        explanation: "这是《龙拳》的前奏。",
        media: "songs/八度空间/周杰伦 - 龙拳.mp3"
    },
    {
        id: 154,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["火车叨位去", "最后的战役", "分裂", "米兰的小铁匠"],
        answer: 0,
        explanation: "这是《火车叨位去》的前奏。",
        media: "songs/八度空间/周杰伦 - 火车叨位去.mp3"
    },
    {
        id: 155,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["最后的战役", "分裂", "火车叨位去", "半岛铁盒"],
        answer: 0,
        explanation: "这是《最后的战役》的前奏。",
        media: "songs/八度空间/周杰伦 - 最后的战役.mp3"
    },
    {
        id: 156,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["分裂", "最后的战役", "米兰的小铁匠", "暗号"],
        answer: 0,
        explanation: "这是《分裂(离开)》的前奏。",
        media: "songs/八度空间/周杰伦 - 分裂（离开）.mp3"
    },
    {
        id: 157,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["双刀", "她的睫毛", "爱情悬崖", "同一种调调"],
        answer: 0,
        explanation: "这是《双刀》的前奏。",
        media: "songs/叶惠美/周杰伦 - 双刀.mp3"
    },
    {
        id: 158,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["同一种调调", "双刀", "她的睫毛", "懦夫"],
        answer: 0,
        explanation: "这是《同一种调调》的前奏。",
        media: "songs/叶惠美/周杰伦 - 同一种调调.mp3"
    },
    {
        id: 159,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["爱情悬崖", "她的睫毛", "懦夫", "梯田"],
        answer: 0,
        explanation: "这是《爱情悬崖》的前奏。",
        media: "songs/叶惠美/周杰伦 - 爱情悬崖.mp3"
    },
    {
        id: 160,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["梯田", "懦夫", "你听得到", "双刀"],
        answer: 0,
        explanation: "这是《梯田》的前奏。",
        media: "songs/叶惠美/周杰伦 - 梯田.mp3"
    },
    {
        id: 161,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["懦夫", "你听得到", "同一种调调", "双刀"],
        answer: 0,
        explanation: "这是《懦夫》的前奏。",
        media: "songs/叶惠美/周杰伦 - 懦夫.mp3"
    },
    {
        id: 162,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["你听得到", "梯田", "爱情悬崖", "她的睫毛"],
        answer: 0,
        explanation: "这是《你听得到》的前奏。",
        media: "songs/叶惠美/周杰伦 - 你听得到.mp3"
    },
    {
        id: 163,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["四面楚歌", "逆鳞", "蓝色风暴", "浪漫手机"],
        answer: 0,
        explanation: "这是《四面楚歌》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 四面楚歌.mp3"
    },
    {
        id: 164,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["浪漫手机", "麦芽糖", "飘移", "蓝色风暴"],
        answer: 0,
        explanation: "这是《浪漫手机》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 浪漫手机.mp3"
    },{
        id: 165,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["逆鳞", "四面楚歌", "蓝色风暴", "麦芽糖"],
        answer: 0,
        explanation: "这是《逆鳞》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 逆鳞.mp3"
    },
    {
        id: 166,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["麦芽糖", "飘移", "浪漫手机", "发如雪"],
        answer: 0,
        explanation: "这是《麦芽糖》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 麦芽糖.mp3"
    },
    {
        id: 167,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["飘移", "蓝色风暴", "麦芽糖", "逆鳞"],
        answer: 0,
        explanation: "这是《飘移》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 飘移.mp3"
    },
    {
        id: 168,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["蓝色风暴", "四面楚歌", "飘移", "珊瑚海"],
        answer: 0,
        explanation: "这是《蓝色风暴》的前奏。",
        media: "songs/十一月的萧邦/周杰伦 - 蓝色风暴.mp3"
    },
    {
        id: 169,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["菊花台", "退后", "千里之外", "本草纲目"],
        answer: 0,
        explanation: "这是《菊花台》的前奏。",
        media: "songs/依然范特西/周杰伦 - 菊花台.mp3"
    },
    {
        id: 170,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["红模仿", "迷迭香", "白色风车", "心雨"],
        answer: 0,
        explanation: "这是《红模仿》的前奏。",
        media: "songs/依然范特西/周杰伦 - 红模仿.mp3"
    },
    {
        id: 171,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["迷迭香", "心雨", "白色风车", "夜的第七章"],
        answer: 0,
        explanation: "这是《迷迭香》的前奏。",
        media: "songs/依然范特西/周杰伦 - 迷迭香.mp3"
    },
    {
        id: 172,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["白色风车", "迷迭香", "心雨", "退后"],
        answer: 0,
        explanation: "这是《白色风车》的前奏。",
        media: "songs/依然范特西/周杰伦 - 白色风车.mp3"
    },
    {
        id: 173,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["心雨", "白色风车", "红模仿", "菊花台"],
        answer: 0,
        explanation: "这是《心雨》的前奏。",
        media: "songs/依然范特西/周杰伦 - 心雨.mp3"
    },
    {
        id: 174,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["甜甜的", "无双", "我不配", "扯"],
        answer: 0,
        explanation: "这是《甜甜的》的前奏。",
        media: "songs/我很忙/周杰伦 - 甜甜的.mp3"
    },
    {
        id: 175,
        type: 'audio',
        difficulty: 'medium',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["无双", "扯", "阳光宅男", "我不配"],
        answer: 0,
        explanation: "这是《无双》的前奏。",
        media: "songs/我很忙/周杰伦 - 无双.mp3"
    },
    {
        id: 176,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["我不配", "扯", "甜甜的", "阳光宅男"],
        answer: 0,
        explanation: "这是《我不配(距离)》的前奏。",
        media: "songs/我很忙/周杰伦 - 我不配(距离).mp3"
    },
    {
        id: 177,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["扯", "阳光宅男", "无双", "牛仔很忙"],
        answer: 0,
        explanation: "这是《扯》的前奏。",
        media: "songs/我很忙/周杰伦 - 扯.mp3"
    },
    {
        id: 178,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["阳光宅男", "我不配", "扯", "彩虹"],
        answer: 0,
        explanation: "这是《阳光宅男》的前奏。",
        media: "songs/我很忙/周杰伦 - 阳光宅男.mp3"
    },
    {
        id: 179,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["乔克先生", "流浪诗人", "魔术先生", "蛇舞"],
        answer: 0,
        explanation: "这是《乔克先生》的前奏。",
        media: "songs/魔杰座/周杰伦 - 乔克先生.mp3"
    },
    {
        id: 180,
        type: 'audio',
        difficulty: 'hard',
        question: "请听前奏，猜猜这是哪首歌？",
        options: ["流浪诗人", "魔术先生", "蛇舞", "时光机"],
        answer: 0,
        explanation: "这是《流浪诗人》的前奏。",
        media: "songs/魔杰座/周杰伦 - 流浪诗人.mp3"
    },

    // --- 新增图片题 (New Image Questions) [181-200] ---
    {
        id: 181,
        type: 'image',
        difficulty: 'easy',
        question: "这个场景出自周杰伦的哪部电影？",
        options: ["不能说的秘密", "天台爱情", "大灌篮", "头文字D"],
        answer: 1,
        explanation: "天台场景是《天台爱情》的标志性场景。",
        media: "./images/天台.jpg"
    },
    {
        id: 183,
        type: 'image',
        difficulty: 'hard',
        question: "这是哪张专辑的封面元素？",
        options: ["八度空间", "跨时代", "惊叹号", "十二新作"],
        answer: 0,
        explanation: "这是《八度空间》专辑的设计元素。",
        media: "./images/八度空间封面.jpg"
    },
    {
        id: 184,
        type: 'image',
        difficulty: 'medium',
        question: "这个形象出自哪首歌的MV？",
        options: ["霍元甲", "龙拳", "本草纲目", "双截棍"],
        answer: 0,
        explanation: "功夫造型出自《霍元甲》MV。",
        media: "./images/霍元甲.jpg"
    },
    {
        id: 185,
        type: 'image',
        difficulty: 'hard',
        question: "这是周杰伦哪场演唱会的舞台设计？",
        options: ["地表最强", "魔天伦", "无与伦比", "超时代"],
        answer: 1,
        explanation: "这是《魔天伦》演唱会的舞台设计。",
        media: "./images/魔天伦.jpg"
    },
    {
        id: 186,
        type: 'image',
        difficulty: 'medium',
        question: "这是哪首歌的MV？",
        options: ["兰亭序", "发如雪", "千里之外", "菊花台"],
        answer: 0,
        explanation: "这是《兰亭序》MV中的经典场景。",
        media: "./images/兰亭序.jpg"
    },
    {
        id: 187,
        type: 'image',
        difficulty: 'easy',
        question: "这个标志代表周杰伦的什么？",
        options: ["服装品牌", "餐厅", "唱片公司", "演唱会"],
        answer: 0,
        explanation: "这是PHANTACi潮牌的标志。",
        media: "./images/PHANTACi.jpg"
    },
    {
        id: 188,
        type: 'image',
        difficulty: 'hard',
        question: "这张图片出自哪张专辑的内页？",
        options: ["依然范特西", "十一月的萧邦", "我很忙", "魔杰座"],
        answer: 1,
        explanation: "这是《十一月的萧邦》专辑内页的设计。",
        media: "./images/肖邦专辑内页.jpg"
    },
    {
        id: 189,
        type: 'image',
        difficulty: 'hard',
        question: "这个场景出自哪首歌的MV？",
        options: ["说好的幸福呢", "最长的电影", "彩虹", "退后"],
        answer: 0,
        explanation: "这是《说好的幸福呢》MV中的场景。",
        media: "./images/说好的幸福呢MV.jpg"
    },
    {
        id: 190,
        type: 'image',
        difficulty: 'hard',
        question: "这张海报是周杰伦的哪次巡演？",
        options: ["地表最强", "无与伦比", "超时代", "魔天伦"],
        answer: 0,
        explanation: "这是《地表最强》巡回演唱会的海报。",
        media: "./images/地表最强.jpg"
    },
    {
        id: 191,
        type: 'image',
        difficulty: 'medium',
        question: "周杰伦在哪首歌的MV开头弹了古筝？",
        options: ["红颜如霜", "霍元甲", "东风破", "龙拳"],
        answer: 0,
        explanation: "古筝在新歌《红颜如霜》这首歌中出现。",
        media: "./images/红颜如霜.jpg"
    },
    {
        id: 192,
        type: 'image',
        difficulty: 'hard',
        question: "这张图片出自周杰伦的哪首歌？",
        options: ["晴天", "彩虹", "雨下一整晚", "心雨"],
        answer: 0,
        explanation: "《晴天》MV里周杰伦演奏了大提琴。",
        media: "./images/晴天.jpg"
    },
    {
        id: 193,
        type: 'image',
        difficulty: 'hard',
        question: "这是周杰伦哪部电影的剧照？",
        options: ["天台爱情", "不能说的秘密", "刺陵", "大灌篮"],
        answer: 2,
        explanation: "这是电影《刺陵》的剧照。",
        media: "./images/刺陵.jpg"
    },
    {
        id: 194,
        type: 'image',
        difficulty: 'medium',
        question: "这个造型出自周杰伦的哪首歌MV？",
        options: ["夜的第七章", "以父之名", "威廉古堡", "上海一九四三"],
        answer: 0,
        explanation: "侦探造型出自《夜的第七章》MV。",
        media: "./images/侦探造型.jpg"
    },
    {
        id: 197,
        type: 'image',
        difficulty: 'hard',
        question: "这张图片是周杰伦参演的哪部电影的主要取景地？",
        options: ["满城尽带黄金甲", "苏乞儿", "刺陵", "大灌篮"],
        answer: 0,
        explanation: "《满城尽带黄金甲》的拍摄地主要在北京和重庆武隆，图片为重庆武隆天生三桥景区。",
        media: "./images/武隆天生三桥.jpg"
    },
    {
        id: 198,
        type: 'image',
        difficulty: 'hard',
        question: "这个场景出自哪首歌的MV？",
        options: ["红尘客栈", "兰亭序", "青花瓷", "烟花易冷"],
        answer: 0,
        explanation: "客栈武侠场景出自《红尘客栈》MV。",
        media: "./images/红尘客栈MV.jpg"
    }
];

// 调用洗牌函数，确保每次加载时答案随机分布
shuffleOptions();

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionBank;
}
