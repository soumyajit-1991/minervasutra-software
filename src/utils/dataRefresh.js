import { dataCache } from './dataCache';

// Auto-refresh data every 5 minutes
let refreshInterval = null;

export function startAutoRefresh(refreshCallback, interval = 5 * 60 * 1000) {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  
  refreshInterval = setInterval(() => {
    // Clear cache to force fresh data
    dataCache.clear();
    
    // Call refresh callback if provided
    if (refreshCallback) {
      refreshCallback();
    }
  }, interval);
}

export function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}

// Manual refresh function
export function refreshData() {
  dataCache.clear();
  window.location.reload();
}

// Refresh specific cache keys
export function refreshCacheKey(key) {
  const keysToDelete = [];
  for (const [cacheKey] of dataCache.cache) {
    if (cacheKey.startsWith(key)) {
      keysToDelete.push(cacheKey);
    }
  }
  keysToDelete.forEach(k => dataCache.delete(k));
}