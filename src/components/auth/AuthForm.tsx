
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { userStore } from '@/store/userStore';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const location = useLocation();
  // Parse query string to determine mode
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'login' ? 'login' : 'register';

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for forgot password dialog
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

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
    setFormError(null); // clear error when user edits an input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setFormError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setFormError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth?mode=login`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            }
          }
        });
        
        if (signUpError) {
          setFormError(signUpError.message);
          throw signUpError;
        }
        
        toast.success("Account created! Please check your email to confirm your account.");
        // Redirect to email confirmation page
        navigate("/email-confirmation");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) {
          setFormError('Incorrect email or password. Please try again.');
          throw signInError;
        }
        toast.success("Welcome back!");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      // Error is already set in formError and toast
      if (error instanceof Error && !formError) setFormError(error.message);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotLoading(true);
    try {
      if (!forgotEmail) {
        setForgotError("Please enter your email.");
        setForgotLoading(false);
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: window.location.origin + "/auth?mode=login"
      });
      if (error) {
        setForgotError(error.message);
        throw error;
      }
      toast.success("Password reset email sent! Check your inbox (or spam).");
      setShowForgot(false);
      setForgotEmail('');
    } catch (err) {
      // forgotError is already set
    } finally {
      setForgotLoading(false);
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
          <div className="form-control relative">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="form-input pr-12"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formError && (
              <div className="mt-2 text-sm text-red-600">{formError}</div>
            )}
            {mode === 'login' && (
              <div className="mt-2 flex justify-end">
                {/* Dialog for forgot password */}
                <Dialog open={showForgot} onOpenChange={setShowForgot}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-xs text-wedding-navy hover:underline focus:outline-none"
                      tabIndex={0}
                    >
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset your password</DialogTitle>
                      <DialogDescription>
                        Enter your email and we'll send you a password reset link.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-3">
                      <div>
                        <label htmlFor="forgot-email" className="form-label">Email</label>
                        <Input
                          id="forgot-email"
                          type="email"
                          value={forgotEmail}
                          placeholder="your@email.com"
                          onChange={e => {
                            setForgotEmail(e.target.value);
                            setForgotError(null);
                          }}
                          required
                        />
                      </div>
                      {forgotError && (
                        <div className="text-sm text-red-600">{forgotError}</div>
                      )}
                      <DialogFooter>
                        <Button type="submit" disabled={forgotLoading} className="w-full bg-wedding-navy text-white">
                          {forgotLoading ? "Sending reset link..." : "Send reset link"}
                        </Button>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="w-full mt-1">
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
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
