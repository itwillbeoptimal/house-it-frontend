import { getToken } from 'firebase/messaging';
import { messaging } from '@/services/firebase';
import eventManager from '@/utils/eventManager';

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    return currentToken || null;
  } catch {
    eventManager.emit('alert', {
      title: '디바이스 토큰 오류',
      content: '디바이스 토큰을 가져오는 중 오류가 발생했습니다.',
    });
    return null;
  }
};

export const registerServiceWorker = async (): Promise<void> => {
  try {
    await navigator.serviceWorker.register('firebase-messaging-sw.js');
  } catch {
    eventManager.emit('alert', {
      title: '서비스 워커 등록 실패',
      content: '서비스 워커 등록에 실패했습니다.',
    });
  }
};
