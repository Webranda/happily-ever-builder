
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Templates = () => {
  const navigate = useNavigate();
  
  const handleSelectTemplate = () => {
    // Redirect to auth for registration
    toast.info("Please sign up to select this template");
    navigate('/auth');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <Logo size="md" />
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-wedding-navy hover:text-wedding-navy/80 font-medium">
              Sign In
            </Link>
            <Button 
              className="bg-wedding-navy hover:bg-wedding-navy/90 text-white" 
              asChild
            >
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 md:py-16">
        <Container maxWidth="xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">
              Beautiful Wedding Website Templates
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Preview our beautiful templates and sign up to create your personalized wedding website
            </p>
          </div>
          
          <TemplateSelector isPreviewOnly={true} onSelectAction={handleSelectTemplate} />
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

export default Templates;
