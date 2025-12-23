"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import { Home, Calendar, HelpCircle, Info } from "lucide-react";

interface DayParks {
  [dateKey: string]: string[];
}

const DISNEY_PARKS: { [key: string]: string } = {
  "magic-kingdom": "Magic Kingdom",
  "epcot": "EPCOT",
  "hollywood-studios": "Hollywood Studios",
  "animal-kingdom": "Animal Kingdom",
};

function BookingConfirmationContent(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dayParks, setDayParks] = useState<DayParks>({});
  const [packageId, setPackageId] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const datesParam = searchParams.get("dates");
    const parksParam = searchParams.get("parks");
    const pkgId = searchParams.get("packageId");
    const prodType = searchParams.get("productType");

    if (!datesParam || !parksParam || !pkgId) {
      router.push("/");
      return;
    }

    setPackageId(pkgId);
    setProductType(prodType || "");

    try {
      const dates = JSON.parse(decodeURIComponent(datesParam)) as string[];
      const parks = JSON.parse(decodeURIComponent(parksParam)) as DayParks;
      
      // Parse dates as local dates to avoid timezone issues
      const parsedDates = dates.map((d) => {
        let year: number, month: number, day: number;
        
        // Handle both "YYYY-MM-DD" and ISO date string formats
        if (d.includes("T")) {
          // ISO format: "2026-01-23T06:00:00.000Z"
          const isoDate = new Date(d);
          year = isoDate.getFullYear();
          month = isoDate.getMonth();
          day = isoDate.getDate();
        } else {
          // Simple format: "YYYY-MM-DD"
          [year, month, day] = d.split("-").map(Number);
          month = month - 1; // Convert to 0-indexed
        }
        
        const date = new Date(year, month, day);
        
        // Validate the date
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${d}`);
        }
        
        return date;
      });
      setSelectedDates(parsedDates);
      setDayParks(parks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing data:", error);
      router.push("/");
    }
  }, [searchParams, router]);

  const handleConfirm = async (): Promise<void> => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions to continue");
      return;
    }

    try {
      // Format dates as YYYY-MM-DD strings for storage and API
      const formatDateKey = (date: Date): string => {
        // Validate date
        if (isNaN(date.getTime())) {
          console.error("Invalid date object:", date);
          return "";
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Store all booking information
      sessionStorage.setItem("parkSelections", JSON.stringify(dayParks));
      sessionStorage.setItem("selectedDates", JSON.stringify(selectedDates.map(formatDateKey)));
      sessionStorage.setItem("agreedToTerms", "true");

      // Format booking dates: date,park1,park2|date,park1,park2
      const bookingDatesString = selectedDates
        .map((date) => {
          const dateKey = formatDateKey(date);
          const parks = dayParks[dateKey] || [];
          return `${dateKey},${parks.join(",")}`;
        })
        .join("|");

      // Generate unique line item ID
      const lineItemID = crypto.randomUUID();

      // Create cart with the packageId (which is now the variant ID)
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: [
            {
              merchandiseId: packageId,
              quantity: 1,
              attributes: [
                {
                  key: "bookingDates",
                  value: bookingDatesString,
                },
                {
                  key: "lineItemID",
                  value: lineItemID,
                },
                {
                  key: "productType",
                  value: productType,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create cart");
      }

      const cart = await response.json();

      // Redirect to checkout URL
      if (cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating cart:", error);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <GlobalNav />

      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            Confirm Your Booking
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto" style={{ textShadow: '2px 2px 2px #333333' }}>
            Review your park selections and agree to our terms
          </p>
        </div>
      </section>

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
            <li>
              <span className="text-gray-500">Park Selection</span>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">Confirmation</li>
          </ol>
        </div>
      </nav>

      {/* Confirmation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Your Park Selections</h2>
            
            <div className="space-y-6">
              {selectedDates.map((date, index) => {
                // Format date as YYYY-MM-DD to match dayParks keys
                // Validate date
                if (isNaN(date.getTime())) {
                  console.error("Invalid date in render:", date);
                  return null;
                }
                
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const dateKey = `${year}-${month}-${day}`;
                const selectedParks = dayParks[dateKey] || [];
                
                return (
                  <div
                    key={dateKey}
                    className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-6 border-l-4 border-emerald-500 shadow-md"
                  >
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {selectedParks.map((parkId) => (
                        <div
                          key={parkId}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow"
                        >
                          {DISNEY_PARKS[parkId]}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terms and Conditions Agreement */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Terms and Conditions</h3>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                I have read and agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline font-semibold"
                >
                  Terms and Conditions
                </a>
                {" "}of My Magical VIP
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-8 py-4 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors text-lg"
            >
              ← Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={!agreedToTerms}
              className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-emerald-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                My Magical VIP
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/" className="hover:text-amber-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/typical-days"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Typical Days
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-amber-300 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-amber-300 transition-colors">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">Contact</h3>
              <a
                href="mailto:info@mymagicalvip.com"
                className="text-sm text-gray-300 hover:text-amber-300 transition-colors"
              >
                info@mymagicalvip.com
              </a>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                Follow Us
              </h3>
              <a
                href="https://www.facebook.com/My-Magical-VIP-102990822543949"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-amber-300 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="border-t border-purple-700 pt-8">
            <p className="text-sm text-gray-400 mb-4">
              Copyright ©2025 My Magical VIP
            </p>
            <p className="text-xs text-gray-500">
              My Magical VIP is a private company in no way owned by or affiliated
              with the Walt Disney Company, Universal, Comcast or any of their
              parent or subsidiary institutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function BookingConfirmationPage(): ReactNode {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  );
}
