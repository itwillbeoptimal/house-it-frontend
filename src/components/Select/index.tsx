import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';

const Container = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 40px 12px 12px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    background-color: white;
  }
`;

const DropdownIcon = styled.div<{ disabled?: boolean; error?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 8px;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  ...rest
}) => {
  return (
    <Container>
      <StyledSelect {...rest}>{children}</StyledSelect>
      <DropdownIcon>
        <ArrowDownIcon
          fill={theme.COLORS.LABEL.SECONDARY}
          width={12}
          height={12}
        />
      </DropdownIcon>
    </Container>
  );
};

export default Select;
