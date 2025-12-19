# Vercel Deployment Setup - Complete Guide

## Problem
You're getting the error: "API returned HTML instead of JSON" because the `VITE_API_URL` is pointing to your frontend URL instead of your backend.

## Solution Options

### Option 1: Deploy Backend Separately (RECOMMENDED - Easiest)

1. **Deploy your backend as a separate Vercel project:**
   - Create a new Vercel project from your `server` folder
   - Or deploy to another platform (Railway, Render, Heroku, etc.)
   - Get the backend URL (e.g., `https://your-backend-api.vercel.app`)

2. **Set environment variable in your frontend Vercel project:**
   - Go to your frontend project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-api.vercel.app`
   - Apply to all environments
   - Redeploy

3. **Set environment variables in your backend project:**
   - Add `MONGO_URI` with your MongoDB connection string
   - Add any other required environment variables

### Option 2: Deploy Both in Same Project (Current Setup)

The code is now configured to serve both frontend and backend from the same Vercel project.

**Steps:**

1. **Install dependencies:**
   ```bash
   npm install serverless-http
   ```

2. **Set environment variables in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `MONGO_URI` = your MongoDB connection string
   - **Remove or leave empty** `VITE_API_URL` (it will use relative URLs)
   - Apply to all environments

3. **Redeploy:**
   - Push your changes or manually redeploy

4. **Verify the setup:**
   - The API should be accessible at: `https://pharmacy-management-system-ivory.vercel.app/api/employees`
   - Frontend will use relative URLs (same domain)

## Current Configuration

- ✅ `vercel.json` - Routes `/api/*` to serverless functions
- ✅ `api/index.js` - Serverless function wrapper
- ✅ `server/index.js` - Updated to work with Vercel
- ✅ `src/config.js` - Uses relative URLs in production

## Troubleshooting

### If API still returns HTML:

1. **Check Vercel logs:**
   - Go to your project → Deployments → Click on latest deployment → Functions tab
   - Look for errors in the `/api` function

2. **Verify MongoDB connection:**
   - Make sure `MONGO_URI` is set correctly
   - Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Vercel)

3. **Check CORS:**
   - The backend already has CORS enabled
   - If issues persist, verify CORS settings in `server/index.js`

### If you prefer separate deployments:

1. Remove the `api/` folder
2. Revert `vercel.json` to only handle frontend routes
3. Deploy backend separately
4. Set `VITE_API_URL` to your backend URL

## Environment Variables Needed

**Frontend (if using separate backend):**
- `VITE_API_URL` = Your backend URL

**Backend (always needed):**
- `MONGO_URI` = Your MongoDB connection string

## Testing Locally

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

The frontend will use `http://localhost:5000` automatically in development.
