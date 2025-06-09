
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventCardProps {
  event: EventItem;
  onRemove: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRemove }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white flex flex-col md:flex-row gap-4">
      <div className="flex justify-center items-center md:w-16 shrink-0">
        <Calendar className="h-10 w-10 text-wedding-navy" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-medium text-wedding-navy">{event.title}</h3>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          
          {event.time && (
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-2 shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          
          {event.location && (
            <div className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-2 shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        
        {event.description && (
          <p className="mt-3 text-gray-600">{event.description}</p>
        )}
      </div>
      
      <div className="shrink-0 flex md:flex-col justify-end md:justify-start gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => onRemove(event.id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
