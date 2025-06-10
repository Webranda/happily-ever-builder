
import React from 'react';

interface PhotoGallerySectionProps {
  template: any;
  images: string[];
}

const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ template, images }) => {
  if (images.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-10 text-center" style={{ color: template.primaryColor }}>
          Our Photos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-soft">
              <img
                src={image}
                alt={`Wedding photo ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
