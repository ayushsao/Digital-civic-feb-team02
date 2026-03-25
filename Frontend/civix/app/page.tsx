"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import Link from "next/link";
import {
  Users, FileText, MessageSquare, TrendingUp, ArrowRight,
  CheckCircle, Shield, Vote, ChevronDown, Sparkles,
  Building2, Globe, Award
} from "lucide-react";

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 text-slate-900 dark:bg-none dark:bg-gray-900 dark:text-white">
      <Navbar />

      {/* Hero Section - Premium Landing */}
      <section className="relative overflow-hidden -mt-16 pt-30 pb-18 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-slate-100/50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.12)_1px,transparent_0)] bg-size-[24px_24px] dark:opacity-15" />
        <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-500/12" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-full mb-7 shadow-sm">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Digital Civic Engagement Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] mb-6 text-slate-900 dark:text-white">
                Make Civic Decisions
                <span className="block bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                  Visible & Actionable
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-9 leading-relaxed">
                Connect with your community, participate in governance, and turn local concerns into measurable public outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-[0_14px_30px_-14px_rgba(79,70,229,0.7)] transition-all duration-300"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold shadow-sm hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-[0_14px_30px_-14px_rgba(79,70,229,0.7)] transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-slate-200/90 dark:border-gray-700 shadow-sm max-w-2xl">
                {[
                  { value: "2.4K+", label: "Citizens" },
                  { value: "1.2K+", label: "Petitions" },
                  { value: "890+", label: "Responses" },
                  { value: "67%", label: "Success" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white dark:bg-gray-800/70 border border-slate-200 dark:border-gray-700 px-3 py-3 text-center">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div
                className="relative rounded-4xl border border-slate-300/70 dark:border-gray-700 bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-600 p-3 shadow-[0_35px_70px_-35px_rgba(16,24,40,0.5)]"
                style={{ transform: `translateY(${Math.min(scrollY * 0.03, 16)}px)` }}
              >
                <div className="rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm">
                  <div className="p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                        <Sparkles className="h-3.5 w-3.5" />
                        Live Civic Dashboard
                      </div>
                      <span className="text-xs text-emerald-100">Updated now</span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80"
                      alt="Citizen engagement"
                      className="w-full h-90 object-cover rounded-2xl"
                    />
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/90 px-4 py-3 border border-white/60">
                        <p className="text-xs text-slate-600">Active Poll</p>
                        <p className="text-sm font-semibold text-slate-900">Transit Expansion Plan</p>
                      </div>
                      <div className="rounded-xl bg-white/90 px-4 py-3 border border-white/60">
                        <p className="text-xs text-slate-600">Public Sentiment</p>
                        <p className="text-sm font-semibold text-emerald-700">Positive · 74%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <ChevronDown className="h-7 w-7 text-slate-500 dark:text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-white dark:bg-gray-900 border-y border-slate-200/80 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2,400+", label: "Active Citizens", icon: Users, color: "from-indigo-500 to-blue-500" },
              { value: "1,200+", label: "Petitions Created", icon: FileText, color: "from-emerald-500 to-teal-500" },
              { value: "890+", label: "Official Responses", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
              { value: "67%", label: "Success Rate", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 text-center shadow-[0_8px_28px_-18px_rgba(15,23,42,0.28)] hover:bg-white dark:hover:bg-gray-800 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-[0_16px_36px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${stat.color} mb-4 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-slate-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-24 bg-linear-to-b from-slate-50/60 to-white dark:bg-none dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-400 mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful tools to engage with your community and make a real impact
            </p>
          </div>

          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 mb-6 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Create & Sign Petitions</h3>
              <p className="text-slate-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                Start petitions for causes you believe in or support existing ones. Track signatures in real-time and see your community come together for change.
              </p>
              <ul className="space-y-3">
                {["Easy petition creation", "Real-time signature tracking", "Share with your network"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_60px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-200 dark:ring-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-100 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 shadow-[0_20px_35px_-20px_rgba(15,23,42,0.45)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1,234</p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Signatures Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_60px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-200 dark:ring-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80"
                  alt="Voting"
                  className="w-full h-100 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 shadow-[0_20px_35px_-20px_rgba(15,23,42,0.45)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Vote className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">89%</p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Participation Rate</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 mb-6 shadow-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Vote on Community Polls</h3>
              <p className="text-slate-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                Participate in polls that shape your community. Your vote matters in making collective decisions that affect everyone.
              </p>
              <ul className="space-y-3">
                {["Location-based polls", "Real-time results", "Anonymous voting"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 mb-6 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get Official Responses</h3>
              <p className="text-slate-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                Connect directly with local officials. Get transparent responses and track the progress of your petitions through the governance process.
              </p>
              <ul className="space-y-3">
                {["Direct official feedback", "Status tracking", "Transparent process"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_60px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-200 dark:ring-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80"
                  alt="Government building"
                  className="w-full h-100 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 shadow-[0_20px_35px_-20px_rgba(15,23,42,0.45)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">24h</p>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Avg Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-100/80 dark:bg-gray-800/50 border-y border-slate-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-sm tracking-[0.2em] uppercase font-semibold text-slate-500 dark:text-gray-400 mb-5">How It Works</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] text-slate-900 dark:text-white max-w-4xl mb-6">
              An AI that turns public meetings into
              <span className="block bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">public knowledge</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-4xl leading-relaxed">
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">Civix AI</span> listens to hours of government meetings, identifies key decisions,
              and delivers plain-language summaries so the information that matters is no longer buried.
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-200/90 dark:border-gray-700 bg-linear-to-br from-slate-100 via-white to-slate-100/70 dark:from-gray-800 dark:via-gray-800 dark:to-gray-850 shadow-[0_35px_75px_-45px_rgba(15,23,42,0.45)] p-6 md:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -left-24 -top-20 w-72 h-72 rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-500/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_auto_1fr] lg:items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Planning Committee Hearing", icon: Users },
                  { title: "City Council Session", icon: Vote },
                  { title: "Public Safety Briefing", icon: Shield },
                  { title: "School Board Session", icon: FileText },
                ].map((meeting, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/60 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <meeting.icon className="h-4 w-4 text-indigo-500 mt-0.5" />
                      <span className="w-2 h-2 rounded-full bg-rose-500 mt-1" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-gray-200 leading-snug">{meeting.title}</p>
                  </div>
                ))}
              </div>

              <div className="relative flex items-center justify-center">
                <div className="hidden lg:block absolute -left-14 w-14 h-px bg-linear-to-r from-indigo-300 to-indigo-500 dark:from-indigo-700 dark:to-indigo-400" />
                <div className="hidden lg:block absolute right-full mr-10 mt-8 w-10 h-px bg-linear-to-r from-emerald-300 to-emerald-500 dark:from-emerald-800 dark:to-emerald-500" />
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-white/95 dark:bg-gray-900/80 px-5 py-2.5 shadow-md text-indigo-700 dark:text-indigo-300 font-semibold">
                  <Sparkles className="h-4 w-4" />
                  AI listens and delivers
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/60 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="font-semibold text-slate-800 dark:text-gray-100">Approval of Public Transit Budget</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">Category: Finance & Infrastructure</p>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                  The board voted to approve funding for route expansion, with quarterly reporting on adoption, costs, and rider satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950/88 via-purple-900/82 to-violet-900/86" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_0)] bg-size-[22px_22px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-4xl border border-white/20 bg-white/8 backdrop-blur-md shadow-[0_35px_80px_-40px_rgba(30,27,75,0.85)] overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

            <div className="relative px-6 py-16 sm:px-10 lg:px-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-indigo-200" />
                <span className="text-sm font-medium text-indigo-100">Join the Civic Movement</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-indigo-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of citizens who are already shaping the future of their communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold shadow-[0_18px_35px_-18px_rgba(255,255,255,0.9)] hover:bg-indigo-50 transition-all duration-300"
                >
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/petitions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/12 backdrop-blur-sm hover:bg-white/18 text-white border border-white/25 rounded-xl font-semibold transition-all duration-300"
                >
                  Browse Petitions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "Secure & Private" },
              { icon: Globe, label: "Location-Based" },
              { icon: Building2, label: "Government Verified" },
              { icon: Award, label: "Trusted Platform" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <item.icon className="h-8 w-8 text-slate-500 dark:text-gray-500" />
                <span className="text-slate-700 dark:text-gray-400 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100/80 dark:bg-gray-950 border-t border-slate-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size="sm" showText={true} className="dark:[&>span]:text-white!" />
            </div>
            <p className="text-slate-600 dark:text-gray-500 mb-4">
              Digital civic engagement platform for modern communities
            </p>
            <p className="text-sm text-slate-700 dark:text-gray-600">
              © 2026 Civix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}
