import React from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input<{ hasToggle?: boolean; hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: white;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? props.theme.COLORS.LABEL.ALERT
        : props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError
        ? props.theme.COLORS.LABEL.ALERT
        : props.theme.COLORS.MAIN.PRIMARY};
    background-color: white;
  }

  &:disabled {
    background-color: ${(props) => props.theme.COLORS.GRAY[2]};
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({ hasError, ...rest }) => {
  return <StyledInput hasError={hasError} {...rest} />;
};

export default Input;
