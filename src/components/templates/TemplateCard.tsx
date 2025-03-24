
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  description,
  image,
  isSelected,
  onSelect,
}) => {
  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden transition-all duration-300 border-2",
        isSelected 
          ? "border-wedding-gold shadow-medium" 
          : "border-transparent hover:border-wedding-taupe/50 shadow-soft hover:shadow-medium"
      )}
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={image} 
          alt={`${name} template preview`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {isSelected && (
          <div className="absolute top-3 right-3 bg-wedding-gold text-white px-3 py-1 rounded-full text-sm font-medium">
            Selected
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-serif text-xl mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            className="text-sm px-3 py-1 h-auto border-wedding-navy/50 text-wedding-navy hover:bg-wedding-navy/5"
            onClick={() => window.open(`#preview-${id}`, '_blank')}
          >
            Preview
          </Button>
          
          <Button
            variant={isSelected ? "ghost" : "default"}
            className={cn(
              "text-sm px-4 py-1 h-auto",
              isSelected 
                ? "border border-wedding-gold/50 text-wedding-gold hover:bg-wedding-gold/5" 
                : "bg-wedding-navy hover:bg-wedding-navy/90 text-white"
            )}
            onClick={() => onSelect(id)}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
