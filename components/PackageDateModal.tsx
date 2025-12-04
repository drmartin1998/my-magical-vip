"use client";

import { useState, type ReactNode } from "react";
import CalendarDatePicker from "./CalendarDatePicker";

interface PackageDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  numberOfDays: number;
  onDatesSelected: (dates: Date[]) => void;
}

export default function PackageDateModal({
  isOpen,
  onClose,
  numberOfDays,
  onDatesSelected,
}: PackageDateModalProps): ReactNode {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <CalendarDatePicker
        numberOfDays={numberOfDays}
        onSelectDates={(dates) => {
          onDatesSelected(dates);
          onClose();
        }}
        onCancel={onClose}
      />
    </div>
  );
}
