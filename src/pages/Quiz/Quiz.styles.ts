import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 12px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ArchiveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 500;

  & svg {
    fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
  gap: 16px;
  width: 100%;
`;
