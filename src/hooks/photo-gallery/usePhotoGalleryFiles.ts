
import { validateAndProcessFiles } from './fileValidation';
import { UploadedImage } from './types';

export function usePhotoGalleryFiles(
  uploadedImages: UploadedImage[],
  setUploadedImages: (updater: (prev: UploadedImage[]) => UploadedImage[]) => void
) {
  // Add images with validation
  const addFiles = (files: File[]) => {
    const imagesToAdd = validateAndProcessFiles(files, uploadedImages.length);
    
    if (imagesToAdd.length > 0) {
      setUploadedImages(prev => [...prev, ...imagesToAdd]);
    }
  };

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
    addFiles,
    removeImage,
  };
}
