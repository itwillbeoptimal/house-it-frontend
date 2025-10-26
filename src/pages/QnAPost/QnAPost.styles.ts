import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const Required = styled.span`
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.LABEL.ALERT};
  margin-left: 4px;
`;

export const CharacterCount = styled.span<{ isOverLimit: boolean }>`
  font-size: 12px;
  color: ${(props) =>
    props.isOverLimit
      ? props.theme.COLORS.LABEL.ALERT
      : props.theme.COLORS.LABEL.TERTIARY};
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 240px;
  padding: 12px;
  background-color: white;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? props.theme.COLORS.LABEL.ALERT
        : props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError
        ? props.theme.COLORS.LABEL.ALERT
        : props.theme.COLORS.MAIN.PRIMARY};
    background-color: white;
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const ImageUploadWrapper = styled.div`
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled.div`
  width: 72px;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.ALERT};
  margin: -4px 0 0 2px;
`;
