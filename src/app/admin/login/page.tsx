"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [initialChecking, setInitialChecking] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  // Check if session already exists
  React.useEffect(() => {
    let isMounted = true;
    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && isMounted) {
          router.replace("/admin/katalog");
          return;
        }
      } catch (err) {
        console.error("Gagal memeriksa sesi:", err);
      } finally {
        if (isMounted) setInitialChecking(false);
      }
    }
    checkSession();
    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const trimmedEmail = email.trim();
      if (!trimmedEmail || !password) {
        setErrorMessage("Email dan password wajib diisi.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMessage("Email atau password yang Anda masukkan salah.");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMessage("Email akun ini belum dikonfirmasi di Supabase.");
        } else {
          setErrorMessage(error.message || "Gagal masuk. Silakan coba lagi.");
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push("/admin/katalog");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Terjadi kesalahan jaringan atau server. Silakan coba lagi.");
      setLoading(false);
    }
  };

  if (initialChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-medium font-sans">Memeriksa sesi admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 relative selection:bg-amber-400 selection:text-slate-900 font-sans">
      {/* Back to Home navigation */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Website Nap's Vendor
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-slate-100">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 font-black text-2xl shadow-sm mb-4">
            N
            <span
              className="absolute -top-1 -right-1 flex h-3.5 w-3.5"
              aria-hidden="true"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Portal Khusus Admin
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Masuk ke Dashboard
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Kelola katalog produk, update bahan, dan foto produk Nap's Vendor.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email field */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Administrator
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@napsvendor.com"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                tabIndex={-1}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi Kredensial...</span>
              </>
            ) : (
              <span>Masuk ke Dashboard</span>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Autentikasi Terenkripsi Supabase Auth</span>
        </div>
      </div>
    </div>
  );
}
