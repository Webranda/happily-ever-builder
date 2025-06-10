
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  template: any;
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  template, 
  partner1Name, 
  partner2Name, 
  eventDate 
}) => {
  return (
    <div 
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${template.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center text-white px-4 py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-7xl mb-6" style={{ fontFamily: template.fontFamily }}>
          {partner1Name} & {partner2Name}
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          We're getting married!
        </p>
        <div className="text-2xl md:text-3xl mb-6">{eventDate}</div>
        <Button 
          className={`${template.buttonStyle} text-white px-6 py-4 md:px-8 md:py-6 h-auto rounded-md text-lg`}
        >
          RSVP Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
