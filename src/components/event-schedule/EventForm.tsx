
import React from 'react';
import { Button } from '@/components/ui/button';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventFormProps {
  newEvent: Omit<EventItem, 'id'>;
  setNewEvent: React.Dispatch<React.SetStateAction<Omit<EventItem, 'id'>>>;
  onAddEvent: () => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  newEvent,
  setNewEvent,
  onAddEvent,
  onCancel
}) => {
  return (
    <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-white">
      <h3 className="text-lg font-medium mb-4">Add New Event</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
            placeholder="Wedding Ceremony"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
            placeholder="Wedding Venue"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
            rows={3}
            placeholder="Provide additional details about this event..."
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="bg-wedding-navy hover:bg-wedding-navy/90" 
          onClick={onAddEvent}
        >
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
