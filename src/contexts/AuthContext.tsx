import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile, UserRole } from '@/types';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  profileLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profileFetchedRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    if (profileFetchedRef.current === userId) return;
    profileFetchedRef.current = userId;
    setProfileLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('[AuthContext] Profile fetch error:', fetchError);
        setProfile(null);
      } else {
        setProfile(data as Profile);
      }
    } catch (err) {
      console.error('[AuthContext] Unexpected error fetching profile:', err);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    profileFetchedRef.current = null;
    await fetchProfile(user.id);
  }, [user, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      const newUser = s?.user ?? null;
      setUser(newUser);
      if (newUser) {
        if (profileFetchedRef.current !== newUser.id) {
          fetchProfile(newUser.id);
        }
      } else {
        setProfile(null);
        profileFetchedRef.current = null;
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        return { error: signInError.message };
      }
      return { error: null };
    } catch (err) {
      console.error('[AuthContext] SignIn error:', err);
      return { error: 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName, phone },
        },
      });

      if (signUpError) {
        return { error: signUpError.message };
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email.trim(),
          full_name: fullName,
          phone,
          role: 'USER',
          approval_status: 'pending',
          account_status: 'active',
          blocked: false,
        });

        if (profileError) {
          console.error('[AuthContext] Profile creation error:', profileError);
        }
      }

      return { error: null };
    } catch (err) {
      console.error('[AuthContext] SignUp error:', err);
      return { error: 'নিবন্ধন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' };
    }
  };

  const signOut = async () => {
    setError(null);
    profileFetchedRef.current = null;
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    setSession(null);
  };

  const role = (profile?.role ?? null) as UserRole | null;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      role,
      loading,
      profileLoading,
      error,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
