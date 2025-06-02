
import { toast } from "sonner";
import { usePhotoGalleryState } from './photo-gallery/usePhotoGalleryState';
import { usePhotoGalleryFetch } from './photo-gallery/usePhotoGalleryFetch';
import { usePhotoGallerySave } from './photo-gallery/usePhotoGallerySave';
import { validateAndProcessFiles } from './photo-gallery/fileValidation';

export { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, MAX_IMAGES } from './photo-gallery/constants';

export function usePhotoGallery() {
  const {
    uploadedImages,
    setUploadedImages,
    loading,
    setLoading,
    removeImage,
  } = usePhotoGalleryState();

  const { user } = usePhotoGalleryFetch(setUploadedImages);

  const { saveGallery } = usePhotoGallerySave(
    uploadedImages,
    setUploadedImages,
    setLoading,
    user?.id
  );

  // Add images with validation
  const addFiles = (files: File[]) => {
    const imagesToAdd = validateAndProcessFiles(files, uploadedImages.length);
    
    if (imagesToAdd.length > 0) {
      setUploadedImages(prev => [...prev, ...imagesToAdd]);
    }
  };

  return {
    uploadedImages,
    setUploadedImages,
    removeImage,
    addFiles,
    saveGallery,
    loading,
    user,
  };
}
