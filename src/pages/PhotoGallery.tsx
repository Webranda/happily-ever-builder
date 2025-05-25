import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload, Image, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const MAX_IMAGES = 7;

const PhotoGallery = () => {
  const { user } = useAuth();
  const [uploadedImages, setUploadedImages] = useState<{ file?: File; preview: string; url?: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load any previously saved images for this user from Supabase
  useEffect(() => {
    async function fetchImages() {
      if (!user?.id) return;
      // We stored image paths in wedding_sites table (images column)
      const { data } = await supabase
        .from('wedding_sites')
        .select('images')
        .eq('user_id', user.id)
        .maybeSingle();
      if (data && data.images && Array.isArray(data.images)) {
        // Map { url } to uploadedImages state format
        setUploadedImages(data.images.map((url: string) => ({ preview: url, url })));
      }
    }
    fetchImages();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    let imagesToAdd: { file: File; preview: string }[] = [];
    let error = false;
    for (const file of files) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        error = true;
        continue;
      }
      // Validate file size
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

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      if (newImages[index]?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(newImages[index].preview); // Free memory
      }
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSaveGallery = async () => {
    if (!user?.id) {
      toast.error("You must be signed in.");
      return;
    }
    setLoading(true);
    try {
      // Upload new files to Supabase, leave already-uploaded images (url) unchanged
      let imageUrls: string[] = [];
      for (const img of uploadedImages) {
        if (img.url) {
          // Already uploaded
          imageUrls.push(img.url);
        } else if (img.file) {
          // Upload file
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const { error: uploadError } = await supabase
            .storage
            .from('wedding-photos')
            .upload(fileName, img.file, { upsert: false });
          if (uploadError) throw uploadError;

          // Get public URL
          const { data: urlData } = supabase
            .storage
            .from('wedding-photos')
            .getPublicUrl(fileName);
          if (!urlData?.publicUrl) throw new Error("Failed to get image URL");
          imageUrls.push(urlData.publicUrl);
        }
      }
      // Save image URL array in DB
      let { error } = await supabase
        .from('wedding_sites')
        .update({ images: imageUrls })
        .eq('user_id', user.id);
      if (error) throw error;
      toast.success("Gallery saved and images uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save gallery.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <Logo size="md" />
          </Link>

          <Button
            variant="ghost"
            className="text-gray-600 hover:text-wedding-navy"
            asChild
          >
            <Link to="/dashboard">
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 md:py-16">
        <Container maxWidth="xl">
          <div className="mb-10">
            <Button
              variant="ghost"
              className="mb-4 text-gray-600 hover:text-wedding-navy"
              asChild
            >
              <Link to="/dashboard">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Photo Gallery</h1>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Upload and manage photos for your wedding website gallery
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragging ? 'border-wedding-gold bg-wedding-cream/20' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Drag and drop your photos here</h3>
                <p className="text-gray-500 mb-4">or click the button below to browse files</p>
                <p className="text-sm text-gray-400 mb-6">Maximum file size: 25MB. Maximum of {MAX_IMAGES} images.</p>

                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploadedImages.length >= MAX_IMAGES}
                />

                <Button
                  type="button"
                  className="bg-wedding-navy hover:bg-wedding-navy/90"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  disabled={uploadedImages.length >= MAX_IMAGES}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl mb-4">Uploaded Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={image.preview}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-1 text-sm text-gray-500 truncate">{image.file ? image.file.name : 'Photo'}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button
                  className="bg-wedding-gold hover:bg-wedding-gold/90 text-white"
                  onClick={handleSaveGallery}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Save Gallery"}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-12 border-t border-gray-100">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default PhotoGallery;
