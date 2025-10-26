import styled from '@emotion/styled';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
  text-align: left;
`;

export const Title = styled.div`
  flex: 1;
  font-size: 15px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
`;
