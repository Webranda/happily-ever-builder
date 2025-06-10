
import React from 'react';
import { Button } from '@/components/ui/button';

interface RSVPSectionProps {
  template: any;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ template }) => {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: template.secondaryColor }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-4" style={{ color: template.primaryColor }}>RSVP</h2>
        <p className="mb-8 text-gray-700">We would be honored to have you join us on our special day. Please let us know if you can make it!</p>
        <Button 
          className={`${template.buttonStyle} text-white px-6 py-4 md:px-8 md:py-6 h-auto rounded-md text-lg mb-4`}
        >
          Respond to Invitation
        </Button>
        <p className="text-sm text-gray-500">Please RSVP by August 15, 2024</p>
      </div>
    </section>
  );
};

export default RSVPSection;
