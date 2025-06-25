
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-wedding-cream/50 to-white">
      {/* Header */}
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <Container maxWidth="md">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-wedding-gold/20 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-wedding-gold" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl mb-4 font-serif animate-fade-in">
              Thank You for Signing Up!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 animate-fade-in">
              A confirmation link has been sent to your email address.
            </p>
            
            <div className="glass-card rounded-xl p-6 md:p-8 mb-8 animate-scale-in">
              <h2 className="text-xl mb-4 font-serif">What's Next?</h2>
              <div className="text-left space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-wedding-navy/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm font-medium text-wedding-navy">1</span>
                  </div>
                  <p>Check your email inbox (and spam folder) for our confirmation email</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-wedding-navy/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm font-medium text-wedding-navy">2</span>
                  </div>
                  <p>Click the confirmation link in the email to verify your account</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-wedding-navy/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm font-medium text-wedding-navy">3</span>
                  </div>
                  <p>Sign in to start creating your beautiful wedding website</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-wedding-navy hover:bg-wedding-navy/90 text-white"
                asChild
              >
                <Link to="/auth?mode=login">Go to Sign In</Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/5"
                asChild
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-auto">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default EmailConfirmation;
