"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, MapPin, Tag, Send } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { petitionApi, ApiError } from "@/lib/api";

const CATEGORIES = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "environment", label: "Environment" },
  { value: "transportation", label: "Transportation" },
  { value: "public-safety", label: "Public Safety" },
  { value: "housing", label: "Housing" },
  { value: "other", label: "Other" },
];

export default function CreatePetitionForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-fill location from logged-in user
  useEffect(() => {
    if (user?.location) {
      setLocation(user.location);
    }
  }, [user]);

  // Redirect if user is not a citizen
  useEffect(() => {
    if (!authLoading && user && user.role !== "citizen") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Client-side validation
  const validateForm = () => {
    if (!title.trim()) {
      setError("Please provide a petition title");
      return false;
    }
    if (title.length < 10) {
      setError("Title must be at least 10 characters long");
      return false;
    }
    if (title.length > 200) {
      setError("Title cannot exceed 200 characters");
      return false;
    }
    if (!description.trim()) {
      setError("Please provide a petition description");
      return false;
    }
    if (description.length < 50) {
      setError("Description must be at least 50 characters long");
      return false;
    }
    if (description.length > 2000) {
      setError("Description cannot exceed 2000 characters");
      return false;
    }
    if (!category) {
      setError("Please select a category");
      return false;
    }
    if (!location.trim()) {
      setError("Please provide a location");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await petitionApi.create({
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
      });

      if (response.success) {
        setSuccess(true);
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Only citizens can create petitions
  if (!user || user.role !== "citizen") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-6 inline-block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create a Petition</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Start a petition to bring attention to an issue in your community
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-300">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              <span>Petition created successfully! Redirecting to petition list...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FileText className="h-4 w-4" />
                Petition Title *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="Enter a clear and concise title (10-200 characters)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {title.length}/200 characters
                {title.length > 0 && title.length < 10 && (
                  <span className="text-red-500"> (minimum 10 characters)</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FileText className="h-4 w-4" />
                Description *
              </label>
              <textarea
                required
                rows={8}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="Describe the issue and what you want to achieve (50-2000 characters)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2000}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description.length}/2000 characters
                {description.length > 0 && description.length < 50 && (
                  <span className="text-red-500"> (minimum 50 characters)</span>
                )}
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Tag className="h-4 w-4" />
                Category *
              </label>
              <select
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                Location *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="City, State, or Region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Location is auto-filled from your profile but can be edited
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all ${
                  loading || success
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : success ? (
                  <>
                    <Send className="h-4 w-4" />
                    Created!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Create Petition
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading || success}
                className="h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
