import styled from '@emotion/styled';

export const BannerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  background-image: linear-gradient(
    315deg,
    #559cff 0%,
    ${(props) => props.theme.COLORS.MAIN.PRIMARY} 100%
  );
  border-radius: 16px;
  color: white;
  cursor: pointer;

  & svg {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.span`
  color: rgba(255, 255, 255, 0.7);
`;

export const Title = styled.span`
  color: white;
  font-family: Paperozi;
  font-size: 18px;
  font-weight: 600;
`;

export const IconWrapper = styled.div`
  line-height: 0;
`;
