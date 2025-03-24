
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from './TemplateCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Sample template data
const templates = [
  {
    id: 'elegant',
    name: 'Elegant Affair',
    description: 'A sophisticated design with elegant typography and subtle animations. Perfect for formal weddings.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2340&auto=format&fit=crop',
  },
  {
    id: 'rustic',
    name: 'Rustic Charm',
    description: 'Warm earth tones and textures create a cozy, inviting aesthetic for countryside or barn weddings.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2370&auto=format&fit=crop',
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines and a minimalist approach create a contemporary feel for the modern couple.',
    image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2370&auto=format&fit=crop',
  },
  {
    id: 'romantic',
    name: 'Romantic Blush',
    description: 'Soft colors and dreamy design elements create a romantic atmosphere for your special day.',
    image: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?q=80&w=2274&auto=format&fit=crop',
  },
  {
    id: 'botanical',
    name: 'Botanical Garden',
    description: 'Lush greenery and floral elements bring natural beauty to your wedding website.',
    image: 'https://images.unsplash.com/photo-1509842732562-9da9a8be1efd?q=80&w=2574&auto=format&fit=crop',
  },
  {
    id: 'beach',
    name: 'Coastal Breeze',
    description: 'Sand, sea, and sky inspire this airy design perfect for beach or destination weddings.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2530&auto=format&fit=crop',
  },
];

const TemplateSelector: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template to continue');
      return;
    }
    
    // In a real application, you would save the selected template to state or backend
    console.log('Selected template:', selectedTemplate);
    toast.success('Template selected successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-3xl mb-3">Choose Your Perfect Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a beautiful template for your wedding website. You can preview each one before making your selection.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            name={template.name}
            description={template.description}
            image={template.image}
            isSelected={selectedTemplate === template.id}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button
          onClick={handleContinue}
          className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-8 py-6 h-auto text-lg btn-hover-effect"
          disabled={!selectedTemplate}
        >
          Continue with Selected Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
