import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, LogOut, UserCheck, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function WaitingApprovalPage() {
  const { signOut, refreshProfile, profile } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshProfile();
      toast.success('স্ট্যাটাস আপডেট করা হয়েছে');
    } catch {
      toast.error('আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Animated Icon */}
          <div className="relative inline-flex mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-green-300"
            />
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border-2 border-green-200">
              <Clock className="h-10 w-10 text-green-600" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">!</span>
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">অপেক্ষায় আছেন</h1>
          <div className="bg-white rounded-2xl card-shadow p-5 text-left space-y-2 mb-6">
            <p className="text-base text-gray-700 font-medium text-center leading-relaxed">
              আপনার একাউন্ট অনুমোদনের অপেক্ষায় আছে
            </p>
            <p className="text-sm text-gray-400 text-center">
              Your account is pending approval
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-2xl card-shadow p-4 mb-6">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-50">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-gray-900">{profile?.full_name || 'ব্যবহারকারী'}</p>
                <p className="text-xs text-gray-400">{profile?.email}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                অপেক্ষমান
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>অ্যাডমিন আপনার আবেদন পর্যালোচনা করছেন</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>অনুমোদনের পর আপনাকে জানানো হবে</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-green-800">যোগাযোগ করুন</p>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              দেরি হলে আপনার সমিতির অ্যাডমিনের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={refreshing}
            onClick={handleRefresh}
            icon={<RefreshCw className="h-4 w-4" />}
          >
            স্ট্যাটাস যাচাই করুন
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            loading={signingOut}
            onClick={handleSignOut}
            icon={<LogOut className="h-4 w-4" />}
          >
            লগআউট করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
