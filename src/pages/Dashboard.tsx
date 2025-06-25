
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Dashboard from '@/components/dashboard/Dashboard';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
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
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <Logo size="md" />
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-wedding-navy"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <Container maxWidth="xl">
          <Dashboard />
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-12 border-t border-gray-100 bg-white">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default DashboardPage;
