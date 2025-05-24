
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface ProfileFormProps {
  initial?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  onSaved?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initial = {}, onSaved }) => {
  const [firstName, setFirstName] = useState(initial.first_name || "");
  const [lastName, setLastName] = useState(initial.last_name || "");
  const [avatarUrl, setAvatarUrl] = useState(initial.avatar_url || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const id = userData.user?.id;

    if (!id) {
      toast.error("User not found");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated");
      onSaved?.();
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSave}>
      <div>
        <label className="form-label">First Name</label>
        <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div>
        <label className="form-label">Last Name</label>
        <Input value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>
      <div>
        <label className="form-label">Avatar URL</label>
        <Input type="url" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
};

export default ProfileForm;
