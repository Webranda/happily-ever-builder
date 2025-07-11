
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuthForm } from '@/hooks/useAuthForm';
import { AuthFormFields } from './AuthFormFields';
import { AuthModeToggle } from './AuthModeToggle';

const AuthForm: React.FC = () => {
  const {
    mode,
    isLoading,
    formError,
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    navigate
  } = useAuthForm();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-xl p-6 md:p-8 animate-scale-in">
        <h2 className="text-2xl font-serif mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormFields
            mode={mode}
            formData={formData}
            formError={formError}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(prev => !prev)}
            onChange={handleChange}
          />
          
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
        
        <AuthModeToggle
          mode={mode}
          onToggle={() => {}}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default AuthForm;
