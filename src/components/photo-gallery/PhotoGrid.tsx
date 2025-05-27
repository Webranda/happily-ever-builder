
import React from 'react';
import { X } from 'lucide-react';

interface PhotoGridProps {
  images: { file?: File; preview: string; url?: string }[];
  onRemove: (index: number) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ images, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
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
            onClick={() => onRemove(index)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="mt-1 text-sm text-gray-500 truncate">{image.file ? image.file.name : 'Photo'}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
