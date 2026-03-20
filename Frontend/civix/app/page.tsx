"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Users, FileText, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Make Your Voice Heard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Connect with your community, participate in local governance, and create meaningful change through civic engagement.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition"
                >
                  Sign In
                </Link>
              </div>
            )}
            {user && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Your Platform for Change
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of citizens making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">2,400+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Citizens</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,200+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Petitions Created</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">890+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Official Responses</p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">67%</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Three simple steps to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-lg items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Account</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up to join your local community
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-lg items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Take Action</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create petitions or support existing ones
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-lg items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Make Impact</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track progress and see real change happen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size="sm" showText={true} className="[&>span]:!text-white" />
            </div>
            <p className="text-gray-400 mb-4">
              Digital civic engagement platform
            </p>
            <p className="text-sm text-gray-500">
              © 2026 Civix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
