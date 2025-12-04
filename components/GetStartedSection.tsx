"use client";

import { useState, type ReactNode } from "react";
import TripDateModal from "./TripDateModal";

interface GetStartedSectionProps {
  children?: ReactNode;
}

export default function GetStartedSection({
  children,
}: GetStartedSectionProps): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ start: string; end: string } | null>(null);

  const handleSelectDates = (startDate: string, endDate: string): void => {
    setSelectedDates({ start: startDate, end: endDate });
    // TODO: Handle selected dates - could store in state, redirect, or show next step
    console.log("Selected dates:", startDate, endDate);
  };

  return (
    <>
      <div className="mt-8">
        <button
          onClick={(): void => setIsModalOpen(true)}
          className="inline-block text-white font-bold py-3 px-8 rounded-full shadow-lg green-button hover:shadow-xl transition-shadow"
          style={{ textShadow: "2px 2px 2px #333333" }}
        >
          Get Started
        </button>
        {selectedDates && (
          <p className="mt-4 text-sm text-gray-600">
            Selected dates: {selectedDates.start} to {selectedDates.end}
          </p>
        )}
      </div>

      <TripDateModal
        isOpen={isModalOpen}
        onClose={(): void => setIsModalOpen(false)}
        onSelectDates={handleSelectDates}
      />

      {children}
    </>
  );
}
