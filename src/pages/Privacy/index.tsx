import React from 'react';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import * as S from '@/pages/Privacy/Privacy.styles';

const Privacy: React.FC = () => {
  useSubpageHeader({ title: '개인정보처리방침' });

  return (
    <S.Container>
      <S.Content>
        <S.Section>
          <S.Title>제1조 (개인정보의 처리목적)</S.Title>
          <S.Text>
            하우스잇은 다음의 목적을 위하여 개인정보를 처리합니다.
          </S.Text>
          <S.List>
            <S.ListItem>회원 가입 및 관리</S.ListItem>
            <S.ListItem>서비스 제공 및 개선</S.ListItem>
            <S.ListItem>공지사항 전달</S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제2조 (수집하는 개인정보 항목)</S.Title>
          <S.Text>
            회사는 회원 가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
          </S.Text>
          <S.List>
            <S.ListItem>필수 항목: 이메일, 닉네임</S.ListItem>
            <S.ListItem>선택 항목: 프로필 이미지</S.ListItem>
            <S.ListItem>자동 수집: 서비스 이용 기록, IP 주소, 쿠키</S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제3조 (개인정보의 보유 및 이용기간)</S.Title>
          <S.Text>
            회원의 개인정보는 회원 탈퇴 시까지 보유 및 이용됩니다. 회원 탈퇴 시
            개인정보는 지체 없이 파기됩니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제4조 (개인정보의 제3자 제공)</S.Title>
          <S.Text>
            회사는 회원의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
            다만, 서비스 제공을 위해 필요한 경우 클라우드 서비스 등을 이용할 수
            있으며, 이 경우 관련 법령에 따라 안전하게 관리됩니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제5조 (개인정보의 파기)</S.Title>
          <S.Text>
            회원 탈퇴 또는 개인정보 보유기간 경과 시, 해당 개인정보는 지체 없이
            파기됩니다. 전자적 파일 형태의 개인정보는 복구 불가능한 방법으로
            삭제됩니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제6조 (정보주체의 권리)</S.Title>
          <S.Text>회원은 언제든지 다음의 권리를 행사할 수 있습니다.</S.Text>
          <S.List>
            <S.ListItem>개인정보 열람 및 수정</S.ListItem>
            <S.ListItem>개인정보 삭제 요구 (회원 탈퇴)</S.ListItem>
            <S.ListItem>개인정보 처리정지 요구</S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제7조 (개인정보 처리방침 변경)</S.Title>
          <S.Text>
            본 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경사항이 있는 경우 시행 7일 전부터 공지합니다.
          </S.Text>
        </S.Section>
        <S.UpdateDate>시행일자: 2025년 10월 31일</S.UpdateDate>
      </S.Content>
    </S.Container>
  );
};

export default Privacy;
