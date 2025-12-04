"use client";

import { useState, type ReactNode } from "react";

interface CalendarDatePickerProps {
  numberOfDays: number;
  onSelectDates: (selectedDates: Date[]) => void;
  onCancel: () => void;
}

export default function CalendarDatePicker({
  numberOfDays,
  onSelectDates,
  onCancel,
}: CalendarDatePickerProps): ReactNode {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleDateClick = (day: number): void => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const dateKey = getDateKey(clickedDate);
    const newSelectedDates = new Set(selectedDates);

    if (newSelectedDates.has(dateKey)) {
      newSelectedDates.delete(dateKey);
    } else if (newSelectedDates.size < numberOfDays) {
      newSelectedDates.add(dateKey);
    }

    setSelectedDates(newSelectedDates);
  };

  const handleConfirm = (): void => {
    if (selectedDates.size === numberOfDays) {
      const dateArray = Array.from(selectedDates)
        .sort()
        .map((dateKey) => new Date(dateKey + "T00:00:00"));
      onSelectDates(dateArray);
    }
  };

  const previousMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isDateSelected = (day: number): boolean => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return selectedDates.has(getDateKey(date));
  };

  const isClickableDate = (day: number): boolean => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only allow dates today or in the future
    return date.getTime() >= today.getTime();
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const sortedSelectedDates = Array.from(selectedDates).sort();

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        Select Your Trip Dates
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Click to select {numberOfDays} day{numberOfDays > 1 ? "s" : ""} ({selectedDates.size}/{numberOfDays} selected)
      </p>

      {selectedDates.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <p className="text-sm font-semibold text-blue-900">Selected Dates:</p>
          <div className="text-sm text-gray-700 mt-1 max-h-24 overflow-y-auto">
            {sortedSelectedDates.map((dateKey) => (
              <div key={dateKey} className="flex justify-between items-center">
                <span>{new Date(dateKey + "T00:00:00").toLocaleDateString()}</span>
                <button
                  onClick={(): void => {
                    const newSet = new Set(selectedDates);
                    newSet.delete(dateKey);
                    setSelectedDates(newSet);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Previous month"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold text-gray-800">{monthName}</h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => (
            <div key={idx}>
              {day === null ? (
                <div className="h-8 w-8"></div>
              ) : (
                <button
                  onClick={(): void => {
                    if (isClickableDate(day)) {
                      handleDateClick(day);
                    }
                  }}
                  disabled={!isClickableDate(day) || (selectedDates.size >= numberOfDays && !isDateSelected(day))}
                  className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
                    !isClickableDate(day)
                      ? "text-gray-300 cursor-not-allowed"
                      : isDateSelected(day)
                      ? "bg-emerald-600 text-white"
                      : selectedDates.size >= numberOfDays
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={selectedDates.size !== numberOfDays}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
