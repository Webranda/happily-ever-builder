
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import PreviewHeader from '@/components/template-preview/PreviewHeader';
import HeroSection from '@/components/template-preview/HeroSection';
import OurStorySection from '@/components/template-preview/OurStorySection';
import PhotoGallerySection from '@/components/template-preview/PhotoGallerySection';
import EventScheduleSection from '@/components/template-preview/EventScheduleSection';
import EventDetailsSection from '@/components/template-preview/EventDetailsSection';
import RSVPSection from '@/components/template-preview/RSVPSection';
import PreviewFooter from '@/components/template-preview/PreviewFooter';

interface WeddingDetails {
  partner1Name: string;
  partner2Name: string;
  coupleStory: string;
  eventDate: string;
  venueName: string;
  venueAddress: string;
  eventTime: string;
  receptionTime: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const templates = {
  elegant: {
    name: 'Elegant Affair',
    primaryColor: '#262E41', // wedding-navy
    secondaryColor: '#FDF8F3', // wedding-cream
    fontFamily: '"Cormorant Garamond", serif',
    headerStyle: 'py-8 bg-gradient-to-r from-[#262E41] to-[#3E4B66]',
    buttonStyle: 'bg-[#262E41] hover:bg-[#3E4B66]',
    backgroundImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2340&auto=format&fit=crop',
  },
  rustic: {
    name: 'Rustic Charm',
    primaryColor: '#8B5A2B', // rustic brown
    secondaryColor: '#F9F3E9', // rustic cream
    fontFamily: '"Montserrat", sans-serif',
    headerStyle: 'py-8 bg-[#8B5A2B]',
    buttonStyle: 'bg-[#8B5A2B] hover:bg-[#A67C52]',
    backgroundImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2370&auto=format&fit=crop',
  },
  modern: {
    name: 'Modern Minimalist',
    primaryColor: '#333333', // charcoal
    secondaryColor: '#FFFFFF', // white
    fontFamily: '"Inter", sans-serif',
    headerStyle: 'py-8 bg-[#333333]',
    buttonStyle: 'bg-[#333333] hover:bg-[#555555]',
    backgroundImage: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2370&auto=format&fit=crop',
  }
};

const TemplatePreview = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [template, setTemplate] = useState<any>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>({
    partner1Name: 'Sarah',
    partner2Name: 'Michael',
    coupleStory: 'We met five years ago at a friend\'s birthday party and instantly connected over our love of travel and dogs. After three years of adventures together, Michael proposed during a sunset hike in Yosemite National Park.',
    eventDate: 'September 15, 2024',
    venueName: 'Lakeside Gardens',
    venueAddress: '123 Evergreen Avenue, Portland, OR 97201',
    eventTime: '4:00 PM',
    receptionTime: '6:00 PM',
  });

  useEffect(() => {
    if (templateId && templates[templateId as keyof typeof templates]) {
      setTemplate(templates[templateId as keyof typeof templates]);
    } else {
      // Redirect if template not found
      navigate('/templates');
    }
    
    loadUserData();
  }, [templateId, navigate, user]);

  const loadUserData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Load wedding details from Supabase
      const { data: weddingData, error: weddingError } = await supabase
        .from('wedding_sites')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (weddingError) {
        console.error('Error loading wedding details:', weddingError);
      } else if (weddingData) {
        setWeddingDetails({
          partner1Name: weddingData.partner1_name || 'Sarah',
          partner2Name: weddingData.partner2_name || 'Michael',
          coupleStory: weddingData.couple_story || 'We met five years ago at a friend\'s birthday party and instantly connected over our love of travel and dogs. After three years of adventures together, Michael proposed during a sunset hike in Yosemite National Park.',
          eventDate: weddingData.event_date || 'September 15, 2024',
          venueName: weddingData.venue_name || 'Lakeside Gardens',
          venueAddress: weddingData.venue_address || '123 Evergreen Avenue, Portland, OR 97201',
          eventTime: weddingData.event_time || '4:00 PM',
          receptionTime: weddingData.reception_time || '6:00 PM',
        });

        // Set images from wedding data
        if (weddingData.images && Array.isArray(weddingData.images)) {
          setImages(weddingData.images);
        }
      } else {
        // Check for stored wedding details in localStorage as fallback
        const storedDetailsString = localStorage.getItem('weddingDetails');
        if (storedDetailsString) {
          try {
            const storedDetails = JSON.parse(storedDetailsString);
            setWeddingDetails(prev => ({
              ...prev,
              ...storedDetails
            }));
          } catch (error) {
            console.error('Error parsing stored wedding details:', error);
          }
        }
      }

      // Load events from Supabase
      const { data: eventsData, error: eventsError } = await supabase
        .from('event_schedules')
        .select('*')
        .order('date', { ascending: true });

      if (eventsError) {
        console.error('Error loading events:', eventsError);
      } else if (eventsData) {
        const transformedEvents: EventItem[] = eventsData.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time || '',
          location: event.location || '',
          description: event.description || ''
        }));
        setEvents(transformedEvents);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wedding website...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div style={{ fontFamily: template.fontFamily }} className="min-h-screen bg-white">
      <PreviewHeader templateName={template.name} />
      
      <div className="pt-14">
        <HeroSection
          template={template}
          partner1Name={weddingDetails.partner1Name}
          partner2Name={weddingDetails.partner2Name}
          eventDate={weddingDetails.eventDate}
        />

        <OurStorySection
          template={template}
          partner1Name={weddingDetails.partner1Name}
          partner2Name={weddingDetails.partner2Name}
          coupleStory={weddingDetails.coupleStory}
        />

        {images.length > 0 && (
          <PhotoGallerySection
            template={template}
            images={images}
          />
        )}

        <EventScheduleSection
          template={template}
          events={events}
        />

        <EventDetailsSection
          template={template}
          weddingDetails={weddingDetails}
          showSection={events.length === 0}
        />

        <RSVPSection template={template} />

        <PreviewFooter
          template={template}
          partner1Name={weddingDetails.partner1Name}
          partner2Name={weddingDetails.partner2Name}
          eventDate={weddingDetails.eventDate}
        />
      </div>
    </div>
  );
};

export default TemplatePreview;
