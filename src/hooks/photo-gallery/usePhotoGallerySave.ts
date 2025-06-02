
import { useCallback } from 'react';
import { toast } from "sonner";
import { UploadedImage } from './types';
import { processUploadedImages, saveImagesToDatabase } from './supabaseOperations';

export function usePhotoGallerySave(
  uploadedImages: UploadedImage[],
  setUploadedImages: (updater: (prev: UploadedImage[]) => UploadedImage[]) => void,
  setLoading: (loading: boolean) => void,
  userId: string | undefined
) {
  const saveGallery = useCallback(async () => {
    if (!userId) {
      toast.error("You must be signed in to save images");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("No images to save");
      return;
    }

    setLoading(true);
    console.log("Starting saveGallery for user:", userId);

    try {
      const imageUrls = await processUploadedImages(uploadedImages, userId);
      await saveImagesToDatabase(imageUrls, userId);
      
      // Update local state to reflect saved images
      setUploadedImages(prev => prev.map(img => ({
        ...img,
        url: img.url || imageUrls[uploadedImages.findIndex(i => i === img)]
      })));
      
      toast.success("Gallery saved successfully!");
      
    } catch (err: any) {
      console.error("saveGallery error:", err);
      toast.error(err.message || "Failed to save gallery");
    } finally {
      setLoading(false);
    }
  }, [uploadedImages, userId, setLoading, setUploadedImages]);

  return { saveGallery };
}
