
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { userStore } from '@/store/userStore';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const location = useLocation();
  // Parse query string to determine mode
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'login' ? 'login' : 'register';

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // If mode from query param changes, update local mode state.
  useEffect(() => {
    setMode(queryParams.get('mode') === 'login' ? 'login' : 'register');
    // eslint-disable-next-line
  }, [location.search]);

  const toggleMode = () => setMode(mode === 'login' ? 'register' : 'login');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            }
          }
        });
        if (signUpError) throw signUpError;
        toast.success("Account created! Check your email (inbox/spam) to confirm.");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;
        toast.success("Welcome back!");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-xl p-6 md:p-8 animate-scale-in">
        <h2 className="text-2xl font-serif mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="form-label">Email</label>
            <Input id="email" name="email" type="email" placeholder="your@email.com"
              value={formData.email} onChange={handleChange} className="form-input" required />
          </div>
          {mode === 'register' && (
            <>
              <div className="form-control">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Input id="firstName" name="firstName" type="text" placeholder="e.g. Sarah" value={formData.firstName} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-control">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Input id="lastName" name="lastName" type="text" placeholder="e.g. Smith" value={formData.lastName} onChange={handleChange} className="form-input" />
              </div>
            </>
          )}
          <div className="form-control">
            <label htmlFor="password" className="form-label">Password</label>
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="form-input" required />
          </div>
          {mode === 'register' && (
            <div className="form-control">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="form-input" required />
            </div>
          )}
          <Button type="submit" className="w-full bg-wedding-navy hover:bg-wedding-navy/90 text-white btn-hover-effect" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="loader mr-2"></span>
                <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
              </span>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                // When toggling, update the query param too for consistency in navigation
                const param = mode === 'login' ? '' : '?mode=login';
                navigate(`/auth${param}`);
              }}
              className="ml-1 text-wedding-navy hover:underline focus:outline-none"
            >
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
