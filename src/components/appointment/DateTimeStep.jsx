import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";

import { useSearchAvailabilityQuery } from "../../features/availability/availabilityApi";

import "./DateTimeStep.css";

function DateTimeStep({
  selectedDoctor,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  onNext,
  onBack
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ==========================================
  // DOCTOR
  // ==========================================

  const doctorId = selectedDoctor?.doctorId;

  const consultationDuration = selectedDoctor?.consultationDuration || 30;

  // ==========================================
  // DATE → YYYY-MM-DD
  // ==========================================

  const formatDateForApi = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDateForApi(selectedDate);

  // ==========================================
  // AVAILABILITY API
  // ==========================================

  const {
    data: availabilities = [],
    isLoading,
    isError
  } = useSearchAvailabilityQuery(
    {
      doctorId,
      date: formattedDate
    },
    {
      skip: !doctorId || !formattedDate
    }
  );

  // ==========================================
  // CALENDAR
  // ==========================================

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    // Monday = 0
    // Sunday = 6

    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // ==========================================
  // MONTH
  // ==========================================

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

    setSelectedDate(null);
    setSelectedTime(null);
  };

  // ==========================================
  // DATE
  // ==========================================

  const handleDateSelect = (day) => {
    if (!day) return;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setSelectedDate(date);

    // Important :
    // Quand la date change, l'ancien créneau
    // ne doit plus rester sélectionné.
    setSelectedTime(null);
  };

  const isSelectedDate = (day) => {
    if (!day || !selectedDate) {
      return false;
    }

    return (
      selectedDate.getFullYear() === currentMonth.getFullYear() &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getDate() === day
    );
  };

  // ==========================================
  // GENERATE TIME SLOTS
  // ==========================================

  const generateSlots = (startTime, endTime, duration) => {
    const slots = [];

    const [startHour, startMinute] = startTime.split(":").map(Number);

    const [endHour, endMinute] = endTime.split(":").map(Number);

    let currentMinutes = startHour * 60 + startMinute;

    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes + duration <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);

      const minutes = currentMinutes % 60;

      const formattedHour = String(hours).padStart(2, "0");
      const formattedMinute = String(minutes).padStart(2, "0");

      slots.push(`${formattedHour}:${formattedMinute}`);

      currentMinutes += duration;
    }

    return slots;
  };

  // ==========================================
  // CREATE ALL SLOTS
  // ==========================================

  const availableSlots = availabilities.flatMap((availability) => {
    return generateSlots(
      availability.startTime,
      availability.endTime,
      consultationDuration
    );
  });

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="datetime-step">
      {/* ================================
          HEADER
      ================================= */}

      <div className="datetime-step__header">
        <span className="datetime-step__step">Step 4</span>

        <h1>Choose Date & Time</h1>

        <p>
          Select a date and time for your appointment with{" "}
          <strong>{selectedDoctor?.username || "your doctor"}</strong>
        </p>
      </div>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div className="datetime-step__content">
        {/* ==============================
            CALENDAR
        =============================== */}

        <div className="datetime-calendar">
          <div className="datetime-calendar__title">
            <div className="datetime-calendar__title-icon">
              <CalendarDays size={18} />
            </div>

            <div>
              <span>Select a date</span>

              <small>Choose your preferred day</small>
            </div>
          </div>

          <div className="datetime-calendar__header">
            <button
              type="button"
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <h2>{monthName}</h2>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* WEEK DAYS */}

          <div className="datetime-calendar__weekdays">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* DAYS */}

          <div className="datetime-calendar__days">
            {days.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="datetime-calendar__empty"
                  />
                );
              }

              return (
                <button
                  type="button"
                  key={day}
                  className={`datetime-calendar__day ${
                    isSelectedDate(day)
                      ? "datetime-calendar__day--selected"
                      : ""
                  }`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==============================
            TIME SLOTS
        =============================== */}

        <div className="datetime-slots">
          <div className="datetime-slots__title">
            <div className="datetime-slots__title-icon">
              <Clock size={18} />
            </div>

            <div>
              <span>Available Times</span>

              <small>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric"
                    })
                  : "Select a date first"}
              </small>
            </div>
          </div>

          {/* NO DATE */}

          {!selectedDate && (
            <div className="datetime-slots__empty">
              <Clock size={28} />

              <p>Select a date to see available times.</p>
            </div>
          )}

          {/* LOADING */}

          {selectedDate && isLoading && (
            <div className="datetime-slots__empty">
              <p>Loading available times...</p>
            </div>
          )}

          {/* ERROR */}

          {selectedDate && isError && (
            <div className="datetime-slots__empty">
              <p>Unable to load available times.</p>
            </div>
          )}

          {/* NO AVAILABILITY */}

          {selectedDate &&
            !isLoading &&
            !isError &&
            availableSlots.length === 0 && (
              <div className="datetime-slots__empty">
                <Clock size={28} />

                <p>No available times for this date.</p>
              </div>
            )}

          {/* SLOTS */}

          {selectedDate &&
            !isLoading &&
            !isError &&
            availableSlots.length > 0 && (
              <div className="datetime-slots__list">
                {availableSlots.map((slot) => {
                  const isSelected = selectedTime === slot;

                  return (
                    <button
                      type="button"
                      key={slot}
                      className={`datetime-slot ${
                        isSelected ? "datetime-slot--selected" : ""
                      }`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* ================================
          ACTIONS
      ================================= */}

      <div className="datetime-step__actions">
        <button type="button" className="datetime-step__back" onClick={onBack}>
          Back
        </button>

        <button
          type="button"
          className="datetime-step__next"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default DateTimeStep;
