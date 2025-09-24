import styled from '@emotion/styled';

export const Container = styled.section``;

export const Title = styled.div`
  padding: 0 20px;
  margin-bottom: 16px;
  font-family: Paperozi;
  font-weight: 600;
  font-size: 18px;
`;

export const ScrollContainer = styled.div`
  padding-left: 20px;
  margin-bottom: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CardList = styled.div`
  display: flex;
  gap: 12px;

  &::after {
    content: '';
    width: 8px;
    flex-shrink: 0;
  }
`;
