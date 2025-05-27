
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { MAX_IMAGES } from '@/hooks/usePhotoGallery';

interface PhotoUploaderProps {
  onAddFiles: (files: File[]) => void;
  disabled: boolean;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onAddFiles, disabled }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onAddFiles(Array.from(files));
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
      onAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragging ? 'border-wedding-gold bg-wedding-cream/20' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-disabled={disabled}
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
          ref={inputRef}
          disabled={disabled}
        />
        <Button
          type="button"
          className="bg-wedding-navy hover:bg-wedding-navy/90 text-white"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
        >
          <Upload className="mr-2 h-4 w-4" />
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploader;
