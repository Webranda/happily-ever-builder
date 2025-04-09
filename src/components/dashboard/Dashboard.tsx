
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Edit, 
  Globe, 
  Calendar, 
  Image, 
  Users, 
  Settings, 
  List,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  accent?: 'default' | 'blue' | 'gold' | 'green' | 'pink';
  status?: 'complete' | 'in-progress' | 'not-started';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  to,
  accent = 'default',
  status = 'in-progress'
}) => {
  const accentClasses = {
    'default': 'bg-wedding-taupe/10 border-wedding-taupe/30 hover:border-wedding-taupe',
    'blue': 'bg-blue-50 border-blue-200/30 hover:border-blue-300',
    'gold': 'bg-amber-50 border-amber-200/30 hover:border-amber-300',
    'green': 'bg-green-50 border-green-200/30 hover:border-green-300',
    'pink': 'bg-wedding-blush/20 border-pink-200/30 hover:border-pink-300',
  };
  
  const statusBadge = {
    'complete': { label: 'Complete', class: 'bg-green-100 text-green-800' },
    'in-progress': { label: 'In Progress', class: 'bg-blue-100 text-blue-800' },
    'not-started': { label: 'Not Started', class: 'bg-gray-100 text-gray-800' },
  };

  return (
    <Card className={cn(
      "transition-all duration-300 overflow-hidden border hover:shadow-medium",
      accentClasses[accent]
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <span className="p-2 rounded-md bg-white shadow-soft">
            {icon}
          </span>
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            statusBadge[status].class
          )}>
            {statusBadge[status].label}
          </span>
        </div>
        <CardTitle className="text-xl mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-wedding-navy hover:bg-wedding-navy/5 hover:text-wedding-navy"
          asChild
        >
          <Link to={to}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Manage</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="w-full animate-fade-in">
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
            <Button className="bg-wedding-gold hover:bg-wedding-gold/90 text-white">
              <Heart className="mr-2 h-4 w-4" /> Publish Site
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Basic Details"
          description="Edit your names, wedding date, and location information."
          icon={<List className="h-5 w-5 text-wedding-navy" />}
          to="/wedding-form"
          accent="default"
          status="complete"
        />
        
        <DashboardCard
          title="Theme & Design"
          description="Customize your template, colors, and styling options."
          icon={<Settings className="h-5 w-5 text-blue-600" />}
          to="/template-selection"
          accent="blue"
          status="complete"
        />
        
        <DashboardCard
          title="Photo Gallery"
          description="Upload and organize photos to share with your guests."
          icon={<Image className="h-5 w-5 text-green-600" />}
          to="/photo-gallery"
          accent="green"
          status="in-progress"
        />
        
        <DashboardCard
          title="Event Schedule"
          description="Add ceremony, reception and other important event details."
          icon={<Calendar className="h-5 w-5 text-amber-600" />}
          to="/event-schedule"
          accent="gold"
          status="in-progress"
        />
        
        <DashboardCard
          title="Guest Management"
          description="Manage your guest list and track RSVPs."
          icon={<Users className="h-5 w-5 text-pink-600" />}
          to="/guest-list"
          accent="pink"
          status="in-progress"
        />
      </div>
    </div>
  );
};

export default Dashboard;
