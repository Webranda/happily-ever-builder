
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

interface FormSection {
  id: string;
  title: string;
  description: string;
}

const WeddingDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    // Couple details
    partner1Name: '',
    partner2Name: '',
    coupleStory: '',
    
    // Event details
    eventDate: '',
    venueName: '',
    venueAddress: '',
    eventTime: '',
    receptionTime: '',
    
    // Additional info
    registryLink: '',
    accommodationInfo: '',
    additionalNotes: '',
  });
  
  const sections: FormSection[] = [
    {
      id: 'couple',
      title: 'Tell us about you',
      description: 'Let\'s start with some basic information about the happy couple.',
    },
    {
      id: 'event',
      title: 'Event Details',
      description: 'Now, tell us about your special day.',
    },
    {
      id: 'additional',
      title: 'Additional Information',
      description: 'Almost done! Just a few more details to make your website complete.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        eventDate: format(selectedDate, 'PPP')
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < sections.length - 1) {
      // Simple validation
      if (currentStep === 0 && (!formData.partner1Name || !formData.partner2Name)) {
        toast.error("Please enter both partner names to continue");
        return;
      }
      
      if (currentStep === 1 && (!formData.eventDate || !formData.venueName)) {
        toast.error("Please enter the event date and venue to continue");
        return;
      }
      
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Submit the form
      console.log('Form submitted:', formData);
      toast.success('Wedding details saved successfully!');
      navigate('/template-selection');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={cn(
              "flex-1 text-center relative",
              index <= currentStep ? "text-wedding-navy" : "text-gray-400"
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                  index < currentStep 
                    ? "bg-wedding-navy text-white" 
                    : index === currentStep 
                      ? "bg-wedding-cream border-2 border-wedding-navy text-wedding-navy" 
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-sm font-medium hidden md:block">{section.title}</span>
            </div>
            {index < sections.length - 1 && (
              <div 
                className={cn(
                  "absolute top-5 left-1/2 w-full h-0.5", 
                  index < currentStep ? "bg-wedding-navy" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6 md:p-8 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">{sections[currentStep].title}</h2>
          <p className="text-gray-600">{sections[currentStep].description}</p>
        </div>

        <div className="space-y-6">
          {currentStep === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label htmlFor="partner1Name" className="form-label">Partner 1 Name</label>
                  <Input
                    id="partner1Name"
                    name="partner1Name"
                    value={formData.partner1Name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g. Sarah Johnson"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="partner2Name" className="form-label">Partner 2 Name</label>
                  <Input
                    id="partner2Name"
                    name="partner2Name"
                    value={formData.partner2Name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g. Michael Rodriguez"
                  />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="coupleStory" className="form-label">Your Story (Optional)</label>
                <Textarea
                  id="coupleStory"
                  name="coupleStory"
                  value={formData.coupleStory}
                  onChange={handleInputChange}
                  className="form-input h-32"
                  placeholder="Tell your guests how you met, your engagement story, or anything else you'd like to share..."
                />
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div className="form-control">
                <label className="form-label">Wedding Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select your wedding date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label htmlFor="eventTime" className="form-label">Ceremony Time</label>
                  <Input
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g. 3:00 PM"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="receptionTime" className="form-label">Reception Time (Optional)</label>
                  <Input
                    id="receptionTime"
                    name="receptionTime"
                    value={formData.receptionTime}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g. 5:30 PM"
                  />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="venueName" className="form-label">Venue Name</label>
                <Input
                  id="venueName"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. Grand Ballroom"
                />
              </div>

              <div className="form-control">
                <label htmlFor="venueAddress" className="form-label">Venue Address</label>
                <Input
                  id="venueAddress"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. 123 Wedding Lane, City, State ZIP"
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="form-control">
                <label htmlFor="registryLink" className="form-label">Registry Link (Optional)</label>
                <Input
                  id="registryLink"
                  name="registryLink"
                  value={formData.registryLink}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. https://www.registry.com/our-registry"
                />
              </div>

              <div className="form-control">
                <label htmlFor="accommodationInfo" className="form-label">Accommodation Information (Optional)</label>
                <Textarea
                  id="accommodationInfo"
                  name="accommodationInfo"
                  value={formData.accommodationInfo}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Information about hotels, room blocks, or travel arrangements for guests..."
                />
              </div>

              <div className="form-control">
                <label htmlFor="additionalNotes" className="form-label">Additional Notes (Optional)</label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Any additional information you'd like to share with your guests..."
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/5"
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={nextStep}
            className="bg-wedding-navy hover:bg-wedding-navy/90 text-white btn-hover-effect"
          >
            {currentStep === sections.length - 1 ? 'Save & Continue' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeddingDetailsForm;
