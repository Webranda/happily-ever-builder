
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import EventCard from './EventCard';
import EventForm from './EventForm';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventListProps {
  events: EventItem[];
  isAddingEvent: boolean;
  newEvent: Omit<EventItem, 'id'>;
  setNewEvent: React.Dispatch<React.SetStateAction<Omit<EventItem, 'id'>>>;
  onAddEvent: () => void;
  onRemoveEvent: (id: string) => void;
  onStartAddingEvent: () => void;
  onCancelAddingEvent: () => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  isAddingEvent,
  newEvent,
  setNewEvent,
  onAddEvent,
  onRemoveEvent,
  onStartAddingEvent,
  onCancelAddingEvent
}) => {
  return (
    <div className="mb-8 p-6 bg-wedding-cream/30 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-serif">Your Wedding Events</h2>
          <p className="text-gray-600">Total events: {events.length}</p>
        </div>
        
        <Button 
          className="bg-wedding-gold hover:bg-wedding-gold/90 text-white"
          onClick={onStartAddingEvent}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      {isAddingEvent && (
        <EventForm
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          onAddEvent={onAddEvent}
          onCancel={onCancelAddingEvent}
        />
      )}
      
      {events.length > 0 ? (
        <div className="mt-6 space-y-6">
          {events.map(event => (
            <EventCard 
              key={event.id}
              event={event}
              onRemove={onRemoveEvent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No events added yet. Click "Add Event" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
