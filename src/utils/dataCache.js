// Simple in-memory cache for API data
class DataCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes
  }

  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp || Date.now() > timestamp) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  has(key) {
    const timestamp = this.timestamps.get(key);
    return timestamp && Date.now() <= timestamp;
  }
}

export const dataCache = new DataCache();

// Cache wrapper for API calls
export function withCache(key, apiCall, ttl) {
  return async (...args) => {
    const cacheKey = `${key}_${JSON.stringify(args)}`;
    
    // Check cache first
    const cached = dataCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Make API call and cache result
    const result = await apiCall(...args);
    dataCache.set(cacheKey, result, ttl);
    return result;
  };
}