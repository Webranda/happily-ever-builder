
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventScheduleSectionProps {
  template: any;
  events: EventItem[];
}

const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({ template, events }) => {
  if (events.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-10" style={{ color: template.primaryColor }}>Wedding Schedule</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          {events.map(event => (
            <div key={event.id} className="p-6 shadow-soft rounded-lg bg-white border border-gray-100 text-left">
              <h3 className="text-xl font-medium mb-3 text-center" style={{ color: template.primaryColor }}>
                {event.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center text-gray-700 justify-center md:justify-start">
                  <Calendar className="h-4 w-4 mr-2 shrink-0" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                
                {event.time && (
                  <div className="flex items-center text-gray-700 justify-center md:justify-start">
                    <Clock className="h-4 w-4 mr-2 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center text-gray-700 md:col-span-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mr-2 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <p className="text-gray-600 text-center">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
