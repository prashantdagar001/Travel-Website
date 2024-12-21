import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface OrganizerProfile {
  id: string;
  user_id: string;
  company_name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  verified: boolean;
}

export function useOrganizerProfile() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("organizer_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load profile")
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return { profile, loading, error };
}
