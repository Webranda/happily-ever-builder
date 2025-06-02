
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { UploadedImage } from './types';

export function usePhotoGalleryFetch(setUploadedImages: (images: UploadedImage[]) => void) {
  const { user } = useAuth();

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
  }, [user, setUploadedImages]);

  return { user };
}
