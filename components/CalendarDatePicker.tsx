"use client";

import { useState, type ReactNode } from "react";

interface CalendarDatePickerProps {
  numberOfDays: number;
  onSelectDates: (startDate: Date, endDate: Date) => void;
  onCancel: () => void;
}

export default function CalendarDatePicker({
  numberOfDays,
  onSelectDates,
  onCancel,
}: CalendarDatePickerProps): ReactNode {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number): void => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!startDate) {
      setStartDate(selectedDate);
      return;
    }

    if (startDate && !endDate) {
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + numberOfDays - 1);

      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else if (
        selectedDate.toDateString() === calculatedEndDate.toDateString()
      ) {
        setEndDate(calculatedEndDate);
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
      }
      return;
    }

    if (startDate && endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const handleConfirm = (): void => {
    if (startDate && endDate) {
      onSelectDates(startDate, endDate);
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
    if (!startDate) return false;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (startDate && !endDate) {
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(
        calculatedEndDate.getDate() + numberOfDays - 1
      );

      return (
        date >= startDate && date <= calculatedEndDate
      );
    }

    return date >= startDate && endDate && date <= endDate;
  };

  const isStartDate = (day: number): boolean => {
    if (!startDate) return false;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    return date.toDateString() === startDate.toDateString();
  };

  const isEndDate = (day: number): boolean => {
    if (!endDate) return false;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    return date.toDateString() === endDate.toDateString();
  };

  const isClickableDate = (day: number): boolean => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date >= today;
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

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        Select Your Trip Dates
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        {numberOfDays} day{numberOfDays > 1 ? "s" : ""} package - Click to select start date
      </p>

      {startDate && endDate && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <p className="text-sm font-semibold text-blue-900">Selected Dates:</p>
          <p className="text-sm text-gray-700">
            {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
          </p>
        </div>
      )}

      {startDate && !endDate && (
        <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
          <p className="text-sm text-amber-800">
            Start date: {startDate.toLocaleDateString()}
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Auto-set to include {numberOfDays} days
          </p>
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
                  disabled={!isClickableDate(day)}
                  className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
                    !isClickableDate(day)
                      ? "text-gray-300 cursor-not-allowed"
                      : isStartDate(day) || isEndDate(day)
                      ? "bg-emerald-600 text-white"
                      : isDateSelected(day)
                      ? "bg-emerald-100 text-emerald-900"
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
          disabled={!startDate || !endDate}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
