import React, { useId } from 'react';
import * as S from '@/components/Checkbox/Checkbox.styles';
import CheckIcon from '@/assets/icons/check.svg?react';

interface CheckboxProps {
  selected: boolean;
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  selected,
  label,
  disabled = false,
  onClick,
}) => {
  const id = useId();

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <S.Container disabled={disabled} onClick={handleClick}>
      <S.CheckButton
        id={id}
        role="checkbox"
        selected={selected}
        disabled={disabled}
      >
        {selected && <CheckIcon />}
      </S.CheckButton>
      {label && <S.Label disabled={disabled}>{label}</S.Label>}
    </S.Container>
  );
};

export default Checkbox;
