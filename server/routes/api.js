const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { analyzeTransactionRisk } = require('../services/aiService');

const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Mock Check
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ _id: '1', role: 'admin' }, process.env.JWT_SECRET || 'supersecretkey');
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Get recent transactions
router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ timestamp: -1 }).limit(50);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
