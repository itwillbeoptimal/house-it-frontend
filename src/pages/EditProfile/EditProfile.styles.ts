import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 20px 20px 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
  gap: 16px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileImageEditButton = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);

  & svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }
`;

export const BottomSheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0 20px 0;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

export const NicknameMessage = styled.p<{ status: string }>`
  font-size: 12px;
  margin-top: 4px;
  margin-left: 2px;
  color: ${({ status, theme }) => {
    if (status === 'available') return theme.COLORS.MAIN.PRIMARY;
    if (status === 'unavailable') return theme.COLORS.LABEL.ALERT;
    return theme.COLORS.LABEL.SECONDARY;
  }};
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 12px;
`;
