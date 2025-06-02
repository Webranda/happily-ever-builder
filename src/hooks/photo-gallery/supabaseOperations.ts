
import { supabase } from "@/integrations/supabase/client";
import { UploadedImage } from './types';

export async function uploadImageToStorage(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  
  console.log("Uploading file:", fileName, "File size:", file.size, "File type:", file.type);
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('wedding-photos')
    .upload(fileName, file, { 
      upsert: false,
      contentType: file.type
    });
  
  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
  }
  
  console.log("Upload successful:", uploadData);
  
  const { data: urlData } = supabase.storage
    .from('wedding-photos')
    .getPublicUrl(fileName);
  
  if (!urlData?.publicUrl) {
    throw new Error(`Failed to get public URL for ${file.name}`);
  }
  
  console.log("Got public URL:", urlData.publicUrl);
  return urlData.publicUrl;
}

export async function saveImagesToDatabase(imageUrls: string[], userId: string): Promise<void> {
  console.log("All images processed, saving URLs:", imageUrls);

  // Check if user already has a wedding site
  const { data: existingRow, error: checkError } = await supabase
    .from('wedding_sites')
    .select('id')
    .eq('user_id', userId)
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
      .eq('user_id', userId);

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
        user_id: userId,
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
}

export async function processUploadedImages(uploadedImages: UploadedImage[], userId: string): Promise<string[]> {
  let imageUrls: string[] = [];
  
  // Process each image
  for (const img of uploadedImages) {
    if (img.url) {
      // Already uploaded image
      imageUrls.push(img.url);
    } else if (img.file) {
      // New image to upload
      const publicUrl = await uploadImageToStorage(img.file, userId);
      imageUrls.push(publicUrl);
    }
  }
  
  return imageUrls;
}
