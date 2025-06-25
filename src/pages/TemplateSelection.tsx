
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import TemplateSelector from '@/components/templates/TemplateSelector';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const TemplateSelection = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
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
              <span>Exit to Dashboard</span>
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
              <Link to="/wedding-form">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Wedding Details</span>
              </Link>
            </Button>
          </div>
          
          <TemplateSelector />
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

export default TemplateSelection;
