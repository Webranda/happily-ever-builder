import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen w-full">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 backdrop-blur-sm bg-white/80 sticky top-0 z-10 shadow-soft">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="lg" />
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-wedding-navy font-medium">Welcome!</span>
                <Button className="bg-wedding-navy text-white" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login" className="text-wedding-navy hover:text-wedding-navy/80 font-medium">
                  Sign In
                </Link>
                <Button 
                  className="bg-wedding-gold hover:bg-wedding-gold/90 text-wedding-navy font-medium" 
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden gradient-bg-1">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-radial from-wedding-cream via-transparent to-transparent" />
        </div>
        
        <Container className="relative z-1 text-center max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-wedding-blush text-wedding-navy font-medium text-sm animate-fade-in">
            Create Your Dream Wedding Website
          </div>
          
          <h1 className="text-4xl md:text-6xl mb-6 font-serif animate-slide-down">
            Tell Your <span className="text-wedding-gold decorated-border">Love Story</span> With a Beautiful Wedding Website
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in">
            Create an elegant and personalized wedding website to share your journey, details, and memories with your loved ones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button 
              size="lg" 
              className="bg-wedding-gold hover:bg-wedding-gold/90 text-wedding-navy font-medium px-8 btn-hover-effect"
              asChild
            >
              <Link to="/auth">Create Your Website</Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/5"
              asChild
            >
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-pattern-light">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 animate-fade-in">
              Create Your <span className="text-wedding-gold">Perfect</span> Wedding Website
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Our easy-to-use platform helps you create a beautiful wedding website in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Beautiful Templates",
                description: "Choose from a variety of elegant, professionally designed templates that match your wedding style.",
                delay: "0ms",
                className: "color-card-1"
              },
              {
                title: "Easy Customization",
                description: "Personalize your site with your colors, photos, and details to make it uniquely yours.",
                delay: "150ms",
                className: "color-card-2"
              },
              {
                title: "Mobile Friendly",
                description: "Your wedding website looks perfect on any device, so guests can access it anywhere.",
                delay: "300ms",
                className: "color-card-3"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`glass-card rounded-xl p-6 text-center animate-fade-in feature-card ${feature.className}`}
                style={{ animationDelay: feature.delay }}
              >
                <h3 className="text-xl mb-3 font-serif">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-wedding-cream">
        <Container className="relative z-1 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl mb-6 font-serif animate-fade-in text-wedding-navy">
            Start Creating Your Wedding Website Today
          </h2>
          
          <p className="text-lg text-wedding-navy/80 mb-10 animate-fade-in">
            Join thousands of happy couples who have created beautiful wedding websites with EverAfter.
          </p>
          
          <Button 
            size="lg" 
            className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-10 py-6 h-auto text-lg animate-scale-in btn-hover-effect"
            asChild
          >
            <Link to="/auth">Get Started Free</Link>
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-wedding-navy text-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="text-white mb-6 md:mb-0" />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm">
              <Link to="/about" className="hover:text-wedding-gold transition-colors">About Us</Link>
              <Link to="/templates" className="hover:text-wedding-gold transition-colors">Templates</Link>
              <Link to="/privacy" className="hover:text-wedding-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-wedding-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} EverAfter. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
