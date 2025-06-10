
import React from 'react';
import { Heart } from 'lucide-react';

interface OurStorySectionProps {
  template: any;
  partner1Name: string;
  partner2Name: string;
  coupleStory: string;
}

const OurStorySection: React.FC<OurStorySectionProps> = ({ 
  template, 
  partner1Name, 
  partner2Name, 
  coupleStory 
}) => {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: template.secondaryColor }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-8" style={{ color: template.primaryColor }}>Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <div className="aspect-square overflow-hidden rounded-full max-w-[200px] md:max-w-[250px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop" 
                alt={partner1Name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl mt-4" style={{ color: template.primaryColor }}>{partner1Name}</h3>
            <p className="text-gray-600">The Bride</p>
          </div>
          <div className="text-5xl py-4 md:py-0">
            <Heart style={{ color: template.primaryColor }} className="h-12 w-12 mx-auto" />
          </div>
          <div className="flex-1">
            <div className="aspect-square overflow-hidden rounded-full max-w-[200px] md:max-w-[250px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1740&auto=format&fit=crop" 
                alt={partner2Name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl mt-4" style={{ color: template.primaryColor }}>{partner2Name}</h3>
            <p className="text-gray-600">The Groom</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6 text-lg">
          {coupleStory || "We met five years ago at a friend's birthday party and instantly connected over our love of travel and dogs. After three years of adventures together, Michael proposed during a sunset hike in Yosemite National Park."}
        </p>
        <p className="text-gray-700 text-lg">
          We can't wait to celebrate our special day with all of our friends and family who have supported us throughout our journey together.
        </p>
      </div>
    </section>
  );
};

export default OurStorySection;
