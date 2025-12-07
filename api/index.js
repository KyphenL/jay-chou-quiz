const express = require('express');
const cors = require('cors');
const { kv } = require('@vercel/kv');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// In-memory fallback (only used if KV is not configured)
let localLeaderboard = [];

// API endpoint to get top 10 leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Check if Vercel KV is configured
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            // Get top 10 scores (0 to 9) in descending order
            // zrange returns an array of members (strings)
            const result = await kv.zrange('leaderboard', 0, 9, { rev: true });
            
            // Parse the JSON strings back to objects
            const leaderboard = result.map(item => {
                if (typeof item === 'string') {
                    return JSON.parse(item);
                }
                return item;
            });
            
            return res.json(leaderboard);
        } else {
            console.warn('Vercel KV not configured, using in-memory fallback');
            const sortedLeaderboard = [...localLeaderboard].sort((a, b) => b.score - a.score);
            return res.json(sortedLeaderboard.slice(0, 10));
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Fallback to empty or local
        const sortedLeaderboard = [...localLeaderboard].sort((a, b) => b.score - a.score);
        return res.json(sortedLeaderboard.slice(0, 10));
    }
});

// API endpoint to submit a new score
app.post('/api/leaderboard', async (req, res) => {
    const { name, score } = req.body;
    
    // Validate input
    if (!name || !score || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    
    // Calculate fan level
    let level = '';
    if (score >= 100) {
        level = '钻粉';
    } else if (score >= 90) {
        level = '金粉';
    } else if (score >= 80) {
        level = '银粉';
    } else if (score >= 70) {
        level = '铜粉';
    } else if (score >= 60) {
        level = '铁粉';
    } else {
        level = '路人粉';
    }
    
    const newEntry = {
        id: Date.now(),
        name,
        score,
        level,
        date: new Date().toISOString()
    };
    
    try {
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            // Add to Vercel KV
            // Member is the JSON string of the entry
            // Score is the actual game score for sorting
            await kv.zadd('leaderboard', { score: score, member: JSON.stringify(newEntry) });
            
            // Optional: Limit leaderboard size to top 100 to save space
            // Keep ranks 0-99 (top 100), remove the rest
            // zremrangebyrank removes by index (0-based)
            // But we want to keep the top scores (highest scores).
            // ZSET is sorted low to high by default.
            // If we want to keep top 100 highest scores, we keep the last 100 elements.
            // Actually, simpler is just to let it grow for now or trim it carefully.
            // Let's not complicate it with trimming yet unless necessary.
        } else {
            localLeaderboard.push(newEntry);
        }
        
        res.status(201).json({ message: 'Score submitted successfully', entry: newEntry });
    } catch (error) {
        console.error('Error submitting score:', error);
        // Fallback to local
        localLeaderboard.push(newEntry);
        res.status(201).json({ message: 'Score submitted locally (persistence failed)', entry: newEntry });
    }
});

// Serve static files from the root directory
const path = require('path');
app.use(express.static(path.join(__dirname, '../')));

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;

// Initialize with empty leaderboard
localLeaderboard = [];
