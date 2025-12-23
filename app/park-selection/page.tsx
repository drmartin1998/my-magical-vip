"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";import { Home, Calendar, HelpCircle, Info } from "lucide-react";
interface DayParks {
  [dateKey: string]: string[];
}

const DISNEY_PARKS = [
  { id: "magic-kingdom", name: "Magic Kingdom" },
  { id: "epcot", name: "EPCOT" },
  { id: "hollywood-studios", name: "Hollywood Studios" },
  { id: "animal-kingdom", name: "Animal Kingdom" },
];

function ParkSelectionContent(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dayParks, setDayParks] = useState<DayParks>({});
  const [packageId, setPackageId] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse dates from URL
    const datesParam = searchParams.get("dates");
    const pkgId = searchParams.get("packageId");
    const prodType = searchParams.get("productType");
    
    if (!datesParam || !pkgId) {
      router.push("/");
      return;
    }

    setPackageId(pkgId);
    setProductType(prodType || "");
    
    try {
      const dates = JSON.parse(decodeURIComponent(datesParam)) as string[];
      const parsedDates = dates.map((d) => new Date(d));
      setSelectedDates(parsedDates);
      
      // Initialize empty selections for each day
      const initial: DayParks = {};
      parsedDates.forEach((date) => {
        initial[date.toISOString().split("T")[0]] = [];
      });
      setDayParks(initial);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing dates:", error);
      router.push("/");
    }
  }, [searchParams, router]);

  const togglePark = (dateKey: string, parkId: string): void => {
    setDayParks((prev) => {
      const currentParks = prev[dateKey] || [];
      
      if (currentParks.includes(parkId)) {
        // Remove park
        return {
          ...prev,
          [dateKey]: currentParks.filter((id) => id !== parkId),
        };
      } else if (currentParks.length < 2) {
        // Add park (max 2 per day)
        return {
          ...prev,
          [dateKey]: [...currentParks, parkId],
        };
      }
      
      return prev;
    });
  };

  const handleConfirm = (): void => {
    // Check if all days have at least 1 park selected
    const allDaysHaveParks = selectedDates.every((date) => {
      const dateKey = date.toISOString().split("T")[0];
      return (dayParks[dateKey] || []).length > 0;
    });

    if (!allDaysHaveParks) {
      alert("Please select at least one park for each day");
      return;
    }

    // Navigate to confirmation page with all data
    const datesParam = encodeURIComponent(JSON.stringify(selectedDates.map(d => d.toISOString())));
    const parksParam = encodeURIComponent(JSON.stringify(dayParks));
    router.push(`/booking-confirmation?dates=${datesParam}&parks=${parksParam}&packageId=${packageId}&productType=${encodeURIComponent(productType)}`);
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
      {/* Navigation Bar */}
      <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
        <div className="flex items-center justify-between">
          <a href="/" className="font-bold text-lg text-black hover:text-gray-700 transition-colors">
            My Magical VIP
          </a>
          <ul className="flex gap-6 text-sm font-bold">
            <li>
              <a href="/" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <Home size={16} />
                Home
              </a>
            </li>
            <li>
              <a href="/typical-days" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <Calendar size={16} />
                Typical Days
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <HelpCircle size={16} />
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <Info size={16} />
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            Select Your Parks
          </h1>
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
            <li className="text-gray-700 font-medium">Park Selection</li>
          </ol>
        </div>
      </nav>

      {/* Park Selection Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Instructions */}
          <div className="mb-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 relative overflow-hidden">
            <Image
              src="/magic-wand.png"
              alt=""
              width={60}
              height={60}
              className="absolute top-4 right-4 opacity-20 rotate-12"
            />
            <p className="text-lg text-gray-800 mb-4">
              Select which park you would like VIP services for each day of your trip.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Limit two parks per day</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>For multiple parks on the same day a park-hopper is required with your Disney reservation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Limit 10 guests per party</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">{selectedDates.map((date) => {
              const dateKey = date.toISOString().split("T")[0];
              const selectedParks = dayParks[dateKey] || [];
              
              return (
                <div
                  key={dateKey}
                  className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-8 border-l-4 border-emerald-500 shadow-md"
                >
                  <h2 className="text-3xl font-bold text-blue-900 mb-4">
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h2>
                  
                  <p className="text-gray-700 mb-6">
                    {selectedParks.length === 0 && "Select at least 1 park for this day"}
                    {selectedParks.length === 1 && "1 park selected - you can add 1 more"}
                    {selectedParks.length === 2 && "2 parks selected (maximum reached)"}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DISNEY_PARKS.map((park) => {
                      const isSelected = selectedParks.includes(park.id);
                      const isDisabled = !isSelected && selectedParks.length >= 2;
                      
                      return (
                        <button
                          key={park.id}
                          onClick={() => togglePark(dateKey, park.id)}
                          disabled={isDisabled}
                          className={`p-6 rounded-lg font-bold text-lg transition-all ${
                            isSelected
                              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                              : isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-blue-900 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md"
                          }`}
                        >
                          {isSelected && "✓ "}
                          {park.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-8 py-4 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors text-lg"
            >
              ← Back
            </button>
            <button
              onClick={handleConfirm}
              className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-md text-lg"
            >
              Confirm Parks →
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
                  <a href="#" className="hover:text-amber-300 transition-colors">
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

export default function ParkSelectionPage(): ReactNode {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <ParkSelectionContent />
    </Suspense>
  );
}
