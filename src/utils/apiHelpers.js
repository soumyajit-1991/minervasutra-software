/**
 * Safely parse JSON response, detecting HTML error pages
 * @param {Response} response - Fetch response object
 * @returns {Promise<any>} Parsed JSON data
 */
export async function safeJsonParse(response) {
  const contentType = response.headers.get("content-type");
  
  // Check if response is actually JSON
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    
    // If we got HTML (like an error page), provide helpful error
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<!doctype")) {
      const apiUrl = import.meta.env.VITE_API_URL || "https://hr-management-r6bh.vercel.app";
      throw new Error(
        `API returned HTML instead of JSON. This usually means:\n` +
        `1. The API URL (${apiUrl}) is incorrect or not accessible\n` +
        `2. The backend server is not running or not deployed\n` +
        `3. CORS is blocking the request\n\n` +
        `Please check your VITE_API_URL environment variable in Vercel settings.`
      );
    }
    
    // If it's not JSON and not HTML, throw with the actual text
    throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
  }
  
  // Parse as JSON
  try {
    return await response.json();
  } catch (error) {
    const text = await response.text();
    throw new Error(`Failed to parse JSON: ${error.message}. Response: ${text.substring(0, 200)}`);
  }
}

/**
 * Enhanced fetch wrapper with better error handling
 * @param {string} url - URL to fetch
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
export async function safeFetch(url, options = {}) {
  // Check if API URL is set in production
  if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
    throw new Error(
      "VITE_API_URL environment variable is not set!\n" +
      "Please set it in Vercel: Project Settings → Environment Variables"
    );
  }
  
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    // Network errors (CORS, connection refused, etc.)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      const apiUrl = import.meta.env.VITE_API_URL || "https://hr-management-r6bh.vercel.app";
      throw new Error(
        `Failed to connect to API at ${apiUrl}.\n` +
        `This could be due to:\n` +
        `- Backend server is not running or not deployed\n` +
        `- Incorrect API URL in VITE_API_URL environment variable\n` +
        `- CORS configuration issue\n` +
        `Original error: ${error.message}`
      );
    }
    throw error;
  }
}

