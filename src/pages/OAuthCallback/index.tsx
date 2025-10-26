import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFcmToken } from '@/services/firebase/notification';
import { updateFcmToken } from '@/apis/user';
import useModal from '@/hooks/useModal';
import getNotificationPermission from '@/utils/getNotificationPermission';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  const { alert } = useModal();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const success = params.get('success');
      const accessToken = params.get('accessToken');
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

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        const permission = getNotificationPermission();
        if (permission === 'granted') {
          const fcmToken = await getFcmToken();
          if (fcmToken) {
            await updateFcmToken({ fcmToken });
          }
        }

        window.history.replaceState({}, '', window.location.pathname);
        navigate(returnTo, { replace: true });
        return;
      }

      navigate('/login');
    };

    handleOAuthCallback();
  }, [navigate, alert]);

  return null;
};

export default OAuthCallback;
