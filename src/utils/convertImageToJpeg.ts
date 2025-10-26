import { heicTo } from 'heic-to/csp';
import imageCompression from 'browser-image-compression';

const convertImageToJpeg = async (file: File): Promise<File> => {
  let processFile = file;

  if (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.match(/\.(heic|heif)$/i)
  ) {
    try {
      const convertedBlob = await heicTo({
        blob: file,
        type: 'image/jpeg',
        quality: 0.9,
      });

      processFile = new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' },
      );
    } catch {
      throw new Error('HEIC 이미지 변환에 실패했습니다.');
    }
  }

  if (processFile.size < 500 * 1024) {
    return processFile;
  }

  try {
    const options = {
      maxSizeMB: processFile.size > 1024 * 1024 ? 0.5 : 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: processFile.size > 1024 * 1024 ? 0.7 : 0.9,
    };

    const compressedFile = await imageCompression(processFile, options);

    const finalFile = new File(
      [compressedFile],
      processFile.name.replace(/\.[^/.]+$/, '.jpg'),
      {
        type: 'image/jpeg',
        lastModified: Date.now(),
      },
    );

    return finalFile;
  } catch {
    return processFile;
  }
};

export default convertImageToJpeg;
