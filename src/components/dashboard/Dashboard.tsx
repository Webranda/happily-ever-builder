
import React from 'react';
import { 
  Calendar, 
  Image, 
  Users, 
  Settings, 
  List
} from 'lucide-react';
import { useEventSchedule } from '@/hooks/useEventSchedule';
import DashboardCard from './DashboardCard';
import DashboardHeader from './DashboardHeader';

const Dashboard: React.FC = () => {
  const { events } = useEventSchedule();
  const eventScheduleStatus = events.length > 0 ? 'complete' : 'in-progress';

  return (
    <div className="w-full animate-fade-in">
      <DashboardHeader />
      
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
          status="complete"
        />
        
        <DashboardCard
          title="Event Schedule"
          description="Add ceremony, reception and other important event details."
          icon={<Calendar className="h-5 w-5 text-amber-600" />}
          to="/event-schedule"
          accent="gold"
          status={eventScheduleStatus}
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
