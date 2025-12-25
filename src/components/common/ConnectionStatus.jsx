import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ConnectionStatus({ darkMode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
          method: 'GET',
          timeout: 5000
        });
        setApiStatus(response.ok ? 'connected' : 'error');
      } catch (error) {
        setApiStatus('error');
      }
    };

    if (isOnline) {
      checkApiStatus();
      const interval = setInterval(checkApiStatus, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    } else {
      setApiStatus('offline');
    }
  }, [isOnline]);

  if (!isOnline || apiStatus === 'error') {
    return (
      <div className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
        darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
      }`}>
        <WifiOff size={16} />
        {!isOnline ? 'No Internet Connection' : 'API Connection Error'}
      </div>
    );
  }

  if (apiStatus === 'connected') {
    return (
      <div className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
        darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
      }`}>
        <Wifi size={16} />
        Connected
      </div>
    );
  }

  return null;
}