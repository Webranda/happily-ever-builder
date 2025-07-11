
import React from 'react';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './PasswordInput';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';

interface AuthFormFieldsProps {
  mode: 'login' | 'register';
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  };
  formError: string | null;
  showPassword: boolean;
  onTogglePassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  mode,
  formData,
  formError,
  showPassword,
  onTogglePassword,
  onChange
}) => {
  return (
    <>
      <div className="form-control">
        <label htmlFor="email" className="form-label">Email</label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="your@email.com"
          value={formData.email} 
          onChange={onChange} 
          className="form-input" 
          required 
        />
      </div>
      
      {mode === 'register' && (
        <>
          <div className="form-control">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <Input 
              id="firstName" 
              name="firstName" 
              type="text" 
              placeholder="e.g. Sarah" 
              value={formData.firstName} 
              onChange={onChange} 
              className="form-input" 
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <Input 
              id="lastName" 
              name="lastName" 
              type="text" 
              placeholder="e.g. Smith" 
              value={formData.lastName} 
              onChange={onChange} 
              className="form-input" 
            />
          </div>
        </>
      )}
      
      <div className="form-control relative">
        <label htmlFor="password" className="form-label">Password</label>
        <PasswordInput
          id="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={onChange}
          showPassword={showPassword}
          onToggleVisibility={onTogglePassword}
          required
        />
        {formError && (
          <div className="mt-2 text-sm text-red-600">{formError}</div>
        )}
        {mode === 'login' && <ForgotPasswordDialog />}
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
            onChange={onChange} 
            className="form-input" 
            required 
          />
        </div>
      )}
    </>
  );
};
