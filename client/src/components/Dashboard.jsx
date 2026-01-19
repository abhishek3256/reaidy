import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, setTransactions } from '../store/transactionSlice';
import TransactionTable from './TransactionTable';
import RiskChart from './RiskChart';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = ({ token }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Initial Fetch
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('/api/transactions', {
                    headers: { 'x-auth-token': token }
                });
                dispatch(setTransactions(res.data));
            } catch (err) {
                console.error("Failed to fetch transactions", err);
            }
        };
        fetchTransactions();

        // Socket Connection
        const socket = io('/', { // Proxy handles / -> localhost:5000
            transports: ['websocket']
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('newTransaction', (transaction) => {
            console.log('New Transaction:', transaction);
            dispatch(addTransaction(transaction));
        });

        return () => socket.disconnect();
    }, [dispatch, token]);

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #ffeeba', textAlign: 'center', fontSize: '1.2em' }}>
                ⚠️ API LIMIT: 2 REQUESTS PER MINUTE (FREE TIER)
            </div>
            <div className="dashboard-grid">
                <TransactionTable />
                <div>
                    <RiskChart />
                    <div className="card">
                        <h3>System Status</h3>
                        <p>Monitoring Active...</p>
                        <p className="risk-low">AI Fraud Detection: Online</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
