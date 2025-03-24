
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
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
      <main className="py-10 md:py-16">
        <Container maxWidth="md">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Welcome to EverAfter</h1>
            <p className="text-gray-600 animate-fade-in">Create your account to get started with your wedding website</p>
          </div>
          
          <AuthForm />
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-auto">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <Link to="#" className="text-wedding-navy hover:underline">Privacy Policy</Link>
              <Link to="#" className="text-wedding-navy hover:underline">Terms of Service</Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Auth;
