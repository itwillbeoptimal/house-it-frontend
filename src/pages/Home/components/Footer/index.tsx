import React from 'react';
import * as S from '@/pages/Home/components/Footer/Footer.styles';
import LogoSVG from '@/assets/logo.svg?react';

const Footer: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.Logo>
          <LogoSVG />
        </S.Logo>
        <S.InfoGrid>
          <S.LinkSection>
            <S.LinkTitle>정보</S.LinkTitle>
            <S.LinkList>
              <S.Link href="/terms">이용약관</S.Link>
              <S.Link href="/privacy">개인정보처리방침</S.Link>
            </S.LinkList>
          </S.LinkSection>
          <S.ContactSection>
            <S.ContactTitle>고객센터</S.ContactTitle>
            <S.ContactInfo>
              <S.ContactItem>
                이메일
                <S.EmailLink href="mailto:house.it.cs@gmail.com">
                  house.it.cs@gmail.com
                </S.EmailLink>
              </S.ContactItem>
            </S.ContactInfo>
          </S.ContactSection>
        </S.InfoGrid>
        <S.Copyright>© 2025 House It. All rights reserved.</S.Copyright>
      </S.Content>
    </S.Container>
  );
};

export default Footer;
