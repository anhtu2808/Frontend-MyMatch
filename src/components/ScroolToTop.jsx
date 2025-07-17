import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top khi route thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}