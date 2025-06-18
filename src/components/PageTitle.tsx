import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'home';
    const pageName = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `Zielo - ${pageName}`;
  }, [location]);

  return null;
}; 