import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Plus, Clock, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

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
          
          <div className="mb-8 p-6 bg-wedding-cream/30 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif">Your Wedding Events</h2>
                <p className="text-gray-600">Total events: {events.length}</p>
              </div>
              
              <Button 
                className="bg-wedding-gold hover:bg-wedding-gold/90 text-white"
                onClick={() => setIsAddingEvent(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>
            
            {isAddingEvent && (
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
                    onClick={() => setIsAddingEvent(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-wedding-navy hover:bg-wedding-navy/90" 
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </Button>
                </div>
              </div>
            )}
            
            {events.length > 0 ? (
              <div className="mt-6 space-y-6">
                {events.map(event => (
                  <div 
                    key={event.id}
                    className="p-4 border border-gray-200 rounded-lg bg-white flex flex-col md:flex-row gap-4"
                  >
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
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No events added yet. Click "Add Event" to get started.</p>
              </div>
            )}
          </div>

          {/* Complete Setup Section */}
          <div className="mt-12 text-center">
            <div className="bg-wedding-cream/50 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif mb-4 text-wedding-navy">Ready to See Your Website?</h3>
              <p className="text-gray-600 mb-6">
                Your wedding website is ready! Preview it with your photos and event schedule to see how it looks to your guests.
              </p>
              
              <Button
                className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-8 py-6 h-auto text-lg btn-hover-effect"
                onClick={handlePreviewWebsite}
              >
                Preview Your Website
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                You can always come back to add more events or photos later
              </p>
            </div>
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
};

export default EventSchedule;
