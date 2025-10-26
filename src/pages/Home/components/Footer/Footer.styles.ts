import styled from '@emotion/styled';

export const Container = styled.footer`
  padding: 40px 20px 20px 20px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.COLORS.GRAY[0]};
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Logo = styled.div`
  & svg {
    width: auto;
    height: 24px;
    fill: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkTitle = styled.h3`
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  font-weight: 600;
  font-size: 14px;
`;

export const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Link = styled.a`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContactTitle = styled.h3`
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  font-weight: 600;
  font-size: 14px;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
`;

export const EmailLink = styled.a`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const Copyright = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 12px;
  text-align: center;
`;
