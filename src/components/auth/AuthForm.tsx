
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { userStore } from '@/store/userStore';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('register');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    partner1Name: '',
    partner2Name: '',
  });
  
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For demonstration purposes, we'll simulate a successful authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Form validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }
      
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        // Save user data to our store
        userStore.updateData({
          email: formData.email,
          partner1Name: formData.partner1Name,
          partner2Name: formData.partner2Name
        });
      }
      
      // In a real app, you would handle authentication with a backend
      // Simulate successful auth
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created! Welcome!');
      
      // Navigate to the form page after successful authentication
      navigate('/wedding-form');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
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
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {mode === 'register' && (
            <>
              <div className="form-control">
                <label htmlFor="partner1Name" className="form-label">Your Name</label>
                <Input
                  id="partner1Name"
                  name="partner1Name"
                  type="text"
                  placeholder="e.g. Sarah"
                  value={formData.partner1Name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-control">
                <label htmlFor="partner2Name" className="form-label">Partner's Name</label>
                <Input
                  id="partner2Name"
                  name="partner2Name"
                  type="text"
                  placeholder="e.g. Michael"
                  value={formData.partner2Name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          )}

          <div className="form-control">
            <label htmlFor="password" className="form-label">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-control">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-wedding-navy hover:bg-wedding-navy/90 text-white btn-hover-effect"
            disabled={isLoading}
          >
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
              onClick={toggleMode}
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
