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
      
      try {
        const { data, error } = await supabase
          .from('wedding_sites')
          .select('images')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("Fetch Images Error:", error);
          toast.error("Failed to load existing images");
          return;
        }
        
        if (data && Array.isArray(data.images)) {
          setUploadedImages((data.images as string[]).map((url: string) => ({ 
            preview: url, 
            url 
          })));
        }
      } catch (err) {
        console.error("Unexpected error fetching images:", err);
        toast.error("Failed to load existing images");
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
    let hasError = false;
    
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        hasError = true;
        continue;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the maximum file size of 25MB`);
        hasError = true;
        continue;
      }
      
      if (uploadedImages.length + imagesToAdd.length >= MAX_IMAGES) {
        toast.error(`You can only upload up to ${MAX_IMAGES} images`);
        hasError = true;
        break;
      }
      
      const preview = URL.createObjectURL(file);
      imagesToAdd.push({ file, preview });
    }
    
    if (imagesToAdd.length > 0) {
      setUploadedImages(prev => [...prev, ...imagesToAdd]);
      if (!hasError) {
        toast.success(`${imagesToAdd.length} photo(s) ready to upload`);
      }
    }
  };

  // Upload/save gallery to Supabase
  const saveGallery = useCallback(async () => {
    if (!user?.id) {
      toast.error("You must be signed in to save images");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("No images to save");
      return;
    }

    setLoading(true);
    console.log("Starting saveGallery for user:", user.id);

    try {
      let imageUrls: string[] = [];
      
      // Process each image
      for (const img of uploadedImages) {
        if (img.url) {
          // Already uploaded image
          imageUrls.push(img.url);
        } else if (img.file) {
          // New image to upload
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          
          console.log("Uploading file:", fileName, "File size:", img.file.size, "File type:", img.file.type);
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('wedding-photos')
            .upload(fileName, img.file, { 
              upsert: false,
              contentType: img.file.type
            });
          
          if (uploadError) {
            console.error("Storage upload error:", uploadError);
            throw new Error(`Failed to upload ${img.file.name}: ${uploadError.message}`);
          }
          
          console.log("Upload successful:", uploadData);
          
          const { data: urlData } = supabase.storage
            .from('wedding-photos')
            .getPublicUrl(fileName);
          
          if (!urlData?.publicUrl) {
            throw new Error(`Failed to get public URL for ${img.file.name}`);
          }
          
          console.log("Got public URL:", urlData.publicUrl);
          imageUrls.push(urlData.publicUrl);
        }
      }

      console.log("All images processed, saving URLs:", imageUrls);

      // Check if user already has a wedding site
      const { data: existingRow, error: checkError } = await supabase
        .from('wedding_sites')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing wedding site:", checkError);
        throw new Error("Failed to check existing wedding site");
      }

      if (existingRow?.id) {
        // Update existing wedding site
        console.log("Updating existing wedding site:", existingRow.id);
        const { error: updateError } = await supabase
          .from('wedding_sites')
          .update({ images: imageUrls })
          .eq('user_id', user.id);

        if (updateError) {
          console.error("Update error:", updateError);
          throw new Error(`Failed to update gallery: ${updateError.message}`);
        }
      } else {
        // Create new wedding site with required defaults
        console.log("Creating new wedding site");
        const { error: insertError } = await supabase
          .from('wedding_sites')
          .insert({
            user_id: user.id,
            images: imageUrls,
            partner1_name: "Partner 1",
            partner2_name: "Partner 2", 
            event_date: "TBD",
            venue_name: "TBD"
          });

        if (insertError) {
          console.error("Insert error:", insertError);
          throw new Error(`Failed to create wedding site: ${insertError.message}`);
        }
      }

      console.log("Gallery saved successfully");
      
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
