import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/CheckBox';
import { Divider } from '@/components/Divider';
import { SocialAuthButtons } from '../components/SocialAuthButtons';
import { User, LoginFormData, FormErrors } from '@/types';
import { AUTH_STORAGE_KEY, notifyAuthChange } from '@/lib/auth';
import { useLoginUserMutation } from '@/lib/useUser';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface LoginFormProps {
  onSuccess: (user: User) => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignUp,
  onForgotPassword,
  isLoading: externalLoading = false,
}) => {
  const router = useRouter();
  const loginMutation = useLoginUserMutation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success' | 'info';
    text: string;
  } | null>(null);

  // تم ترك الـ Validations كما هي تماماً بدون أي تغيير
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    // استدعاء الـ API الحقيقي للتسجيل
    loginMutation.mutate(
      {
        email: formData.email.toLowerCase().trim(),
        password: formData.password.trim(),
      },
      {
        onSuccess: (response) => {
          const loggedInUser: User = {
            id: response.data?.user.id || `user-${Date.now()}`,
            name: response.data?.user.name || 'Astral Traveler',
            email: response.data?.user.email || formData.email.toLowerCase().trim(),
            emotionalPlanet: 'Calm Universe',
            createdAt: new Date().toISOString(),
          };

          if (formData.rememberMe) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
          }
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          notifyAuthChange();

          setStatusMessage({
            type: 'success',
            text: 'Access granted. Welcome back to Elysium Galaxy!',
          });

          onSuccess(loggedInUser);
          // التوجيه إلى صفحة المجرة
          router.push('/galaxy1');
        },
        onError: (error: unknown) => {
         const err = error as { response?: { data?: { message?: string } } };
        setStatusMessage({
        type: 'error',
        text: err?.response?.data?.message || 'Authentication failed. Please check your credentials.',
       });
      },
      
      }
    );
  };

  const handleFillDemo = () => {
    setFormData({
      email: 'stargazer@elysium.space',
      password: 'GalaxyPassword123!',
      rememberMe: true,
    });
    setErrors({});
    setStatusMessage({
      type: 'info',
      text: 'Demo credentials loaded. Click "Sign In" to enter.',
    });
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    // محاكاة تسجيل الدخول بالخدمات الاجتماعية
    const providerUser: User = {
      id: `${provider}-${Date.now()}`,
      name: provider === 'google' ? 'Alex Rivera' : 'Cosmic Developer',
      email: `${provider.toLowerCase()}.explorer@elysium.space`,
      emotionalPlanet: provider === 'google' ? 'Calm Planet' : 'Happiness Hub',
      createdAt: new Date().toISOString(),
    };

    if (formData.rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(providerUser));
    }
    notifyAuthChange();

    onSuccess(providerUser);
    router.push('/galaxy1');
  };

  const isLoading = loginMutation.isPending || externalLoading;

  return (
    <div id="login-form-wrapper" className="w-full">
      {/* Demo Credentials Quick Pill */}
      <div className="mb-5 flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/25 border border-cyan-500/20 text-xs text-cyan-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
          <span className="text-[11px] sm:text-xs text-gray-300">
            Want to test quickly?
          </span>
        </div>
        <button
          type="button"
          id="btn-fill-demo"
          onClick={handleFillDemo}
          className="text-xs font-semibold text-cyan-300 hover:text-cyan-100 hover:underline cursor-pointer transition"
        >
          Fill Demo Account
        </button>
      </div>

      {statusMessage && (
        <div
          id="login-status-message"
          className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${statusMessage.type === 'error'
              ? 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
              : statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                : 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-200'
            }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <Input
          id="login-email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="traveler@elysium.space"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
          leadingIcon={<Mail className="w-4 h-4" />}
          disabled={isLoading}
        />

        {/* Password Field */}
        <div>
          <Input
            id="login-password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            leadingIcon={<Lock className="w-4 h-4" />}
            disabled={isLoading}
          />

          <div className="flex items-center justify-between mt-2.5">
            <Checkbox
              id="login-remember-me"
              label="Remember this device"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              disabled={isLoading}
            />

            <button
              type="button"
              id="btn-forgot-password-link"
              onClick={onForgotPassword}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            id="btn-submit-login"
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Elysium
          </Button>
        </div>
      </form>

      {/* Social Providers */}
      <Divider label="or sign in with" />
      <SocialAuthButtons onSocialLogin={handleSocialLogin} isLoading={isLoading} />

      {/* Switch to Sign Up */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Don&apos;t have an account yet?{' '}
        <button
          type="button"
          id="btn-switch-to-signup"
          onClick={onSwitchToSignUp}
          className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4 cursor-pointer ml-1 transition"
        >
          Create user account
        </button>
      </div>
    </div>
  );
};