# Deployment Guide: Render (Backend) & Vercel (Frontend)

Since your application uses **WebSockets** and **Background Tasks**, we must split the deployment:
- **Backend (Server)**: Deployed to **Render** (Free tier supports this).
- **Frontend (Client)**: Deployed to **Vercel** (Best for React).

---

## Part 1: Deploy Backend to Render

1.  **Push to GitHub**: Make sure your project `reaidy` is pushed to a GitHub repository.
2.  **Go to Render**: [dashboard.render.com](https://dashboard.render.com/)
3.  **New Web Service**: Click "New +" -> "Web Service".
4.  **Connect Repo**: Select your `reaidy` repository.
5.  **Configure Settings**:
    *   **Name**: `reaidy-backend`
    *   **Root Directory**: `server` (IMPORTANT!)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Plan**: Free
6.  **Environment Variables**:
    Scroll down to "Environment Variables" and add these:
    *   `GEMINI_API_KEY`: (Paste your key: `AIza...`)
    *   `MONGODB_URI`: (Paste your full Mongo URI: `mongodb+srv://...`)
    *   `JWT_SECRET`: `supersecretkey`
    *   `PORT`: `5000` (Optional, Render usually sets this automatically)
7.  **Deploy**: Click "Create Web Service".
8.  **Wait**: Wait for it to say "Live". **Copy the URL** (e.g., `https://reaidy-backend.onrender.com`).

---

## Part 2: Deploy Frontend to Vercel

1.  **Go to Vercel**: [vercel.com](https://vercel.com/)
2.  **Add New Project**: Import the same `reaidy` repository.
3.  **Configure Settings**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `client` (IMPORTANT! Click "Edit" next to Root Directory and select `client`).
4.  **Environment Variables**:
    *   Expand "Environment Variables".
    *   Key: `VITE_API_URL`
    *   Value: (Paste your Render Backend URL from Part 1, e.g., `https://reaidy-backend.onrender.com`) - **Do not add a trailing slash**.
5.  **Deploy**: Click "Deploy".

---

## That's it!
Your Request Flow:
User -> Vercel Frontend -> (WebSockets/API) -> Render Backend -> MongoDB/Gemini
