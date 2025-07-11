
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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

export const ForgotPasswordDialog: React.FC = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

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
        redirectTo: `${window.location.origin}/reset-password`
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
    <div className="mt-2 flex justify-end">
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
  );
};
