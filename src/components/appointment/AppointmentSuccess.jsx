import { CheckCircle2, CalendarDays, Clock, UserRound } from "lucide-react";

import "./AppointmentSuccess.css";

function AppointmentSuccess({ selectedDoctor, selectedDate, selectedTime }) {
  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <section className="appointment-success">
      <div className="appointment-success__icon">
        <CheckCircle2 size={42} />
      </div>

      <span className="appointment-success__label">Appointment Confirmed</span>

      <h1>Your appointment is booked!</h1>

      <p>Your appointment has been successfully scheduled.</p>

      <div className="appointment-success__card">
        <div className="appointment-success__item">
          <UserRound size={18} />

          <div>
            <span>Doctor</span>

            <strong>{selectedDoctor?.username || "Doctor"}</strong>
          </div>
        </div>

        <div className="appointment-success__item">
          <CalendarDays size={18} />

          <div>
            <span>Date</span>

            <strong>{formatDate(selectedDate)}</strong>
          </div>
        </div>

        <div className="appointment-success__item">
          <Clock size={18} />

          <div>
            <span>Time</span>

            <strong>{selectedTime}</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="appointment-success__button"
        onClick={() => {
          window.location.href = "/patient";
        }}
      >
        View My Appointments
      </button>
    </section>
  );
}

export default AppointmentSuccess;
