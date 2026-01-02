// Get API URL from environment variable
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // If environment variable is set, use it
  if (envUrl) {
    // Remove trailing slash if present
    return envUrl.replace(/\/$/, "");
  }
  
  // In production (Vercel), use relative URLs (same domain)
  // This works if backend is deployed to the same Vercel project
  if (import.meta.env.PROD) {
    // Use relative URL - API will be on the same domain
    return "";
  }
  
  // Development fallback
  return envUrl || "https://hr-management-backend-w6w4.vercel.app";
};

export const API_BASE_URL = getApiBaseUrl();
