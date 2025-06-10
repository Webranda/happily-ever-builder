
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import EventList from '@/components/event-schedule/EventList';
import CompleteSetup from '@/components/event-schedule/CompleteSetup';
import { useEventSchedule } from '@/hooks/useEventSchedule';
import { useAuth } from '@/hooks/useAuth';
import type { EventItem } from '@/components/event-schedule/types';

const EventSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, loading, saving, saveEvent, removeEvent } = useEventSchedule();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<EventItem, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error('Event title and date are required');
      return;
    }
    
    const savedEvent = await saveEvent(newEvent);
    if (savedEvent) {
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      setIsAddingEvent(false);
    }
  };

  const handleRemoveEvent = (id: string) => {
    removeEvent(id);
  };

  const handlePreviewWebsite = () => {
    // Navigate to template preview - using 'elegant' as default template
    // In a real app, this would use the user's selected template
    navigate('/preview/elegant');
  };

  if (!user) {
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
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4">Event Schedule</h1>
              <p className="text-gray-600 mb-6">Please sign in to manage your event schedule</p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
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
  }

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
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading your events...</p>
            </div>
          ) : (
            <EventList
              events={events}
              isAddingEvent={isAddingEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              onAddEvent={handleAddEvent}
              onRemoveEvent={handleRemoveEvent}
              onStartAddingEvent={() => setIsAddingEvent(true)}
              onCancelAddingEvent={() => setIsAddingEvent(false)}
              saving={saving}
            />
          )}

          {/* Show completion message and preview button when events exist */}
          {events.length > 0 && (
            <>
              <div className="mb-8 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                  <p className="text-green-700 font-medium">✓ Your events are automatically saved!</p>
                </div>
              </div>
              
              <CompleteSetup onPreviewWebsite={handlePreviewWebsite} />
            </>
          )}
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
