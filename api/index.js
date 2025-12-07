const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Initialize Redis Client
let redisClient;

async function getRedisClient() {
    if (redisClient && redisClient.isOpen) {
        return redisClient;
    }

    if (process.env.REDIS_URL || process.env.KV_URL) {
        try {
            const url = process.env.REDIS_URL || process.env.KV_URL;
            const connectionOptions = {
                url: url
            };

            // Only add TLS options if the URL starts with rediss:// (secure Redis)
            // or if we are in a known cloud environment that needs it.
            // Vercel Redis/Upstash URLs usually start with rediss:// which node-redis handles automatically.
            // However, explicit TLS options can sometimes cause issues if the certs aren't standard.
            // Let's trust node-redis to parse the 'rediss://' protocol for TLS.
            if (url.startsWith('rediss://')) {
                connectionOptions.socket = {
                    tls: true,
                    rejectUnauthorized: false // Often needed for serverless Redis
                };
            }

            redisClient = createClient(connectionOptions);

            redisClient.on('error', (err) => console.error('Redis Client Error', err));
            
            await redisClient.connect();
            console.log('Redis connected successfully');
            return redisClient;
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            return null;
        }
    }
    return null;
}

// In-memory fallback (only used if Redis is not configured)
let localLeaderboard = [];

// API endpoint to get top 10 leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        const redis = await getRedisClient();
        
        // Check if Redis is configured and connected
        if (redis) {
            // Get top 100 scores in descending order
            // zRange returns an array of members (strings) in node-redis v4+
            // zRange(key, start, stop, options)
            const result = await redis.zRange('leaderboard', 0, 99, { REV: true });
            
            // Parse the JSON strings back to objects
            const leaderboard = result.map(item => {
                if (typeof item === 'string') {
                    try {
                        return JSON.parse(item);
                    } catch (e) {
                        return { name: "Unknown", score: 0, level: "N/A" };
                    }
                }
                return item;
            });
            
            return res.json(leaderboard);
        } else {
            console.warn('Redis not configured or disconnected, using in-memory fallback');
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
        const redis = await getRedisClient();
        
        if (redis) {
            // Add to Redis
            // zAdd(key, { score: number, value: string })
            await redis.zAdd('leaderboard', { score: score, value: JSON.stringify(newEntry) });
            
            // Limit leaderboard size to top 100 to save space
            const count = await redis.zCard('leaderboard');
            if (count > 100) {
                // Remove the lowest scoring members
                // zRemRangeByRank(key, start, stop)
                await redis.zRemRangeByRank('leaderboard', 0, count - 101);
            }
        } else {
            localLeaderboard.push(newEntry);
        }
        
        return res.status(201).json({ message: 'Score submitted successfully', entry: newEntry });
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