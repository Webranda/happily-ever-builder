
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';

interface PreviewHeaderProps {
  templateName: string;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ templateName }) => {
  const navigate = useNavigate();

  const closePreview = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white py-3 px-6 flex justify-between items-center">
      <Button
        variant="ghost"
        className="text-white hover:bg-black/20"
        onClick={closePreview}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Back to Templates</span>
      </Button>
      <div className="text-sm md:text-base font-medium">Preview: {templateName}</div>
      <Button
        variant="ghost"
        className="text-white hover:bg-black/20 p-2 h-auto"
        onClick={closePreview}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PreviewHeader;
