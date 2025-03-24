
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import WeddingDetailsForm from '@/components/weddingForm/WeddingDetailsForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const WeddingForm = () => {
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
        <Container maxWidth="lg">
          <div className="mb-10">
            <Button 
              variant="ghost" 
              className="mb-4 text-gray-600 hover:text-wedding-navy" 
              asChild
            >
              <Link to="/dashboard">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Tell Us About Your Wedding</h1>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Fill in the details below to create your personalized wedding website
              </p>
            </div>
          </div>
          
          <WeddingDetailsForm />
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

export default WeddingForm;
