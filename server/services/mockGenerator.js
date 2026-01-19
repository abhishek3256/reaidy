const Transaction = require('../models/Transaction');
const { analyzeTransactionRisk } = require('./aiService');

const generateMockTransaction = async (io) => {
    const amount = Math.floor(Math.random() * 1000) + 10;
    const users = ['user1', 'user2', 'user3', 'user4'];
    const user = users[Math.floor(Math.random() * users.length)];

    const transactionData = {
        transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        amount,
        currency: 'USD',
        userId: user,
        timestamp: new Date(),
        location: 'New York, USA',
        ipAddress: '192.168.1.1'
    };

    // Analyze Risk
    console.log("Analyzing transaction:", transactionData.transactionId);
    const riskAnalysis = await analyzeTransactionRisk(transactionData);

    const newTransaction = new Transaction({
        ...transactionData,
        ...riskAnalysis,
        status: riskAnalysis.riskScore > 80 ? 'flagged' : 'approved'
    });

    await newTransaction.save();

    // Emit to clients
    if (io) {
        io.emit('newTransaction', newTransaction);
    }

    return newTransaction;
};

const startMockStream = (io, intervalMs = 5000) => {
    console.log("Starting mock transaction stream...");
    setInterval(() => {
        generateMockTransaction(io).catch(err => console.error("Mock Gen Error:", err));
    }, intervalMs);
};

module.exports = { generateMockTransaction, startMockStream };
