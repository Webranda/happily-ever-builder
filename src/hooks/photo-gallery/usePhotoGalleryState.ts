
import { useState } from 'react';
import { UploadedImage } from './types';

export function usePhotoGalleryState() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  return {
    uploadedImages,
    setUploadedImages,
    loading,
    setLoading,
  };
}
