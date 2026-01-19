const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'flagged'], default: 'pending' },
    riskScore: { type: Number, default: 0 },
    riskFactors: [String],
    location: String,
    ipAddress: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
