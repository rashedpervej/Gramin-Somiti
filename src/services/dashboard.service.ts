import { supabase } from '@/lib/supabase';
import type { Transaction, Notification, Meeting } from '@/types';

export async function getMemberStats(userId: string) {
  const [savingsRes, duesRes, loansRes] = await Promise.all([
    supabase.from('savings').select('amount').eq('member_id', userId),
    supabase.from('dues').select('amount').eq('member_id', userId).eq('paid', false),
    supabase.from('loans').select('amount, status').eq('member_id', userId).in('status', ['active', 'approved']),
  ]);

  const totalSavings = (savingsRes.data || []).reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalDues = (duesRes.data || []).reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalLoans = (loansRes.data || []).reduce((sum, l) => sum + (l.amount || 0), 0);

  return { totalSavings, totalDues, totalLoans };
}

export async function getAdminStats() {
  const [membersRes, pendingRes, savingsRes, duesRes] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact' }).eq('approval_status', 'approved'),
    supabase.from('profiles').select('id', { count: 'exact' }).eq('approval_status', 'pending'),
    supabase.from('savings').select('amount'),
    supabase.from('dues').select('amount').eq('paid', false),
  ]);

  const totalMembers = membersRes.count || 0;
  const pendingApprovals = pendingRes.count || 0;
  const totalSavings = (savingsRes.data || []).reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalDues = (duesRes.data || []).reduce((sum, d) => sum + (d.amount || 0), 0);

  return { totalMembers, pendingApprovals, totalSavings, totalDues };
}

export async function getRecentTransactions(userId: string, limit = 10): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, profiles(full_name, avatar_url)')
    .eq('member_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[dashboard.service] getRecentTransactions error:', error);
    return [];
  }
  return (data || []) as Transaction[];
}

export async function getAllRecentTransactions(limit = 20): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, profiles(full_name, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[dashboard.service] getAllRecentTransactions error:', error);
    return [];
  }
  return (data || []) as Transaction[];
}

export async function getUserNotifications(userId: string, limit = 20): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[dashboard.service] getUserNotifications error:', error);
    return [];
  }
  return (data || []) as Notification[];
}

export async function markNotificationRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
  return { error };
}

export async function getUpcomingMeetings(limit = 5): Promise<Meeting[]> {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .gte('meeting_date', new Date().toISOString())
    .eq('status', 'scheduled')
    .order('meeting_date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('[dashboard.service] getUpcomingMeetings error:', error);
    return [];
  }
  return (data || []) as Meeting[];
}

export async function getCollectorStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayRes, totalRes, dueRes] = await Promise.all([
    supabase.from('transactions').select('amount').gte('created_at', today.toISOString()),
    supabase.from('transactions').select('amount').eq('type', 'savings'),
    supabase.from('dues').select('amount, member_id').eq('paid', false),
  ]);

  const todayCollection = (todayRes.data || []).reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalCollection = (totalRes.data || []).reduce((sum, t) => sum + (t.amount || 0), 0);
  const pendingDues = (dueRes.data || []).reduce((sum, d) => sum + (d.amount || 0), 0);
  const dueMembersCount = new Set((dueRes.data || []).map(d => d.member_id)).size;

  return { todayCollection, totalCollection, pendingDues, dueMembersCount };
}
