
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';
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

export default DashboardCard;
