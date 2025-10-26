import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFcmToken } from '@/services/firebase/notification';
import useModal from '@/hooks/useModal';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import useLogoutMutation from '@/hooks/mutations/auth/useLogoutMutation';
import getNotificationPermission from '@/utils/getNotificationPermission';
import { updateFcmToken } from '@/apis/user';
import * as S from '@/pages/My/My.styles';
import Toggle from '@/pages/My/components/Toggle';
import ArrowIcon from '@/assets/icons/arrow.svg?react';
import DefaultProfileImage from '@/assets/images/default-profile.png';

const My: React.FC = () => {
  useSubpageHeader({ title: '마이페이지' });

  const navigate = useNavigate();
  const { confirm, alert } = useModal();
  const { data: userInfo, isLoading, error } = useUserInfoQuery();
  const { mutate: logout } = useLogoutMutation();
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false);

  useEffect(() => {
    const permission = getNotificationPermission();
    setPushNotificationEnabled(permission === 'granted');

    const checkPermissionChange = () => {
      const currentPermission = getNotificationPermission();
      setPushNotificationEnabled(currentPermission === 'granted');
    };

    window.addEventListener('focus', checkPermissionChange);

    const permissionCheckInterval = setInterval(checkPermissionChange, 500);

    return () => {
      window.removeEventListener('focus', checkPermissionChange);
      clearInterval(permissionCheckInterval);
    };
  }, []);

  const handleEditProfile = () => {
    navigate('/my/edit-profile');
  };

  const handleLogout = () => {
    confirm({
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      onConfirm: () => {
        logout();
      },
      confirmText: '로그아웃',
      cancelText: '취소',
    });
  };

  const handleDeleteAccount = () => {};

  const handlePushNotificationToggle = async (checked: boolean) => {
    const permission = getNotificationPermission();

    if (permission === 'unsupported') {
      alert({
        title: '알림 미지원',
        content: '이 브라우저는 알림을 지원하지 않습니다.',
      });
      return;
    }

    if (checked) {
      if (permission === 'default') {
        const newPermission = await Notification.requestPermission();

        if (newPermission === 'denied') {
          alert({
            title: '알림 권한 거부됨',
            content: '앱 설정에서 알림 권한을 직접 허용해주세요.',
          });
          setPushNotificationEnabled(false);
          return;
        }

        if (newPermission === 'granted') {
          const fcmToken = await getFcmToken();
          if (fcmToken) {
            await updateFcmToken({ fcmToken });
          }
          setPushNotificationEnabled(true);
        }
      } else if (permission === 'denied') {
        alert({
          title: '알림 권한 거부됨',
          content: '앱 설정에서 알림 권한을 직접 허용해주세요.',
        });
        setPushNotificationEnabled(false);
      } else if (permission === 'granted') {
        setPushNotificationEnabled(true);
      }
    }
    if (permission === 'granted') {
      alert({
        title: '알림 권한 해제',
        content: '앱 설정에서 알림 권한을 직접 해제해주세요.',
      });
      setPushNotificationEnabled(true);
    } else {
      setPushNotificationEnabled(false);
    }
  };

  if (isLoading || error) {
    return null;
  }

  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileWrapper>
          <S.ProfileImage
            src={userInfo?.profileUrl || DefaultProfileImage}
            alt="프로필"
          />
        </S.ProfileWrapper>
        <S.ProfileInfo>
          <S.Nickname>{userInfo?.nickname}</S.Nickname>
          <S.WelcomeMessage>환영합니다!</S.WelcomeMessage>
        </S.ProfileInfo>
      </S.ProfileSection>
      <S.MenuSection>
        <S.SectionTitle>계정 설정</S.SectionTitle>
        <S.MenuList>
          <S.MenuItem onClick={handleEditProfile}>
            회원 정보 수정
            <ArrowIcon />
          </S.MenuItem>
          <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem>
          <S.MenuItem onClick={handleDeleteAccount}>회원 탈퇴</S.MenuItem>
        </S.MenuList>
      </S.MenuSection>
      <S.MenuSection>
        <S.SectionTitle>알림</S.SectionTitle>
        <S.MenuList>
          <S.MenuItem as="div">
            푸시 알림 수신 동의
            <S.ToggleWrapper>
              <Toggle
                checked={pushNotificationEnabled}
                onChange={handlePushNotificationToggle}
              />
            </S.ToggleWrapper>
          </S.MenuItem>
        </S.MenuList>
      </S.MenuSection>
      <S.MenuSection>
        <S.SectionTitle>나의 컨텐츠</S.SectionTitle>
        <S.MenuList>
          <S.MenuItem onClick={() => navigate('/my/scrap-box')}>
            스크랩한 매거진
            <ArrowIcon />
          </S.MenuItem>
          <S.MenuItem onClick={() => navigate('/my/quiz-archive')}>
            퀴즈 보관함
            <ArrowIcon />
          </S.MenuItem>
        </S.MenuList>
      </S.MenuSection>
    </S.Container>
  );
};

export default My;
