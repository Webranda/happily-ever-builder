
import React from 'react';

interface AuthModeToggleProps {
  mode: 'login' | 'register';
  onToggle: () => void;
  navigate: (path: string) => void;
}

export const AuthModeToggle: React.FC<AuthModeToggleProps> = ({
  mode,
  onToggle,
  navigate
}) => {
  const handleToggle = () => {
    const param = mode === 'login' ? '' : '?mode=login';
    navigate(`/auth${param}`);
  };

  return (
    <div className="text-center mt-6">
      <p className="text-sm text-gray-600">
        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={handleToggle}
          className="ml-1 text-wedding-navy hover:underline focus:outline-none"
        >
          {mode === 'login' ? 'Register' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};
