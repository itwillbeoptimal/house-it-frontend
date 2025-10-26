import React, { useState, useRef, useCallback } from 'react';
import type FileWithId from '@/types/FileWithId';
import useModal from '@/hooks/useModal';
import convertImageToJpeg from '@/utils/convertImageToJpeg';
import * as S from '@/pages/QnAPost/components/ImageUpload/ImageUpload.styles';
import ImageIcon from '@/assets/icons/image.svg?react';
import DeleteIcon from '@/assets/icons/cross.svg?react';

interface ImageUploadProps {
  images: FileWithId[];
  onImagesChange: (images: FileWithId[]) => void;
  accept?: string;
  width?: number;
  height?: number;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images = [],
  onImagesChange,
  accept = 'image/*',
  width,
  height,
  maxImages = 3,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { alert } = useModal();

  const remainingSlots = maxImages - images.length;
  const isDisabled = remainingSlots <= 0;

  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/bmp',
    'image/heic',
    'image/heif',
  ];

  const processImageFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      const filesToAdd = imageFiles.slice(0, remainingSlots);

      const processedFilesWithId: FileWithId[] = [];

      const processPromises = filesToAdd.map(async (file) => {
        if (
          !supportedTypes.includes(file.type.toLowerCase()) &&
          !file.name.match(/\.(heic|heif)$/i)
        ) {
          return null;
        }

        try {
          const processedFile = await convertImageToJpeg(file);

          return {
            id: crypto.randomUUID(),
            file: processedFile,
            preview: URL.createObjectURL(processedFile),
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(processPromises);

      results.forEach((result) => {
        if (result !== null) {
          processedFilesWithId.push(result);
        }
      });

      if (processedFilesWithId.length < filesToAdd.length) {
        alert({
          title: '지원하지 않는 파일 형식',
          content: '일부 이미지를 처리할 수 없습니다.',
        });
      }

      if (processedFilesWithId.length > 0) {
        onImagesChange([...images, ...processedFilesWithId]);
      }
    },
    [onImagesChange, images, remainingSlots, alert],
  );

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      await processImageFiles(selectedFiles);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processImageFiles],
  );

  const handleRemoveImage = useCallback(
    (fileId: string | number) => {
      const newImages = images.filter((fileWithId) => fileWithId.id !== fileId);
      onImagesChange(newImages);
    },
    [images, onImagesChange],
  );

  const handleUploadAreaClick = useCallback(() => {
    if (!isDisabled) {
      fileInputRef.current?.click();
    }
  }, [isDisabled]);

  const handleDragOver = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!isDisabled) {
        setIsDragOver(true);
      }
    },
    [isDisabled],
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      if (isDisabled) return;

      const droppedFiles = Array.from(event.dataTransfer.files);
      await processImageFiles(droppedFiles);
    },
    [processImageFiles, isDisabled],
  );

  const getUploadText = () => {
    if (isDragOver) return '파일을 놓으세요';
    if (isDisabled) return `최대 ${maxImages}개까지만 업로드 가능합니다`;
    return '여기로 사진을 드래그하거나 클릭';
  };

  return (
    <S.Container style={{ width, height }}>
      <S.UploadArea
        isDragOver={isDragOver}
        disabled={isDisabled}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ImageIcon />
        <S.UploadText>{getUploadText()}</S.UploadText>
      </S.UploadArea>
      <S.FileInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        disabled={isDisabled}
      />
      {images.length > 0 && (
        <S.ImagePreviewGrid>
          {images.map((imageWithId) => {
            const previewUrl =
              imageWithId.preview || URL.createObjectURL(imageWithId.file);

            return (
              <S.ImagePreviewItem key={imageWithId.id}>
                <S.PreviewImage src={previewUrl} alt="이미지" />
                <S.ImageRemoveButton
                  onClick={() => handleRemoveImage(imageWithId.id)}
                >
                  <DeleteIcon />
                </S.ImageRemoveButton>
              </S.ImagePreviewItem>
            );
          })}
        </S.ImagePreviewGrid>
      )}
    </S.Container>
  );
};

export default ImageUpload;
