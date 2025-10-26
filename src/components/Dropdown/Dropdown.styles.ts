import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 88px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  z-index: 10;
`;

export const Item = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: center;
  font-size: 14px;

  &:hover {
    background: ${(props) => props.theme.COLORS.GRAY[1]};
  }

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;
