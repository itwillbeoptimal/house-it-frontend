import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const UploadArea = styled.div<{
  isDragOver: boolean;
  disabled?: boolean;
}>`
  background-color: ${(props) =>
    props.isDragOver
      ? props.theme.COLORS.MAIN.TERTIARY
      : props.theme.COLORS.GRAY[1]};
  border: 1px solid
    ${(props) =>
      props.isDragOver
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
  text-align: center;
  padding: 48px;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  & svg {
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }

  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      background-color: ${props.theme.COLORS.MAIN.TERTIARY};
      border-color: ${props.theme.COLORS.MAIN.PRIMARY};

      & svg {
        fill: ${props.theme.COLORS.MAIN.PRIMARY};
      }

      & div {
        color: ${props.theme.COLORS.MAIN.PRIMARY};
      }
    }

    ${
      props.isDragOver &&
      `
      & svg {
        fill: ${props.theme.COLORS.MAIN.PRIMARY};
      }

      & div {
        color: ${props.theme.COLORS.MAIN.PRIMARY};
      }
    `
    }
  `}
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 16px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageRemoveButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  & svg {
    fill: white;
    width: 8px;
    height: 8px;
  }
`;
