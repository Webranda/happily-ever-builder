
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CompleteSetupProps {
  onPreviewWebsite: () => void;
}

const CompleteSetup: React.FC<CompleteSetupProps> = ({ onPreviewWebsite }) => {
  return (
    <div className="mt-12 text-center">
      <div className="bg-wedding-cream/50 rounded-xl p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-serif mb-4 text-wedding-navy">Ready to See Your Website?</h3>
        <p className="text-gray-600 mb-6">
          Your wedding website is ready! Preview it with your photos and event schedule to see how it looks to your guests.
        </p>
        
        <Button
          className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-8 py-6 h-auto text-lg btn-hover-effect"
          onClick={onPreviewWebsite}
        >
          Preview Your Website
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          You can always come back to add more events or photos later
        </p>
      </div>
    </div>
  );
};

export default CompleteSetup;
