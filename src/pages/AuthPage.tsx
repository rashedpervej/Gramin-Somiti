import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Leaf } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'ইমেইল প্রয়োজন';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'সঠিক ইমেইল দিন';
    if (!password) newErrors.password = 'পাসওয়ার্ড প্রয়োজন';
    else if (password.length < 6) newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে';
    if (mode === 'signup') {
      if (!fullName.trim()) newErrors.fullName = 'পূর্ণ নাম প্রয়োজন';
      if (!phone.trim()) newErrors.phone = 'মোবাইল নম্বর প্রয়োজন';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error === 'Invalid login credentials'
            ? 'ইমেইল বা পাসওয়ার্ড ভুল আছে'
            : error
          );
        }
      } else {
        const { error } = await signUp(email, password, fullName, phone);
        if (error) {
          toast.error(error);
        } else {
          toast.success('নিবন্ধন সফল হয়েছে! অনুমোদনের জন্য অপেক্ষা করুন।');
          setMode('login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
      {/* Hero Header */}
      <div className="gradient-hero px-6 pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
          <div className="absolute top-10 left-1/2 h-32 w-32 rounded-full bg-white/5" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">গ্রামীণ সমিতি</h1>
          <p className="text-green-100 text-sm font-light">Gramin Somiti</p>
          <p className="text-green-200 text-xs mt-2">গ্রামীণ সঞ্চয় ও ঋণ ব্যবস্থাপনা</p>
        </motion.div>
      </div>

      {/* Form Card */}
      <div className="-mt-12 flex-1 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl card-shadow-lg p-6 max-w-md mx-auto"
        >
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-6">
            <button
              onClick={() => { setMode('login'); setErrors({}); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white card-shadow text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              লগইন করুন
            </button>
            <button
              onClick={() => { setMode('signup'); setErrors({}); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-white card-shadow text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              নিবন্ধন করুন
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === 'signup' && (
                <>
                  <Input
                    label="পূর্ণ নাম"
                    type="text"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    icon={<User className="h-4 w-4" />}
                    autoComplete="name"
                  />
                  <Input
                    label="মোবাইল নম্বর"
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    icon={<Phone className="h-4 w-4" />}
                    autoComplete="tel"
                  />
                </>
              )}

              <Input
                label="ইমেইল ঠিকানা"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
              />

              <Input
                label="পাসওয়ার্ড"
                type={showPassword ? 'text' : 'password'}
                placeholder="পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<Lock className="h-4 w-4" />}
                iconRight={showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                onIconRightClick={() => setShowPassword(!showPassword)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />

              {mode === 'signup' && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs text-amber-700 leading-relaxed">
                    ⚠️ নিবন্ধনের পর আপনার একাউন্ট অনুমোদনের জন্য অপেক্ষা করতে হবে। অ্যাডমিন অনুমোদন করলে আপনি ড্যাশবোর্ড ব্যবহার করতে পারবেন।
                  </p>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={loading}
                iconRight={!loading ? <ArrowRight className="h-4 w-4" /> : undefined}
                className="mt-2"
              >
                {mode === 'login' ? 'লগইন করুন' : 'নিবন্ধন করুন'}
              </Button>
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-xs text-gray-400">
            গ্রামীণ সমিতি v1.0 • সকল অধিকার সংরক্ষিত
          </p>
        </div>
      </div>
    </div>
  );
}
