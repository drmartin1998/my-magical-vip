"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

const PackageDateModal = dynamic(() => import("@/components/PackageDateModal"), { ssr: false });

interface PackageOption {
  id: string;
  name: string;
  days: string;
  price: string;
  originalPrice?: string;
  description: string;
  image?: {
    url: string;
    altText: string;
  };
  maxDays?: number;
  variants?: Array<{
    id: string;
  }>;
}

interface PackagesGridProps {
  packages: PackageOption[];
}

export default function PackagesGrid({ packages }: PackagesGridProps): ReactNode {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Record<string, Date[]>>({});

  const getNumberOfDays = (pkg: PackageOption): number => {
    if (typeof pkg.maxDays === "number" && !Number.isNaN(pkg.maxDays)) {
      return pkg.maxDays;
    }
    const match = pkg.days.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  };

  const handleDatesSelected = (packageId: string, dates: Date[]): void => {
    setSelectedDates((prev) => ({ ...prev, [packageId]: dates }));
    
    // Get the variant ID if available, otherwise use the product ID
    const pkg = packages.find(p => p.id === packageId);
    const variantId = pkg?.variants?.[0]?.id || packageId;
    
    // Navigate to park selection page with dates and variantId
    const datesParam = encodeURIComponent(JSON.stringify(dates.map(d => d.toISOString())));
    router.push(`/park-selection?dates=${datesParam}&packageId=${variantId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg, idx) => {
        const numberOfDays = getNumberOfDays(pkg);
        const selected = selectedDates[pkg.id];
        return (
          <div
            key={idx}
            className="bg-white border-2 border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden hover:border-blue-400"
          >
            {pkg.image && (
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={pkg.image.url}
                  alt={pkg.image.altText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-emerald-600 font-semibold mb-4">
                {pkg.days}
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {pkg.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  {pkg.price}
                </span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {pkg.originalPrice}
                  </span>
                )}
              </div>

              <button
                className="w-full mb-2 py-2 px-4 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700 transition-colors"
                onClick={(): void => setModalOpen(pkg.id)}
              >
                Get Started
              </button>
              {selected && (
                <div className="text-xs text-gray-600 mt-1">
                  Selected: {selected.length} day{selected.length > 1 ? "s" : ""}
                  {selected.length <= 3 && (
                    <>
                      {" - "}
                      {selected.map((d) => d.toLocaleDateString()).join(", ")}
                    </>
                  )}
                </div>
              )}
              <PackageDateModal
                isOpen={modalOpen === pkg.id}
                onClose={(): void => setModalOpen(null)}
                numberOfDays={numberOfDays}
                onDatesSelected={(dates): void => {
                  handleDatesSelected(pkg.id, dates);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
