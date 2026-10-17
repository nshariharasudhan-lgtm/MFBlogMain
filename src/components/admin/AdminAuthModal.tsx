import React, { useState } from "react";
import { Lock, Mail, Key, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AdminUser } from "../../types";
import { loginAdmin, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "../../lib/storage";

interface AdminAuthModalProps {
  onSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export function AdminAuthModal({ onSuccess, onCancel }: AdminAuthModalProps) {
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setError(res.message || "Invalid credentials.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDefaults = () => {
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASSWORD);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF9F5] border border-[#E0DDD3] rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative space-y-5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="font-serif-editorial text-2xl text-stone-900 font-semibold">
            Admin Desk Authentication
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            Secure access for mutual fund research publishing and dashboard management.
          </p>
        </div>

        {/* Credentials Reminder Card */}
        <div className="p-3 bg-amber-50/90 border border-amber-200/90 text-stone-800 rounded-xl text-xs space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-amber-900 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-700" />
              <span>Administrator Login Details</span>
            </span>
            <button
              type="button"
              onClick={handleFillDefaults}
              className="text-[11px] text-amber-800 underline font-medium hover:text-amber-950 cursor-pointer"
            >
              Fill Default
            </button>
          </div>
          <div className="font-mono-data text-[11px] text-stone-700 space-y-0.5">
            <div>Email: <strong className="text-stone-900">{DEFAULT_ADMIN_EMAIL}</strong></div>
            <div>Password: <strong className="text-stone-900">{DEFAULT_ADMIN_PASSWORD}</strong></div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 font-mono-data">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter administrator email"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-900 font-mono-data"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 font-mono-data">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-900 font-mono-data"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-stone-500 hover:text-stone-800 py-2 px-3 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#1A1A1A] hover:bg-black text-white text-xs px-5 py-2.5 rounded-xl font-medium flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
