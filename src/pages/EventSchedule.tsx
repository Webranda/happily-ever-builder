
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import EventList from '@/components/event-schedule/EventList';
import CompleteSetup from '@/components/event-schedule/CompleteSetup';
import type { EventItem } from '@/components/event-schedule/types';

const EventSchedule = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: 'Welcome Dinner',
      date: '2024-09-14',
      time: '19:00',
      location: 'Sunset Restaurant',
      description: 'Join us for a casual welcome dinner the night before our wedding.'
    },
    {
      id: '2',
      title: 'Wedding Ceremony',
      date: '2024-09-15',
      time: '16:00',
      location: 'Lakeside Gardens',
      description: 'Our wedding ceremony will take place overlooking the lake.'
    },
    {
      id: '3',
      title: 'Wedding Reception',
      date: '2024-09-15',
      time: '18:00',
      location: 'Lakeside Gardens - Grand Hall',
      description: 'Dinner, dancing and celebration will follow the ceremony.'
    }
  ]);
  
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<EventItem, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error('Event title and date are required');
      return;
    }
    
    const id = Date.now().toString();
    setEvents(prev => [...prev, { ...newEvent, id }]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: ''
    });
    setIsAddingEvent(false);
    toast.success('Event added successfully!');
  };

  const handleRemoveEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast.success('Event removed');
  };

  const handlePreviewWebsite = () => {
    // Navigate to template preview - using 'elegant' as default template
    // In a real app, this would use the user's selected template
    navigate('/preview/elegant');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <Logo size="md" />
          </Link>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-wedding-navy"
            asChild
          >
            <Link to="/dashboard">
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 md:py-16">
        <Container maxWidth="xl">
          <div className="mb-10">
            <Button 
              variant="ghost" 
              className="mb-4 text-gray-600 hover:text-wedding-navy" 
              asChild
            >
              <Link to="/photo-gallery">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Photo Gallery</span>
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Event Schedule</h1>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Add and manage all the events for your wedding weekend
              </p>
            </div>
          </div>
          
          <EventList
            events={events}
            isAddingEvent={isAddingEvent}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            onAddEvent={handleAddEvent}
            onRemoveEvent={handleRemoveEvent}
            onStartAddingEvent={() => setIsAddingEvent(true)}
            onCancelAddingEvent={() => setIsAddingEvent(false)}
          />

          <CompleteSetup onPreviewWebsite={handlePreviewWebsite} />
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-12 border-t border-gray-100">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default EventSchedule;
