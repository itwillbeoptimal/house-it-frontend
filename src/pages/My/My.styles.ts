import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0 4px 0;
`;

export const ProfileWrapper = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.h1`
  font-weight: 600;
  font-size: 18px;
`;

export const WelcomeMessage = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
`;

export const MenuSection = styled.section`
  margin-top: 8px;
`;

export const SectionTitle = styled.h2`
  padding: 16px 4px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  font-size: 13px;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 20px;
  text-align: left;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
