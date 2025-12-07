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
            // Get top 100 scores in descending order
            // zrange returns an array of members (strings)
            const result = await kv.zrange('leaderboard', 0, 99, { rev: true });
            
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
            return res.json(sortedLeaderboard.slice(0, 100));
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Fallback to empty or local
        const sortedLeaderboard = [...localLeaderboard].sort((a, b) => b.score - a.score);
        return res.json(sortedLeaderboard.slice(0, 100));
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
            // We use a unique ID in the member string to ensure uniqueness, 
            // but for zadd, the member must be unique. 
            // If we just use JSON.stringify(newEntry), duplicate names/scores might overwrite if the ID was somehow same (unlikely with Date.now()).
            // However, Redis ZSETs are unique by member.
            
            await kv.zadd('leaderboard', { score: score, member: JSON.stringify(newEntry) });
            
            // Limit leaderboard size to top 100 to save space
            // Redis ZREMRANGEBYRANK removes items by rank (0-based).
            // ZRANGE is sorted low to high by default.
            // We want to KEEP the highest scores (which are at the END of the standard sort).
            // So, ranks 0 to -101 are the lowest scores that we want to remove.
            // Wait, kv.zadd uses score.
            // Let's just keep top 100.
            // Since we retrieve with { rev: true } (highest first), 
            // the "lowest" scores are at index 0 in a standard sort.
            // We want to remove the lowest scores if total count > 100.
            
            const count = await kv.zcard('leaderboard');
            if (count > 100) {
                // Remove the lowest scoring members (which are at rank 0 to count-101)
                // ZREMRANGEBYRANK key start stop
                // We want to keep 100, so we remove from 0 to (count - 100 - 1)
                await kv.zremrangebyrank('leaderboard', 0, count - 101);
            }
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