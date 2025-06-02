
import { usePhotoGalleryState } from './photo-gallery/usePhotoGalleryState';
import { usePhotoGalleryFetch } from './photo-gallery/usePhotoGalleryFetch';
import { usePhotoGallerySave } from './photo-gallery/usePhotoGallerySave';
import { usePhotoGalleryFiles } from './photo-gallery/usePhotoGalleryFiles';

export { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, MAX_IMAGES } from './photo-gallery/constants';

export function usePhotoGallery() {
  const {
    uploadedImages,
    setUploadedImages,
    loading,
    setLoading,
  } = usePhotoGalleryState();

  const { user } = usePhotoGalleryFetch(setUploadedImages);

  const { saveGallery } = usePhotoGallerySave(
    uploadedImages,
    setUploadedImages,
    setLoading,
    user?.id
  );

  const { addFiles, removeImage } = usePhotoGalleryFiles(
    uploadedImages,
    setUploadedImages
  );

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
