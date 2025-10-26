import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
  min-height: 100%;
`;

export const SectionHeader = styled.div<{ hasTopPadding?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 16px 4px;

  ${(props) =>
    props.hasTopPadding &&
    `
    padding-top: 16px;
  `}
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const AutocompleteWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: calc(80px + env(safe-area-inset-bottom));
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  z-index: 10;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const AutocompleteList = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  padding: 0;
  margin: 0;
`;

export const AutocompleteItem = styled.li`
  padding: 16px 20px;
  font-size: 15px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  }
`;

export const HighlightText = styled.span`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 600;
`;

export const SearchKeyword = styled.span`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 600;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  font-size: 14px;
`;

export const ViewMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 500;

  & svg {
    fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyMessage = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  font-size: 16px;
  text-align: center;
`;

export const ObserverTrigger = styled.div`
  height: 20px;
  visibility: hidden;
`;
