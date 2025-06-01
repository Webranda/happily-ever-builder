
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { MAX_IMAGES } from '@/hooks/usePhotoGallery';

interface PhotoUploaderProps {
  onAddFiles: (files: File[]) => void;
  disabled: boolean;
  currentImageCount: number;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onAddFiles, disabled, currentImageCount }) => {
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
    if (!disabled) {
      setDragging(true);
    }
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const remainingSlots = MAX_IMAGES - currentImageCount;

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        disabled 
          ? 'border-gray-200 bg-gray-50' 
          : dragging 
            ? 'border-wedding-gold bg-wedding-cream/20' 
            : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <Upload className={`h-12 w-12 mb-4 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
        <h3 className={`text-lg font-medium mb-2 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {disabled ? 'Maximum images reached' : 'Drag and drop your photos here'}
        </h3>
        <p className={`mb-4 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
          {disabled ? `You have reached the limit of ${MAX_IMAGES} images` : 'or click the button below to browse files'}
        </p>
        <p className={`text-sm mb-6 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
          {disabled 
            ? 'Remove some images to add more' 
            : `Maximum file size: 25MB. ${remainingSlots} slot${remainingSlots !== 1 ? 's' : ''} remaining.`
          }
        </p>
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
          className="bg-wedding-navy hover:bg-wedding-navy/90 text-white disabled:bg-gray-300 disabled:hover:bg-gray-300"
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
