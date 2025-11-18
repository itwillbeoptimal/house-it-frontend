import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  overflow-y: auto;
`;

export const Content = styled.div`
  line-height: 1.6;
`;

export const Section = styled.section`
  margin-bottom: 32px;

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
`;

export const Text = styled.p`
  margin-bottom: 8px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  font-size: 14px;
`;

export const List = styled.ul`
  margin-top: 8px;
  padding-left: 20px;
`;

export const ListItem = styled.li`
  margin-bottom: 6px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  font-size: 14px;
  list-style-type: disc;
`;

export const SubList = styled.ul`
  margin-top: 6px;
  padding-left: 20px;
`;

export const UpdateDate = styled.p`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 13px;
  text-align: center;
`;
