import styled from '@emotion/styled';

export const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  gap: 8px;

  & > * {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const CheckButton = styled.button<{
  selected: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: ${(props) =>
    props.selected ? props.theme.COLORS.MAIN.PRIMARY : 'transparent'};
  border: ${(props) =>
    props.selected ? 'none' : `1px solid ${props.theme.COLORS.GRAY[4]}`};
  border-radius: 4px;
`;

export const Label = styled.label<{ disabled: boolean }>`
  font-size: 14px;
  user-select: none;
`;
