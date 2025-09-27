import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3/4;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

export const IconImage = styled.img`
  width: 70%;
  margin-bottom: 12px;
`;

export const CategoryTitle = styled.div`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  padding: 0 8px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.theme.COLORS.GRAY[1]};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background: linear-gradient(90deg, #ffd4b3 0%, #eea491 100%);
  border-radius: 4px;
`;

export const ProgressText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 11px;
  line-height: 1;
  text-align: right;
`;
