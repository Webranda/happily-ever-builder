
import { useState } from 'react';
import { UploadedImage } from './types';

export function usePhotoGalleryState() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      if (newImages[index]?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return {
    uploadedImages,
    setUploadedImages,
    loading,
    setLoading,
    removeImage,
  };
}
