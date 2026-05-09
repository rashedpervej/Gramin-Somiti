import { format, formatDistanceToNow } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyEn(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'dd MMM yyyy');
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'dd MMM yyyy, HH:mm');
  } catch {
    return dateStr;
  }
}

export function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    USER: 'ব্যবহারকারী',
    MEMBER: 'সদস্য',
    COLLECTOR: 'কালেক্টর',
    MANAGER: 'ম্যানেজার',
    ADMIN: 'অ্যাডমিন',
    SUPER_ADMIN: 'সুপার অ্যাডমিন',
  };
  return labels[role] || role;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'অপেক্ষমান',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    suspended: 'স্থগিত',
    open: 'খোলা',
    in_progress: 'চলমান',
    resolved: 'সমাধান হয়েছে',
    closed: 'বন্ধ',
    scheduled: 'নির্ধারিত',
    completed: 'সম্পন্ন',
    cancelled: 'বাতিল',
    sent: 'পাঠানো হয়েছে',
    failed: 'ব্যর্থ',
    low: 'কম',
    medium: 'মধ্যম',
    high: 'উচ্চ',
    urgent: 'জরুরি',
  };
  return labels[status] || status;
}

export function tobengaliNumber(num: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d)]);
}
