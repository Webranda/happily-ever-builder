
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  // Check if we have the required tokens
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    // If we have tokens, set the session
    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }, [accessToken, refreshToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      if (!formData.password || !formData.confirmPassword) {
        setFormError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        setFormError(error.message);
        throw error;
      }

      toast.success("Password updated successfully!");
      navigate("/auth?mode=login");
    } catch (error) {
      if (error instanceof Error && !formError) {
        setFormError(error.message);
      }
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  // If no tokens, show error message
  if (!accessToken || !refreshToken) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-wedding-cream/50 to-white">
        <header className="w-full py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-block">
              <Logo size="lg" />
            </Link>
          </div>
        </header>

        <main className="py-10 md:py-16">
          <Container maxWidth="md">
            <div className="w-full max-w-md mx-auto">
              <div className="glass-card rounded-xl p-6 md:p-8 text-center">
                <h2 className="text-2xl font-serif mb-4">Invalid Reset Link</h2>
                <p className="text-gray-600 mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Link to="/auth?mode=login">
                  <Button className="w-full bg-wedding-navy hover:bg-wedding-navy/90 text-white">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-wedding-cream/50 to-white">
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>
      </header>

      <main className="py-10 md:py-16">
        <Container maxWidth="md">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Reset Your Password</h1>
            <p className="text-gray-600 animate-fade-in">Enter your new password below</p>
          </div>
          
          <div className="w-full max-w-md mx-auto">
            <div className="glass-card rounded-xl p-6 md:p-8 animate-scale-in">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control relative">
                  <label htmlFor="password" className="form-label">New Password</label>
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
                </div>

                <div className="form-control relative">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pr-12"
                      required
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {formError && (
                  <div className="text-sm text-red-600">{formError}</div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-wedding-navy hover:bg-wedding-navy/90 text-white btn-hover-effect" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="loader mr-2"></span>
                      <span>Updating password...</span>
                    </span>
                  ) : (
                    <span>Update Password</span>
                  )}
                </Button>
              </form>

              <div className="text-center mt-6">
                <Link to="/auth?mode=login" className="text-sm text-wedding-navy hover:underline">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default ResetPassword;
