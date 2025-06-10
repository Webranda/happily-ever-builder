
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { EventItem } from '@/components/event-schedule/types';

export const useEventSchedule = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch events from Supabase
  const fetchEvents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_schedules')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      // Transform Supabase data to EventItem format
      const transformedEvents: EventItem[] = data.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time || '',
        location: event.location || '',
        description: event.description || ''
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Save event to Supabase
  const saveEvent = async (eventData: Omit<EventItem, 'id'>) => {
    if (!user) {
      toast.error('Please sign in to save events');
      return null;
    }

    try {
      setSaving(true);
      const { data, error } = await supabase
        .from('event_schedules')
        .insert({
          user_id: user.id,
          title: eventData.title,
          date: eventData.date,
          time: eventData.time || null,
          location: eventData.location || null,
          description: eventData.description || null
        })
        .select()
        .single();

      if (error) throw error;

      const newEvent: EventItem = {
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time || '',
        location: data.location || '',
        description: data.description || ''
      };

      setEvents(prev => [...prev, newEvent]);
      toast.success('Event saved successfully!');
      return newEvent;
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Remove event from Supabase
  const removeEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('event_schedules')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event removed successfully!');
    } catch (error) {
      console.error('Error removing event:', error);
      toast.error('Failed to remove event');
    }
  };

  // Load events when user changes
  useEffect(() => {
    if (user) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [user]);

  return {
    events,
    loading,
    saving,
    saveEvent,
    removeEvent,
    refetchEvents: fetchEvents
  };
};
