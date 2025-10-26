import React from 'react';
import * as S from '@/pages/My/components/Toggle/Toggle.styles'

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <S.Container>
      <S.ToggleInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <S.ToggleSlider />
    </S.Container>
  );
};

export default Toggle;
