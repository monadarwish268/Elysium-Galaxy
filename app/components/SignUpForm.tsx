import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, UserPlus } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/CheckBox';
import { Divider } from '@/components/Divider';
import { SocialAuthButtons } from '@/components/SocialAuthButtons';
import { PasswordStrengthMeter, calculatePasswordStrength } from '@/components/PasswordStrengthMeter';
import { User, SignUpFormData, FormErrors } from '@/types';
import { AUTH_STORAGE_KEY, notifyAuthChange } from '@/lib/auth';
import { useCreateUserMutation } from '@/lib/useUser';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
  onSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  isLoading: externalLoading = false,
}) => {
  const router = useRouter();
  const createUserMutation = useCreateUserMutation();

  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedPlanet: 'Calm',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // تم ترك الـ Validation كاملاً بجميع شروطه كما طلبتِ
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const strength = calculatePasswordStrength(formData.password);
      if (strength.score < 2) {
        newErrors.password = 'Please choose a stronger password';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the Terms and Privacy Policy to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // استدعاء الـ Backend الحقيقي وإنشاء المستخدم في قاعدة البيانات
    createUserMutation.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password.trim(),
      },
      {
        onSuccess: (response) => {
          const newUser: User = {
            id: response.data?.id || `user-${Date.now()}`,
            name: response.data?.name || formData.name.trim(),
            email: response.data?.email || formData.email.toLowerCase().trim(),
            emotionalPlanet: `${formData.selectedPlanet} Planet`,
            createdAt: new Date().toISOString(),
          };

          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
          notifyAuthChange();

          onSuccess(newUser);

          // 🚀 التوجيه التلقائي المباشر لصفحة galaxy1 عند إنشاء الحساب بنجاح
          router.push('/');
        },
        onError: (error: any) => {
          setErrors({
            general: error?.response?.data?.message || 'Failed to create user account. Please try again.',
          });
        },
      }
    );
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    const providerUser: User = {
      id: `${provider}-${Date.now()}`,
      name: provider === 'google' ? 'Sarah Jenkins' : 'Astro Coder',
      email: `new.${provider}@elysium.space`,
      emotionalPlanet: 'Calm Planet',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(providerUser));
    notifyAuthChange();

    onSuccess(providerUser);
    router.push('/');
  };

  const isLoading = createUserMutation.isPending || externalLoading;

  return (
    <div id="signup-form-wrapper" className="w-full">
      {errors.general && (
        <div
          id="signup-general-error"
          className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2"
        >
          <span>{errors.general}</span>
        </div>
      )}

      <form id="signup-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <Input
          id="signup-name"
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="Lyra Vance"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          error={errors.name}
          leadingIcon={<UserIcon className="w-4 h-4" />}
          disabled={isLoading}
        />

        {/* Email Address */}
        <Input
          id="signup-email"
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="lyra@elysium.space"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
          leadingIcon={<Mail className="w-4 h-4" />}
          disabled={isLoading}
        />

        {/* Password */}
        <div>
          <Input
            id="signup-password"
            label="Create Password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            leadingIcon={<Lock className="w-4 h-4" />}
            disabled={isLoading}
          />
          {/* Real-time strength meter */}
          <PasswordStrengthMeter password={formData.password} />
        </div>

        {/* Confirm Password */}
        <Input
          id="signup-confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
          }}
          error={errors.confirmPassword}
          leadingIcon={<Lock className="w-4 h-4" />}
          disabled={isLoading}
        />

        <div className="pt-2">
          <Checkbox
            id="signup-terms"
            checked={formData.agreeToTerms}
            onChange={(e) => {
              setFormData({ ...formData, agreeToTerms: e.target.checked });
              if (errors.agreeToTerms) setErrors({ ...errors, agreeToTerms: undefined });
            }}
            error={errors.agreeToTerms}
            disabled={isLoading}
            label={
              <span className="text-xs text-gray-400">
                I agree to the{' '}
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Elysium Galaxy Terms: Respect your emotional wellness and data privacy.');
                  }}
                  className="text-cyan-300 hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Elysium Galaxy Privacy Policy: Your emotional journey data is encrypted.');
                  }}
                  className="text-cyan-300 hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            id="btn-submit-signup"
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            rightIcon={<UserPlus className="w-4 h-4" />}
          >
            Create User Account
          </Button>
        </div>
      </form>

      {/* Social Registration */}
      <Divider label="or sign up with" />
      <SocialAuthButtons onSocialLogin={handleSocialSignUp} isLoading={isLoading} />

      {/* Switch to Login */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Already have a traveler profile?{' '}
        <button
          type="button"
          id="btn-switch-to-login"
          onClick={onSwitchToLogin}
          className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4 cursor-pointer ml-1 transition"
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};