'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    User as UserIcon,
    Mail,
    Lock,
    Trash2,
    Save,
    ShieldCheck,
    Calendar,
    Key,
    ArrowLeft,
    LogOut
} from 'lucide-react';

import { useUpdateUserMutation, useDeleteUserMutation } from '@/lib/useUser';
import { AUTH_STORAGE_KEY, notifyAuthChange } from '@/lib/auth';
import { UpdateUserDTO, IUser } from '@/interfaces/UserInterface';

export default function UserSettingsPage() {
    const router = useRouter();

    // Hooks الـ Mutations
    const updateUserMutation = useUpdateUserMutation();
    const deleteUserMutation = useDeleteUserMutation();

    // حالة المستخدم الحالية
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    // حالات الإدخال للتعديل
    const [formData, setFormData] = useState<UpdateUserDTO>({
        name: '',
        email: '',
        password: '',
    });

    // حالات الرسائل والتنبيهات
    const [statusMessage, setStatusMessage] = useState<{
        type: 'error' | 'success';
        text: string;
    } | null>(null);

    // جلب بيانات المستخدم الممتدة من localStorage عند التحميل
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
            if (savedUser) {
                const parsed: IUser = JSON.parse(savedUser);
                setUser(parsed);
                setFormData({
                    name: parsed.name || '',
                    email: parsed.email || '',
                    password: '',
                });
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoadingUser(false);
        }
    }, [router]);

    // دالة التعامل مع التعديل (UPDATE)
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null);

        if (!user?.id) return;

        // تجهيز البيانات المراد تعديلها فقط
        const updatePayload: UpdateUserDTO = {};
        if (formData.name && formData.name.trim() !== user.name) {
            updatePayload.name = formData.name.trim();
        }
        if (formData.email && formData.email.trim() !== user.email) {
            updatePayload.email = formData.email.trim().toLowerCase();
        }
        if (formData.password && formData.password.trim().length > 0) {
            updatePayload.password = formData.password.trim();
        }

        if (Object.keys(updatePayload).length === 0) {
            setStatusMessage({
                type: 'error',
                text: 'No changes detected to update.',
            });
            return;
        }

        updateUserMutation.mutate(
            { id: user.id, data: updatePayload },
            {
                onSuccess: (response) => {
                    // تحديث بيانات المستخدم المحلية مع حماية Optional Chaining
                    const updatedUserData: IUser = {
                        ...user,
                        name: response.data?.name ?? formData.name ?? user.name,
                        email: response.data?.email ?? formData.email ?? user.email,
                    };

                    setUser(updatedUserData);
                    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUserData));
                    notifyAuthChange();

                    // إعادة تفريغ حقل كلمة المرور
                    setFormData((prev) => ({ ...prev, password: '' }));

                    setStatusMessage({
                        type: 'success',
                        text: 'Profile updated successfully!',
                    });
                },
                onError: (err: any) => {
                    // استخراج رسالة الخطأ القادمة من السيرفر بمرونة
                    const errorMessage =
                        err?.response?.data?.message || err?.message || 'Failed to update profile settings.';
                    setStatusMessage({
                        type: 'error',
                        text: errorMessage,
                    });
                },
            }
        );
    };

    const handleLogout = () => {
        localStorage.clear();
        notifyAuthChange();
        router.push('/');
    };

    // دالة التعامل مع الحذف (DELETE)
    const handleDeleteAccount = () => {
        if (!user?.id) return;

        const confirmDelete = window.confirm(
            'Are you sure you want to delete your account? This action is permanent and cannot be undone.'
        );

        if (confirmDelete) {
            deleteUserMutation.mutate(user.id, {
                onSuccess: () => {
                    alert('Your account has been deleted successfully.');
                    handleLogout();
                },
                onError: (err: any) => {
                    // استخراج رسالة الخطأ القادمة من السيرفر بمرونة
                    const errorMessage =
                        err?.response?.data?.message || err?.message || 'Failed to delete account.';
                    setStatusMessage({
                        type: 'error',
                        text: errorMessage,
                    });
                },
            });
        }
    };

    if (isLoadingUser) {
        return (
            <div className="min-h-screen flex items-center justify-center text-cyan-400">
                Loading user data...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen galaxy-bg flex items-center justify-center px-4 text-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">User Settings &amp; Profile</h1>
                    <p className="mt-3 text-slate-400">No profile data is available yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen max-h-screen py-9 px-4 flex flex-col items-center justify-center bg-transparent overflow-hidden">
            <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">

                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/galaxy1')}
                            className="p-2 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 transition cursor-pointer"
                            title="Back to Galaxy"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                                User Settings & Profile
                            </h1>
                            <p className="text-xs text-slate-400">Manage your account information and preferences</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>

                {/* Status Alerts */}
                {statusMessage && (
                    <div
                        className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${statusMessage.type === 'error'
                            ? 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                            : 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>{statusMessage.text}</span>
                    </div>
                )}

                {/* Read-Only Account Overview Data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                        <span className="text-slate-500 flex items-center gap-1.5 mb-1">
                            <Key className="w-3.5 h-3.5 text-cyan-400" /> User ID
                        </span>
                        <p className="font-mono text-slate-300 break-all">{user.id}</p>
                    </div>
                    <div>
                        <span className="text-slate-500 flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Account Created
                        </span>
                        <p className="text-slate-300">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Update Form */}
                <form onSubmit={handleUpdate} className="space-y-5">
                    <h2 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                        Edit Details
                    </h2>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-300 font-medium flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-cyan-400" /> Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-slate-100 text-xs rounded-xl p-3 outline-none transition"
                            disabled={updateUserMutation.isPending}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-300 font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-cyan-400" /> Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Your email address"
                            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-slate-100 text-xs rounded-xl p-3 outline-none transition"
                            disabled={updateUserMutation.isPending}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-300 font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4 text-cyan-400" /> New Password (Leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 text-slate-100 text-xs rounded-xl p-3 outline-none transition"
                            disabled={updateUserMutation.isPending}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={updateUserMutation.isPending}
                        className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-slate-950 font-semibold text-xs py-3 rounded-xl transition cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        {updateUserMutation.isPending ? 'Saving Changes...' : 'Save Profile Changes'}
                    </button>
                </form>

                {/* Danger Zone: Delete Account */}
                <div className="pt-6 border-t border-slate-800 space-y-3">
                    <h2 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                        Danger Zone
                    </h2>
                    <p className="text-xs text-slate-400">
                        Deleting your account removes all associated profile data permanently.
                    </p>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={deleteUserMutation.isPending}
                        className="w-full flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 font-semibold text-xs py-3 rounded-xl transition cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                        {deleteUserMutation.isPending ? 'Deleting Account...' : 'Delete My Account'}
                    </button>
                </div>

            </div>
        </div>
    );
}