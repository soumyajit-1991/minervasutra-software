# Vercel Deployment Guide

## Fixing the "Unexpected token '<', "<!doctype "... is not valid JSON" Error

This error occurs when the frontend tries to fetch data from the API, but receives an HTML page instead of JSON. This typically happens when:

1. The `VITE_API_URL` environment variable is not set in Vercel
2. The API URL is pointing to localhost (which doesn't exist in production)
3. The backend server is not deployed or not accessible

## Solution

### Step 1: Deploy Your Backend

First, make sure your backend API is deployed somewhere accessible (e.g., Vercel, Heroku, Railway, Render, etc.).

### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your deployed backend URL (e.g., `https://your-backend-api.vercel.app`)
   - **Environment**: Select all environments (Production, Preview, Development)

### Step 3: Redeploy

After setting the environment variable, you need to redeploy your application:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) menu on your latest deployment
3. Click **Redeploy**

Or simply push a new commit to trigger a new deployment.

## Example Backend URLs

- **Vercel**: `https://your-backend-project.vercel.app`
- **Heroku**: `https://your-backend-app.herokuapp.com`
- **Railway**: `https://your-backend.up.railway.app`
- **Render**: `https://your-backend.onrender.com`

## Verification

After deployment, check the browser console. You should see:
- No more "Unexpected token '<'" errors
- API calls should be successful
- Data should load properly

If you still see errors, verify:
- The backend URL is correct and accessible
- CORS is properly configured on your backend
- The backend endpoints match what the frontend expects

