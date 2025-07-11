
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type AuthMode = 'login' | 'register';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const useAuthForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'login' ? 'login' : 'register';

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    setMode(queryParams.get('mode') === 'login' ? 'login' : 'register');
    // eslint-disable-next-line
  }, [location.search]);

  const toggleMode = () => setMode(mode === 'login' ? 'register' : 'login');

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
      if (error instanceof Error && !formError) setFormError(error.message);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mode,
    isLoading,
    formError,
    formData,
    showPassword,
    setShowPassword,
    toggleMode,
    handleChange,
    handleSubmit,
    navigate
  };
};
