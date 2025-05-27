
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
export const MAX_IMAGES = 7;

type UploadedImage = { file?: File; preview: string; url?: string };

export function usePhotoGallery() {
  const { user } = useAuth();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch gallery images from Supabase
  useEffect(() => {
    async function fetchImages() {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('wedding_sites')
        .select('images')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        toast.error(error.message || "Failed to load images");
        return;
      }
      if (data && Array.isArray(data.images)) {
        setUploadedImages((data.images as string[]).map((url: string) => ({ preview: url, url })));
      }
    }
    fetchImages();
  }, [user]);

  // Remove image from local state
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

  // Add images with validation
  const addFiles = (files: File[]) => {
    let imagesToAdd: { file: File; preview: string }[] = [];
    let error = false;
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        error = true;
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the maximum file size of 25MB`);
        error = true;
        continue;
      }
      if (uploadedImages.length + imagesToAdd.length >= MAX_IMAGES) {
        toast.error(`You can only upload up to ${MAX_IMAGES} images`);
        error = true;
        break;
      }
      const preview = URL.createObjectURL(file);
      imagesToAdd.push({ file, preview });
    }
    if (imagesToAdd.length > 0) {
      setUploadedImages(prev => [...prev, ...imagesToAdd]);
    }
    if (!error && imagesToAdd.length > 0) {
      toast.success(`${imagesToAdd.length} photo(s) ready to upload`);
    }
  };

  // Upload/save gallery to Supabase
  const saveGallery = useCallback(async () => {
    if (!user?.id) {
      toast.error("You must be signed in.");
      return;
    }
    setLoading(true);
    try {
      let imageUrls: string[] = [];
      for (const img of uploadedImages) {
        if (img.url) {
          imageUrls.push(img.url);
        } else if (img.file) {
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const { error: uploadError } = await supabase
            .storage
            .from('wedding-photos')
            .upload(fileName, img.file, { upsert: false });
          if (uploadError) throw uploadError;
          const { data: urlData } = supabase
            .storage
            .from('wedding-photos')
            .getPublicUrl(fileName);
          if (!urlData?.publicUrl) throw new Error("Failed to get image URL");
          imageUrls.push(urlData.publicUrl);
        }
      }

      const { data: existingRow, error: checkError } = await supabase
        .from('wedding_sites')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        toast.error(checkError.message || "Failed to check user wedding site.");
        setLoading(false);
        return;
      }

      let error: any;
      if (existingRow) {
        ({ error } = await supabase
          .from('wedding_sites')
          .update({ images: imageUrls })
          .eq('user_id', user.id)
          .select());
      } else {
        const requiredDefaults = {
          partner1_name: "Partner 1",
          partner2_name: "Partner 2",
          event_date: "TBD",
          venue_name: "TBD"
        };
        ({ error } = await supabase
          .from('wedding_sites')
          .insert({
            user_id: user.id,
            images: imageUrls,
            ...requiredDefaults
          })
          .select());
      }
      if (error) throw error;
      toast.success("Gallery saved and images uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save gallery.");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImages, user]);

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
