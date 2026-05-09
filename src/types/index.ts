export type UserRole = 'USER' | 'MEMBER' | 'COLLECTOR' | 'MANAGER' | 'ADMIN' | 'SUPER_ADMIN';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type AccountStatus = 'active' | 'inactive' | 'suspended';

export interface Profile {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  approval_status: ApprovalStatus;
  account_status: AccountStatus;
  blocked: boolean;
  created_at: string;
}

export interface Role {
  id: string;
  name: UserRole;
  display_name: string;
  description: string | null;
  created_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role_id: string;
  assigned_by: string | null;
  created_at: string;
  roles?: Role;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string | null;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
}

export interface Savings {
  id: string;
  member_id: string;
  amount: number;
  type: string;
  description: string | null;
  transaction_date: string;
  created_at: string;
  profiles?: Profile;
}

export interface Due {
  id: string;
  member_id: string;
  amount: number;
  due_date: string;
  paid: boolean;
  paid_at: string | null;
  description: string | null;
  created_at: string;
  profiles?: Profile;
}

export interface Loan {
  id: string;
  member_id: string;
  amount: number;
  interest_rate: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'closed';
  disbursed_at: string | null;
  due_date: string | null;
  description: string | null;
  created_at: string;
  profiles?: Profile;
}

export interface Transaction {
  id: string;
  member_id: string;
  type: 'credit' | 'debit' | 'savings' | 'due' | 'loan';
  amount: number;
  description: string | null;
  reference_id: string | null;
  created_at: string;
  profiles?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string | null;
  meeting_date: string;
  location: string | null;
  created_by: string | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  resource: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  profiles?: Profile;
}

export interface SmsLog {
  id: string;
  recipient: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  sent_at: string | null;
  created_at: string;
}

export interface SmsTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[] | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface DashboardStats {
  totalSavings: number;
  totalDues: number;
  totalLoans: number;
  pendingApprovals: number;
  totalMembers: number;
  recentTransactions: Transaction[];
}
