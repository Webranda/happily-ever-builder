
import { toast } from "sonner";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, MAX_IMAGES } from './constants';

export function validateAndProcessFiles(
  files: File[], 
  currentImageCount: number
): { file: File; preview: string }[] {
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
    
    if (currentImageCount + imagesToAdd.length >= MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images`);
      hasError = true;
      break;
    }
    
    const preview = URL.createObjectURL(file);
    imagesToAdd.push({ file, preview });
  }
  
  if (imagesToAdd.length > 0 && !hasError) {
    toast.success(`${imagesToAdd.length} photo(s) ready to upload`);
  }
  
  return imagesToAdd;
}
