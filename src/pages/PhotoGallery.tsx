
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload, Image, X } from 'lucide-react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const PhotoGallery = () => {
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    processFiles(Array.from(files));
    
    // Reset the input value to allow uploading the same file again
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
    for (const file of files) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        continue;
      }
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the maximum file size of 25MB`);
        continue;
      }
      
      // Create preview and add to state
      const preview = URL.createObjectURL(file);
      setUploadedImages(prev => [...prev, { file, preview }]);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Free memory
      newImages.splice(index, 1);
      return newImages;
    });
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
                <p className="text-sm text-gray-400 mb-6">Maximum file size: 25MB</p>
                
                <input 
                  type="file" 
                  id="photo-upload" 
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <Button 
                  type="button"
                  className="bg-wedding-navy hover:bg-wedding-navy/90"
                  onClick={() => document.getElementById('photo-upload')?.click()}
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
                    <p className="mt-1 text-sm text-gray-500 truncate">{image.file.name}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button className="bg-wedding-gold hover:bg-wedding-gold/90 text-white">
                  Save Gallery
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
