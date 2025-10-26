import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import useUpdateUserInfoMutation from '@/hooks/mutations/user/useUpdateUserInfoMutation';
import useModal from '@/hooks/useModal';
import useBottomSheet from '@/hooks/useBottomSheet';
import convertImageToJpeg from '@/utils/convertImageToJpeg';
import { isAvailableNickname } from '@/apis/user';
import * as S from '@/pages/EditProfile/EditProfile.styles';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DefaultProfileImage from '@/assets/images/default-profile.png';
import ReplaceIcon from '@/assets/icons/replace.svg?react';

const EditProfile: React.FC = () => {
  useSubpageHeader({ title: '프로필 수정' });

  const navigate = useNavigate();
  const { data: userInfo } = useUserInfoQuery();
  const { mutate, isPending } = useUpdateUserInfoMutation();
  const { alert } = useModal();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(DefaultProfileImage);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<
    'idle' | 'checking' | 'available' | 'unavailable'
  >('idle');
  const [, setIsNicknameChecked] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setPreviewUrl(userInfo.profileUrl || DefaultProfileImage);
    }
  }, [userInfo]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameStatus('idle');
    setIsNicknameChecked(false);
  };

  const handleNicknameBlur = async () => {
    if (!nickname.trim()) {
      return;
    }

    if (nickname === userInfo?.nickname) {
      setNicknameStatus('idle');
      setIsNicknameChecked(true);
      return;
    }

    setNicknameStatus('checking');
    try {
      const result = await isAvailableNickname(nickname);
      if (result.isAvailable) {
        setNicknameStatus('available');
        setIsNicknameChecked(true);
      } else {
        setNicknameStatus('unavailable');
        setIsNicknameChecked(false);
      }
    } catch {
      setNicknameStatus('idle');
      setIsNicknameChecked(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const supportedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/heic',
        'image/heif',
      ];

      if (
        !supportedTypes.includes(file.type.toLowerCase()) &&
        !file.name.match(/\.(heic|heif)$/i)
      ) {
        alert({
          title: '지원하지 않는 파일 형식',
          content: '지원하지 않는 형식의 이미지 파일입니다.',
        });
        return;
      }

      try {
        const processedFile = await convertImageToJpeg(file);

        setImageFile(processedFile);
        setIsImageDeleted(false);

        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(processedFile);
        closeBottomSheet();
      } catch {
        alert({
          title: '이미지 처리 실패',
          content: '이미지를 처리하는 중 오류가 발생했습니다.',
        });
      }
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setIsImageDeleted(true);
    setPreviewUrl(DefaultProfileImage);
    closeBottomSheet();
  };

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageClick = () => {
    openBottomSheet({
      id: 'profile-image-options',
      title: '프로필 이미지',
      content: (
        <S.BottomSheetContent>
          <Button fullWidth onClick={handleImageChangeClick}>
            앨범에서 선택
          </Button>
          <S.ImageInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button fullWidth variant="secondary" onClick={handleImageDelete}>
            기본 이미지로 변경
          </Button>
        </S.BottomSheetContent>
      ),
    });
  };

  const hasNicknameChanged = nickname !== userInfo?.nickname;
  const hasImageChanged = imageFile !== null || isImageDeleted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        nickname: hasNicknameChanged ? nickname : undefined,
        image: imageFile || undefined,
        isProfileImageDeleted: isImageDeleted,
      },
      {
        onSuccess: () => {
          alert({
            title: '프로필 수정 완료',
            content: '프로필이 수정되었습니다.',
            onConfirm: () => {
              navigate('/my');
            },
          });
        },
        onError: () => {
          alert({
            title: '프로필 수정 실패',
            content: '프로필을 수정하지 못했습니다.',
          });
        },
      },
    );
  };

  const getNicknameMessage = () => {
    if (nicknameStatus === 'available') return '사용 가능한 닉네임입니다.';
    if (nicknameStatus === 'unavailable') return '이미 사용 중인 닉네임입니다.';
    return '';
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.ProfileImageSection>
          <S.ProfileImageWrapper onClick={handleProfileImageClick}>
            <S.ProfileImage src={previewUrl} alt="프로필" />
            <S.ProfileImageEditButton>
              <ReplaceIcon />
            </S.ProfileImageEditButton>
          </S.ProfileImageWrapper>
        </S.ProfileImageSection>
        <S.InputSection>
          <S.Label htmlFor="nickname">닉네임</S.Label>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            placeholder="닉네임을 입력하세요"
          />
          {nicknameStatus !== 'idle' && (
            <S.NicknameMessage status={nicknameStatus}>
              {getNicknameMessage()}
            </S.NicknameMessage>
          )}
        </S.InputSection>
        <S.ButtonSection>
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={() => navigate('/my')}
          >
            취소
          </Button>
          <Button
            type="submit"
            fullWidth
            size="large"
            disabled={
              isPending ||
              (!hasNicknameChanged && !hasImageChanged) ||
              (hasNicknameChanged && nicknameStatus !== 'available')
            }
          >
            저장
          </Button>
        </S.ButtonSection>
      </S.Form>
    </S.Container>
  );
};

export default EditProfile;
