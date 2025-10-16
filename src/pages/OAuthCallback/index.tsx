import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  const { alert } = useModal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const token = params.get('token');
    const refresh = params.get('refresh');
    const returnTo = params.get('returnTo') || '/';

    if (success === 'false') {
      alert({
        title: '로그인 실패',
        content: '로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        onConfirm: () => {
          navigate('/login');
        },
      });

      return;
    }

    if (token && refresh) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh);

      window.history.replaceState({}, '', window.location.pathname);

      setTimeout(() => {
        navigate(returnTo, { replace: true });
      }, 0);
      return;
    }

    navigate('/login');
  }, [navigate]);

  return null;
};

export default OAuthCallback;
