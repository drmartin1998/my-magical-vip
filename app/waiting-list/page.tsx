"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

interface DayPark {
  date: string;
  park: string;
}

const DISNEY_PARKS = [
  { id: "magic-kingdom", name: "Magic Kingdom" },
  { id: "epcot", name: "EPCOT" },
  { id: "hollywood-studios", name: "Hollywood Studios" },
  { id: "animal-kingdom", name: "Animal Kingdom" },
];

export default function WaitingListPage(): ReactNode {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [dayParks, setDayParks] = useState<DayPark[]>([{ date: "", park: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    days: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAddDay = (): void => {
    setDayParks([...dayParks, { date: "", park: "" }]);
  };

  const handleRemoveDay = (index: number): void => {
    if (dayParks.length > 1) {
      const newDayParks = dayParks.filter((_, i) => i !== index);
      setDayParks(newDayParks);
    }
  };

  const handleDayChange = (index: number, field: "date" | "park", value: string): void => {
    const newDayParks = [...dayParks];
    newDayParks[index][field] = value;
    setDayParks(newDayParks);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setFieldErrors({ name: "", email: "", days: "" });

    // Validation
    let hasError = false;
    const errors = { name: "", email: "", days: "" };

    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
      hasError = true;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "Please enter a valid email address";
      hasError = true;
    }

    const invalidDays = dayParks.filter((dp) => !dp.date || !dp.park);
    if (invalidDays.length > 0) {
      errors.days = "Please select both date and park for all days";
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          days: dayParks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit waiting list entry");
      }

      setSubmitSuccess(true);
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting waiting list:", error);
      setSubmitError("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4 text-green-600 text-6xl">✓</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            You&apos;ve been added to the waiting list. We&apos;ll notify you when dates become available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <GlobalNav />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">Waiting List</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Join Our Waiting List
          </h1>
          <p className="text-gray-600 mb-8">
            The dates you selected are currently unavailable. Enter your information below and we&apos;ll notify you when they become available.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 ${
                    fieldErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your full name"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" data-testid="name-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 ${
                    fieldErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" data-testid="email-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Days and Parks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Days & Parks <span className="text-red-500">*</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddDay}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  + Add Day
                </button>
              </div>

              {dayParks.map((dayPark, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={dayPark.date}
                      onChange={(e) => handleDayChange(index, "date", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      Park
                    </label>
                    <select
                      value={dayPark.park}
                      onChange={(e) => handleDayChange(index, "park", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select a park</option>
                      {DISNEY_PARKS.map((park) => (
                        <option key={park.id} value={park.id}>
                          {park.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {dayParks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(index)}
                      className="mt-7 text-red-600 hover:text-red-800 p-2"
                      aria-label="Remove day"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {fieldErrors.days && (
                <p className="mt-2 text-sm text-red-600" data-testid="days-error">
                  {fieldErrors.days}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" data-testid="submit-error">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Join Waiting List"}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>We&apos;ll monitor availability for your selected dates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You&apos;ll receive an email notification when spots open up</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Your spot on the waiting list is saved - no payment required now</span>
            </li>
          </ul>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}
