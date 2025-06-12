
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Heart } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-wedding-cream to-wedding-blush/30 rounded-xl shadow-soft">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl mb-1">Welcome to Your Wedding Dashboard</h1>
          <p className="text-gray-600">Customize and manage all aspects of your wedding website</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/5" 
            asChild
          >
            <Link to="/templates"><Globe className="mr-2 h-4 w-4" /> Preview Site</Link>
          </Button>
          <Button className="bg-wedding-gold hover:bg-wedding-gold/90 text-wedding-navy">
            <Heart className="mr-2 h-4 w-4" /> Publish Site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
