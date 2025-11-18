import React from 'react';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import * as S from '@/pages/Terms/Terms.styles';

const Terms: React.FC = () => {
  useSubpageHeader({ title: '이용약관' });

  return (
    <S.Container>
      <S.Content>
        <S.Section>
          <S.Title>제1조 (목적)</S.Title>
          <S.Text>
            본 약관은 하우스잇(이하 &#34;회사&#34;)이 제공하는 생활 정보
            서비스(이하 &#34;서비스&#34;)의 이용과 관련하여 회사와 회원 간의
            권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제2조 (정의)</S.Title>
          <S.Text>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</S.Text>
          <S.List>
            <S.ListItem>
              &#34;서비스&#34;란 회사가 제공하는 생활 전반에 관한 정보 제공,
              매거진, Q&A, 퀴즈 등의 모든 서비스를 의미합니다.
            </S.ListItem>
            <S.ListItem>
              &#34;회원&#34;이란 본 약관에 동의하고 회사와 서비스 이용계약을
              체결한 자를 말합니다.
            </S.ListItem>
            <S.ListItem>
              &#34;게시물&#34;이란 회원이 서비스를 이용함에 있어 서비스에 게시한
              문자, 문서, 그림, 음성, 링크, 파일 등을 의미합니다.
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제3조 (약관의 게시와 개정)</S.Title>
          <S.Text>
            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 내에
            게시합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본
            약관을 개정할 수 있으며, 개정 시 적용일자 및 개정사유를 명시하여
            공지합니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제4조 (서비스의 제공)</S.Title>
          <S.Text>회사는 다음과 같은 서비스를 제공합니다.</S.Text>
          <S.List>
            <S.ListItem>생활 관련 매거진 정보 제공</S.ListItem>
            <S.ListItem>생활 정보 Q&A 커뮤니티 서비스</S.ListItem>
            <S.ListItem>생활 상식 퀴즈 서비스</S.ListItem>
            <S.ListItem>
              기타 회사가 추가 개발하거나 제공하는 일체의 서비스
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제5조 (회원가입)</S.Title>
          <S.Text>
            이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에
            동의함으로써 회원가입을 신청합니다. 회사는 이용자의 신청에 대하여
            승낙함을 원칙으로 하나, 다음 각 호의 경우 가입을 거부하거나 사후에
            이용계약을 해지할 수 있습니다.
          </S.Text>
          <S.List>
            <S.ListItem>허위 정보를 기재한 경우</S.ListItem>
            <S.ListItem>타인의 명의를 도용한 경우</S.ListItem>
            <S.ListItem>
              기타 회원으로 등록하는 것이 서비스 운영상 부적절하다고 판단되는
              경우
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제6조 (회원 탈퇴 및 자격 상실)</S.Title>
          <S.Text>
            회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원 탈퇴를
            처리합니다. 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 사전
            통지 후 회원자격을 제한 및 정지시킬 수 있습니다.
          </S.Text>
          <S.List>
            <S.ListItem>가입 신청 시 허위 내용을 등록한 경우</S.ListItem>
            <S.ListItem>
              다른 회원의 서비스 이용을 방해하거나 정보를 도용하는 경우
            </S.ListItem>
            <S.ListItem>
              법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제7조 (개인정보보호)</S.Title>
          <S.Text>
            회사는 회원의 개인정보를 보호하기 위하여 관련 법령에서 정하는 바를
            준수하며, 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의
            개인정보처리방침이 적용됩니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제8조 (회원의 의무)</S.Title>
          <S.Text>회원은 다음 각 호의 행위를 하여서는 안 됩니다.</S.Text>
          <S.List>
            <S.ListItem>허위 내용의 등록</S.ListItem>
            <S.ListItem>타인의 정보 도용</S.ListItem>
            <S.ListItem>회사가 게시한 정보의 무단 변경</S.ListItem>
            <S.ListItem>회사 및 제3자의 지적재산권 침해</S.ListItem>
            <S.ListItem>
              회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위
            </S.ListItem>
            <S.ListItem>
              외설적이거나 폭력적인 내용, 기타 공서양속에 반하는 정보를 게시하는
              행위
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제9조 (저작권의 귀속)</S.Title>
          <S.Text>
            서비스 내 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사에
            귀속됩니다. 여기에는 회사가 제작한 콘텐츠뿐만 아니라 회원이 서비스에
            게시한 게시물도 포함됩니다.
          </S.Text>
          <S.Text>
            회원은 게시물을 서비스에 게시하는 순간 해당 게시물에 대한 저작권을
            회사에 양도하는 것에 동의하며, 회사는 해당 게시물을 서비스 운영,
            개선, 홍보 등의 목적으로 자유롭게 사용할 수 있습니다.
          </S.Text>
          <S.Text>
            회원은 본인이 게시한 게시물에 대해 적법한 권리를 보유하고 있어야
            하며, 제3자의 저작권을 침해하지 않아야 합니다. 게시물로 인해
            발생하는 모든 법적 책임은 해당 게시물을 게시한 회원에게 있습니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제10조 (게시물의 관리)</S.Title>
          <S.Text>
            회사는 다음 각 호에 해당하는 게시물을 사전 통지 없이 삭제하거나 이동
            또는 등록을 거부할 수 있습니다.
          </S.Text>
          <S.List>
            <S.ListItem>
              다른 회원 또는 제3자를 비방하거나 명예를 손상시키는 내용
            </S.ListItem>
            <S.ListItem>공서양속에 위반되는 내용</S.ListItem>
            <S.ListItem>범죄적 행위에 결부된다고 인정되는 내용</S.ListItem>
            <S.ListItem>
              회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용
            </S.ListItem>
            <S.ListItem>
              서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 내용
            </S.ListItem>
          </S.List>
        </S.Section>
        <S.Section>
          <S.Title>제11조 (서비스의 중단)</S.Title>
          <S.Text>
            회사는 시스템 점검, 보수, 교체 등 부득이한 사유로 서비스 제공을
            일시적으로 중단할 수 있습니다. 이 경우 회사는 사전에 공지하며,
            부득이한 사유로 사전 공지가 불가능한 경우 사후에 공지합니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제12조 (면책조항)</S.Title>
          <S.Text>
            회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인
            사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
          </S.Text>
          <S.Text>
            회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을
            지지 않습니다.
          </S.Text>
          <S.Text>
            회사는 회원이 서비스를 통해 얻은 정보를 활용하여 발생한 손해에 대해
            책임을 지지 않습니다. 서비스는 정보 제공을 목적으로 하며, 실제
            거래나 의사결정 시 전문가의 조언을 받으실 것을 권장합니다.
          </S.Text>
        </S.Section>
        <S.Section>
          <S.Title>제13조 (준거법 및 관할법원)</S.Title>
          <S.Text>
            본 약관의 해석 및 회사와 회원 간의 분쟁에 대하여는 대한민국 법을
            적용합니다. 서비스 이용으로 발생한 분쟁에 대한 소송은 회사의 본사
            소재지를 관할하는 법원을 전속 관할로 합니다.
          </S.Text>
        </S.Section>
        <S.UpdateDate>시행일자: 2025년 10월 31일</S.UpdateDate>
      </S.Content>
    </S.Container>
  );
};

export default Terms;
