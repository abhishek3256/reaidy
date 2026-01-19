# E-commerce Transaction Monitoring Dashboard

A real-time dashboard for monitoring e-commerce transactions and flagging suspicious activity using Google Gemini AI.

## 🚀 Features
- **Real-time Data**: Live transaction stream via WebSockets.
- **AI Fraud Detection**: detailed risk analysis using Google Gemini.
- **Interactive Dashboard**: Live tables, risk score charts, and status indicators.
- **Authentication**: Secure JWT-based login system.
- **Responsive Design**: Built with React and modern CSS.

## 🔑 Login Credentials
Use these credentials to access the dashboard:
- **Username**: `admin`
- **Password**: `admin`

## 🛠️ Tech Stack
- **Frontend**: React, Redux Toolkit, Chart.js, Vite
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB Atlas
- **AI**: Google Gemini API

## 🏃‍♂️ Run Locally

### Option 1: Docker (Recommended)
```bash
docker-compose up --build
```
Access at `http://localhost:3000`.

### Option 2: Manual
**Server:**
```bash
cd server
npm install
npm start
```

**Client:**
```bash
cd client
npm install
npm run dev
```

## 🌍 Deployment
For detailed deployment instructions (Render + Vercel), please see [DEPLOYMENT.md](./DEPLOYMENT.md).
