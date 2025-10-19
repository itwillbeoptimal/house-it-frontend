import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-bottom: 8px;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: Paperozi;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8px 0 16px 0;
`;

export const Image = styled.img`
  height: 84px;
`;

export const Content = styled.div`
  margin-bottom: 24px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  white-space: pre-line;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const FooterButtonWrapper = styled.div`
  flex: 1;
`;
