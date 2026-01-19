import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
    riskStats: { high: 0, medium: 0, low: 0 }
};

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
            // Recalculate stats
            state.riskStats = calculateStats(action.payload);
        },
        addTransaction: (state, action) => {
            state.transactions.unshift(action.payload);
            if (state.transactions.length > 50) state.transactions.pop();
            state.riskStats = calculateStats(state.transactions);
        }
    }
});

function calculateStats(transactions) {
    const stats = { high: 0, medium: 0, low: 0 };
    transactions.forEach(t => {
        if (t.riskScore > 80) stats.high++;
        else if (t.riskScore > 40) stats.medium++;
        else stats.low++;
    });
    return stats;
}

export const { setTransactions, addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
