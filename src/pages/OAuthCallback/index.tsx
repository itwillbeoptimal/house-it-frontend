import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refresh = params.get('refresh');
    const returnTo = params.get('returnTo') || '/';

    if (token && refresh) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh);

      window.history.replaceState({}, '', window.location.pathname);

      setTimeout(() => {
        navigate(returnTo, { replace: true });
      }, 0);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default OAuthCallback;
