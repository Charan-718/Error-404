// Central API Configuration
// When deploying Frontend to Netlify and Backend to Render:
// You can either:
// 1. Set BACKEND_URL to your Render backend URL (e.g., "https://error-404-backend.onrender.com")
// OR
// 2. Leave it empty ("") if you use Netlify _redirects or if hosting everything together on Render.
const BACKEND_URL = "";

const API_BASE_URL = BACKEND_URL || (
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : ''
);
