import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import { deleteUserAccount } from '@/apis/user';
import * as S from '@/pages/DeleteAccount/DeleteAccount.styles';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';

const DeleteAccount: React.FC = () => {
  useSubpageHeader({ title: '회원 탈퇴' });

  const navigate = useNavigate();
  const { confirm, alert } = useModal();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxClick = () => {
    setIsAgreed(!isAgreed);
  };

  const handleDeleteAccount = () => {
    if (!isAgreed) {
      alert({
        title: '안내',
        content: '회원 탈퇴 안내사항에 동의해주세요.',
      });
      return;
    }

    confirm({
      title: '회원 탈퇴',
      content: '정말 탈퇴하시겠습니까?\n탈퇴 후에는 계정을 복구할 수 없습니다.',
      onConfirm: async () => {
        try {
          await deleteUserAccount();
          setTimeout(() => {
            alert({
              title: '탈퇴 완료',
              content: '회원 탈퇴가 완료되었습니다.',
              onConfirm: () => {
                navigate('/login');
              },
            });
          }, 250);
        } catch {
          setTimeout(() => {
            alert({
              title: '탈퇴 실패',
              content: '회원 탈퇴 처리 중 오류가 발생했습니다.',
            });
          }, 250);
        }
      },
      confirmText: '탈퇴',
      cancelText: '취소',
    });
  };

  return (
    <S.Container>
      <S.WarningSection>
        <S.WarningTitle>회원 탈퇴 전 확인해 주세요.</S.WarningTitle>
        <S.WarningList>
          <S.WarningItem>
            탈퇴 시 회원님의 모든 정보가 삭제되며, 복구가 불가능합니다.
          </S.WarningItem>
          <S.WarningItem>
            작성하신 게시글과 댓글은 자동으로 삭제되지 않으며, 삭제를 원하시는
            경우 탈퇴 전 직접 삭제해 주셔야 합니다.
          </S.WarningItem>
          <S.WarningItem>
            스크랩한 매거진, 퀴즈 기록 등 모든 활동 내역이 삭제됩니다.
          </S.WarningItem>
          <S.WarningItem>
            탈퇴 후 동일한 계정으로 재가입이 가능하나, 이전 데이터는 복구되지
            않습니다.
          </S.WarningItem>
        </S.WarningList>
      </S.WarningSection>
      <Checkbox
        selected={isAgreed}
        onClick={handleCheckboxClick}
        label="위 내용을 모두 확인하였으며, 회원 탈퇴에 동의합니다."
      />
      <S.ButtonsWrapper>
        <Button
          variant="secondary"
          size="large"
          fullWidth
          onClick={() => navigate('/my')}
        >
          취소
        </Button>
        <Button
          size="large"
          fullWidth
          disabled={!isAgreed}
          onClick={handleDeleteAccount}
        >
          탈퇴하기
        </Button>
      </S.ButtonsWrapper>
    </S.Container>
  );
};

export default DeleteAccount;
