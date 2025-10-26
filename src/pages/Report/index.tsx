import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import { reportQuestion, reportAnswer } from '@/apis/qna';
import * as S from '@/pages/Report/Report.styles';
import Select from '@/components/Select';
import Button from '@/components/Button';
import RequiredIcon from '@/assets/icons/required.svg?react';

interface ReportProps {
  type: 'question' | 'answer';
}

const REPORT_REASONS = {
  1: '스팸 또는 광고',
  2: '부적절한 내용',
  3: '유해하거나 위험한 내용',
  4: '저작권 침해',
  5: '개인정보 노출',
  6: '기타',
};

const CONTENT_MAX_LENGTH = 500;

const Report: React.FC<ReportProps> = ({ type }) => {
  const navigate = useNavigate();
  const { alert } = useModal();
  const { questionId, answerId } = useParams<{
    questionId?: string;
    answerId?: string;
  }>();

  const [reasonType, setReasonType] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [errors, setErrors] = useState<{
    reasonType?: string;
    content?: string;
  }>({});

  useSubpageHeader({
    title: '게시물 신고',
  });

  const validateForm = () => {
    const newErrors: { reasonType?: string; content?: string } = {};

    if (!reasonType) {
      newErrors.reasonType = '신고 사유를 선택해 주세요.';
    }

    if (!content.trim()) {
      newErrors.content = '신고 내용을 입력해 주세요.';
    } else if (content.length > CONTENT_MAX_LENGTH) {
      newErrors.content = `신고 내용은 ${CONTENT_MAX_LENGTH}자를 초과할 수 없습니다.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (type === 'question' && questionId) {
        await reportQuestion(parseInt(questionId, 10), {
          questionReportReason: reasonType,
          questionReportContent: content,
        });
      } else if (type === 'answer' && answerId) {
        await reportAnswer(parseInt(answerId, 10), {
          responseReportReason: reasonType,
          responseReportContent: content,
        });
      }

      alert({
        title: '신고 완료',
        content: '신고가 정상적으로 접수되었습니다.',
        onConfirm: () => {
          navigate(-1);
        },
      });
    } catch {
      alert({
        title: '오류',
        content: '신고 접수 중 오류가 발생했습니다.',
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const contentLength = content.length;
  const isSubmitDisabled = !reasonType || !content.trim();

  return (
    <S.Container>
      <S.FormContainer>
        <S.FormSection>
          <S.LabelContainer>
            <S.Label>
              신고 사유
              <S.Required>
                <RequiredIcon />
              </S.Required>
            </S.Label>
          </S.LabelContainer>
          <Select
            value={reasonType}
            onChange={(e) => {
              setReasonType(parseInt(e.target.value, 10));
              setErrors((prev) => ({ ...prev, reasonType: undefined }));
            }}
          >
            <option value="0">신고 사유를 선택하세요</option>
            {Object.entries(REPORT_REASONS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {errors.reasonType && (
            <S.ErrorMessage>{errors.reasonType}</S.ErrorMessage>
          )}
        </S.FormSection>

        <S.FormSection>
          <S.LabelContainer>
            <S.Label>
              신고 내용
              <S.Required>
                <RequiredIcon />
              </S.Required>
            </S.Label>
            <S.CharacterCount isOverLimit={contentLength > CONTENT_MAX_LENGTH}>
              {contentLength}/{CONTENT_MAX_LENGTH}
            </S.CharacterCount>
          </S.LabelContainer>
          <S.TextArea
            placeholder="신고 사유에 대해 자세히 설명해 주세요."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrors((prev) => ({ ...prev, content: undefined }));
            }}
            maxLength={CONTENT_MAX_LENGTH + 10}
            hasError={!!errors.content}
          />
          {errors.content && <S.ErrorMessage>{errors.content}</S.ErrorMessage>}
        </S.FormSection>

        <S.ButtonsWrapper>
          <S.ButtonWrapper>
            <Button variant="secondary" fullWidth onClick={handleCancel}>
              취소
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button
              variant="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              신고
            </Button>
          </S.ButtonWrapper>
        </S.ButtonsWrapper>
      </S.FormContainer>
    </S.Container>
  );
};

export default Report;
