
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Heart, Calendar, Map, Users, ArrowLeft } from 'lucide-react';

interface WeddingDetails {
  partner1Name: string;
  partner2Name: string;
  coupleStory: string;
  eventDate: string;
  venueName: string;
  venueAddress: string;
  eventTime: string;
  receptionTime: string;
}

const templates = {
  elegant: {
    name: 'Elegant Affair',
    primaryColor: '#262E41', // wedding-navy
    secondaryColor: '#FDF8F3', // wedding-cream
    fontFamily: '"Cormorant Garamond", serif',
    headerStyle: 'py-8 bg-gradient-to-r from-[#262E41] to-[#3E4B66]',
    buttonStyle: 'bg-[#262E41] hover:bg-[#3E4B66]',
    backgroundImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2340&auto=format&fit=crop',
  },
  rustic: {
    name: 'Rustic Charm',
    primaryColor: '#8B5A2B', // rustic brown
    secondaryColor: '#F9F3E9', // rustic cream
    fontFamily: '"Montserrat", sans-serif',
    headerStyle: 'py-8 bg-[#8B5A2B]',
    buttonStyle: 'bg-[#8B5A2B] hover:bg-[#A67C52]',
    backgroundImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2370&auto=format&fit=crop',
  },
  modern: {
    name: 'Modern Minimalist',
    primaryColor: '#333333', // charcoal
    secondaryColor: '#FFFFFF', // white
    fontFamily: '"Inter", sans-serif',
    headerStyle: 'py-8 bg-[#333333]',
    buttonStyle: 'bg-[#333333] hover:bg-[#555555]',
    backgroundImage: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2370&auto=format&fit=crop',
  }
};

const TemplatePreview = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any>(null);
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>({
    partner1Name: 'Sarah',
    partner2Name: 'Michael',
    coupleStory: 'We met five years ago at a friend\'s birthday party and instantly connected over our love of travel and dogs. After three years of adventures together, Michael proposed during a sunset hike in Yosemite National Park.',
    eventDate: 'September 15, 2024',
    venueName: 'Lakeside Gardens',
    venueAddress: '123 Evergreen Avenue, Portland, OR 97201',
    eventTime: '4:00 PM',
    receptionTime: '6:00 PM',
  });

  useEffect(() => {
    if (templateId && templates[templateId as keyof typeof templates]) {
      setTemplate(templates[templateId as keyof typeof templates]);
    } else {
      // Redirect if template not found
      navigate('/templates');
    }
    
    // Check for stored wedding details
    const storedDetailsString = localStorage.getItem('weddingDetails');
    if (storedDetailsString) {
      try {
        const storedDetails = JSON.parse(storedDetailsString);
        setWeddingDetails(prev => ({
          ...prev,
          ...storedDetails
        }));
      } catch (error) {
        console.error('Error parsing stored wedding details:', error);
      }
    }
  }, [templateId, navigate]);

  if (!template) {
    return <div>Loading...</div>;
  }

  const closePreview = () => {
    navigate(-1);
  };

  return (
    <div style={{ fontFamily: template.fontFamily }} className="min-h-screen bg-white">
      {/* Preview Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white py-3 px-6 flex justify-between items-center">
        <Button
          variant="ghost"
          className="text-white hover:bg-black/20"
          onClick={closePreview}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back to Templates</span>
        </Button>
        <div className="text-sm md:text-base font-medium">Preview: {template.name}</div>
        <Button
          variant="ghost"
          className="text-white hover:bg-black/20 p-2 h-auto"
          onClick={closePreview}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Template Preview Content */}
      <div className="pt-14"> {/* Add padding to account for the fixed header */}
        {/* Hero Section */}
        <div 
          className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${template.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-center text-white px-4 py-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-7xl mb-6" style={{ fontFamily: template.fontFamily }}>
              {weddingDetails.partner1Name} & {weddingDetails.partner2Name}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              We're getting married!
            </p>
            <div className="text-2xl md:text-3xl mb-6">{weddingDetails.eventDate}</div>
            <Button 
              className={`${template.buttonStyle} text-white px-6 py-4 md:px-8 md:py-6 h-auto rounded-md text-lg`}
            >
              RSVP Now
            </Button>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-16 px-6" style={{ backgroundColor: template.secondaryColor }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ color: template.primaryColor }}>Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-1">
                <div className="aspect-square overflow-hidden rounded-full max-w-[200px] md:max-w-[250px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop" 
                    alt={weddingDetails.partner1Name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl mt-4" style={{ color: template.primaryColor }}>{weddingDetails.partner1Name}</h3>
                <p className="text-gray-600">The Bride</p>
              </div>
              <div className="text-5xl py-4 md:py-0">
                <Heart style={{ color: template.primaryColor }} className="h-12 w-12 mx-auto" />
              </div>
              <div className="flex-1">
                <div className="aspect-square overflow-hidden rounded-full max-w-[200px] md:max-w-[250px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1740&auto=format&fit=crop" 
                    alt={weddingDetails.partner2Name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl mt-4" style={{ color: template.primaryColor }}>{weddingDetails.partner2Name}</h3>
                <p className="text-gray-600">The Groom</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              {weddingDetails.coupleStory || "We met five years ago at a friend's birthday party and instantly connected over our love of travel and dogs. After three years of adventures together, Michael proposed during a sunset hike in Yosemite National Park."}
            </p>
            <p className="text-gray-700 text-lg">
              We can't wait to celebrate our special day with all of our friends and family who have supported us throughout our journey together.
            </p>
          </div>
        </section>

        {/* Event Details */}
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
                className={`${template.buttonStyle} text-white px-6 py-3 rounded-md`}
              >
                View Map & Directions
              </Button>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
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

        {/* Footer */}
        <footer className={template.headerStyle + " text-white text-center py-8"}>
          <p>{weddingDetails.partner1Name} & {weddingDetails.partner2Name}</p>
          <p className="mt-2">{weddingDetails.eventDate}</p>
        </footer>
      </div>
    </div>
  );
};

export default TemplatePreview;
