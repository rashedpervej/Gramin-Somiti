import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzzweimxnbhlzbbbrxcm.supabase.co';

const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6endlaW14bmJobHpiYmJyeGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNDU2MDAsImV4cCI6MjA5MzkyMTYwMH0.kGAvj4GyI6i4jGJFTP2tknizH26k683TLJNIySqvGT4';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'gramin-somiti-auth',
    },

    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

export default supabase;
