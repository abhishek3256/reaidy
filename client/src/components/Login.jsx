import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Remove trailing slash if present to avoid double slash //api
        const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const API_URL = rawUrl.replace(/\/$/, '');

        console.log("Attempting login to:", `${API_URL}/api/login`); // Debug log

        try {
            const res = await axios.post(`${API_URL}/api/login`, { username, password });
            onLogin(res.data.token);
        } catch (err) {
            console.error("Login Error:", err);
            if (err.response) {
                // Server responded with a status code other than 2xx
                setError(`Login Failed: ${err.response.data}`);
            } else if (err.request) {
                // Request was made but no response was received
                setError('Network Error: Cannot reach server. Is it running?');
            } else {
                // Something else happened
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username: </label>
                    <input value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
