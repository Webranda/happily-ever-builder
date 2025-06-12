
import React from 'react';
import { Calendar, Map, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeddingDetails {
  eventDate: string;
  venueName: string;
  venueAddress: string;
  eventTime: string;
  receptionTime: string;
}

interface EventDetailsSectionProps {
  template: any;
  weddingDetails: WeddingDetails;
  showSection: boolean;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ 
  template, 
  weddingDetails, 
  showSection 
}) => {
  if (!showSection) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-10 text-center" style={{ color: template.primaryColor }}>Wedding Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 shadow-soft rounded-lg">
            <Calendar className="h-10 w-10 mx-auto mb-4" style={{ color: template.primaryColor }} />
            <h3 className="text-xl mb-3" style={{ color: template.primaryColor }}>When</h3>
            <p className="text-gray-700">{weddingDetails.eventDate}</p>
            <p className="text-gray-700">Ceremony: {weddingDetails.eventTime}</p>
            <p className="text-gray-700">Reception: {weddingDetails.receptionTime}</p>
          </div>
          
          <div className="text-center p-6 shadow-soft rounded-lg">
            <Map className="h-10 w-10 mx-auto mb-4" style={{ color: template.primaryColor }} />
            <h3 className="text-xl mb-3" style={{ color: template.primaryColor }}>Where</h3>
            <p className="text-gray-700">{weddingDetails.venueName}</p>
            <p className="text-gray-700">{weddingDetails.venueAddress}</p>
          </div>
          
          <div className="text-center p-6 shadow-soft rounded-lg">
            <Users className="h-10 w-10 mx-auto mb-4" style={{ color: template.primaryColor }} />
            <h3 className="text-xl mb-3" style={{ color: template.primaryColor }}>Attire</h3>
            <p className="text-gray-700">Semi-formal / Cocktail</p>
            <p className="text-gray-700">Outdoor ceremony</p>
            <p className="text-gray-700">Indoor reception</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-6 py-3 rounded-md"
          >
            View Map & Directions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
