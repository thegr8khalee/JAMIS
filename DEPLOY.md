# How to Deploy KAMIS to Vercel

This repository contains two distinct applications that should be deployed as separate projects on Vercel.

## 1. Deploy Farmer Portal

1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your Git repository.
4.  In the **Configure Project** step:
    *   **Root Directory**: Click "Edit" and select `farmer-portal`.
    *   **Framework Preset**: It should auto-detect "Vite".
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
5.  Click **Deploy**.

## 2. Deploy KAMIS Admin (kamis-proto)

1.  Go back to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"** (again).
3.  Import the **same** Git repository again.
4.  In the **Configure Project** step:
    *   **Root Directory**: Click "Edit" and select `kamis-proto`.
    *   **Framework Preset**: It should auto-detect "Vite".
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
5.  Click **Deploy**.

## Configuration Notes

Both projects include a `vercel.json` file to handle single-page application (SPA) routing, ensuring that direct links to pages (if you add routing later) work correctly.

### Environment Variables
If you need to add environment variables in the future:
1.  Go to the Project Settings in Vercel.
2.  Navigate to **Environment Variables**.
3.  Add keys like `VITE_API_URL` (variables must start with `VITE_` to be visible to the client).
