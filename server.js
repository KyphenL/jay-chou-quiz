const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Simple in-memory leaderboard storage
let leaderboard = [];

// API endpoint to get top 10 leaderboard
app.get('/api/leaderboard', (req, res) => {
    // Sort by score descending
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
    // Return top 10
    res.json(sortedLeaderboard.slice(0, 10));
});

// API endpoint to submit a new score
app.post('/api/leaderboard', (req, res) => {
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
        timestamp: new Date().toISOString()
    };
    
    // Add to leaderboard
    leaderboard.push(newEntry);
    
    res.status(201).json({ message: 'Score submitted successfully', entry: newEntry });
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Initialize with empty leaderboard
leaderboard = [];