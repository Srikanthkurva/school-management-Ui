# School Management UI

Frontend for the school management portal built with React, TypeScript, and Vite.

## Local setup

1. Install dependencies:
   `npm install`
2. Copy env values if needed:
   `cp .env.example .env`
3. Start the dev server:
   `npm run dev`

The local Vite dev server runs on `http://localhost:5173`.

## Environment variables

Create a `.env` file for local development or configure the same values in Vercel:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_APP_NAME=SchoolSaaS Platform
VITE_APP_VERSION=1.0.0
```

For local development you can keep:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Vercel deployment

This project is ready for Vercel:

- `vercel.json` adds SPA rewrites so routes like `/login` and `/admin/dashboard` load correctly.
- The frontend expects `VITE_API_BASE_URL` to point to the deployed backend API.

### Steps

1. Push `school-management-Ui` to GitHub.
2. Import the project into Vercel.
3. Set the Root Directory to `school-management-Ui` if you import the full monorepo/workspace.
4. Keep the default framework preset as `Vite`.
5. Add this environment variable in Vercel:
   `VITE_API_BASE_URL=https://your-backend-domain.com/api`
6. Deploy.

## Backend note

If your backend uses CORS, make sure its `FRONTEND_URL` includes your Vercel frontend domain, for example:

```env
FRONTEND_URL=https://your-project-name.vercel.app
```

Otherwise login and API calls may be blocked by CORS after deployment.
