import React from 'react';
import { useSelector } from 'react-redux';

const TransactionTable = () => {
    const transactions = useSelector(state => state.transactions.transactions);

    return (
        <div className="card">
            <h2>Live Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>User</th>
                        <th>Risk Score</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.transactionId}>
                            <td>{t.transactionId}</td>
                            <td>${t.amount}</td>
                            <td>{t.userId}</td>
                            <td className={t.riskScore > 80 ? 'risk-high' : t.riskScore > 40 ? 'risk-medium' : 'risk-low'}>
                                {t.riskScore}
                            </td>
                            <td>{t.status}</td>
                            <td>{new Date(t.timestamp).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
