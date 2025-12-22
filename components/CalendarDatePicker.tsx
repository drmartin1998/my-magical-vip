"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [blackoutDates, setBlackoutDates] = useState<Set<string>>(new Set());

  useEffect((): void => {
    const fetchBlackoutDates = async (): Promise<void> => {
      try {
        const response = await fetch("/api/blackout-dates");
        if (response.ok) {
          const data = (await response.json()) as { blackoutDates: string[] };
          setBlackoutDates(new Set(data.blackoutDates));
        }
      } catch (error) {
        console.error("Error fetching blackout dates:", error);
      }
    };

    fetchBlackoutDates();
  }, []);

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

    // Check if date is in past
    if (date.getTime() < today.getTime()) {
      return false;
    }

    // Check if date is more than 180 days out
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 180);
    if (date.getTime() > maxDate.getTime()) {
      return false;
    }

    // Check if date is blackout
    const dateKey = getDateKey(date);
    return !blackoutDates.has(dateKey);
  };

  const canGoToNextMonth = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 180);
    
    const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    return nextMonthDate.getTime() <= maxDate.getTime();
  };

  const canGoToPreviousMonth = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    return firstDayOfCurrentMonth.getTime() > today.getTime();
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
            disabled={!canGoToPreviousMonth()}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent text-xl font-bold"
            aria-label="Previous month"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold text-gray-800" data-testid="calendar-month">{monthName}</h3>
          <button
            onClick={nextMonth}
            disabled={!canGoToNextMonth()}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent text-xl font-bold"
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
                      ? "text-gray-300 cursor-not-allowed bg-red-100"
                      : isDateSelected(day)
                      ? "bg-emerald-600 text-white"
                      : selectedDates.size >= numberOfDays
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                  title={
                    !isClickableDate(day) && blackoutDates.has(getDateKey(new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )))
                      ? "Blackout date"
                      : undefined
                  }
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {blackoutDates.size > 0 && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded p-3">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Blacked out dates?</span> Can&apos;t find available dates?{" "}
            <button
              onClick={() => router.push("/waiting-list")}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Join our waiting list
            </button>
          </p>
        </div>
      )}

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
          name="Confirm Dates"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
