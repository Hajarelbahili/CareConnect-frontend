import { useState } from "react";

import {
  Building2,
  Stethoscope,
  UserRound,
  CalendarDays,
  Clock,
  CheckCircle2
} from "lucide-react";

import { useCreateAppointmentMutation } from "../../features/appointment/appointmentApi";

import "./ConfirmationStep.css";

function ConfirmationStep({
  selectedDepartment,
  selectedSpeciality,
  selectedDoctor,
  selectedDate,
  selectedTime,
  onBack,
  onSuccess,
  onBackToFirstStep
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  // ==========================================
  // DATE DISPLAY
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // ==========================================
  // DOCTOR
  // ==========================================

  const doctorName =
    selectedDoctor?.username || selectedDoctor?.firstName || "Doctor";

  // ==========================================
  // VALIDATION
  // ==========================================

  const isFormValid =
    Boolean(selectedDepartment) &&
    Boolean(selectedSpeciality) &&
    Boolean(selectedDoctor?.doctorId) &&
    Boolean(selectedDate) &&
    Boolean(selectedTime);

  // ==========================================
  // CONFIRM APPOINTMENT
  // ==========================================

  const handleConfirm = async () => {
    setErrorMessage("");
    setHasError(false);

    if (!isFormValid) {
      setErrorMessage("Please complete all appointment information.");
      setHasError(true);
      return;
    }

    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();

    const appointmentData = {
      date: `${day}-${month}-${year}`,
      arrivalTime: selectedTime,
      doctorId: selectedDoctor.doctorId
    };

    console.log(
      "Appointment request:",
      JSON.stringify(appointmentData, null, 2)
    );

    try {
      const response = await createAppointment(appointmentData).unwrap();

      console.log("Appointment created:", response);

      onSuccess();
    } catch (error) {
      console.error("Appointment creation error:", error);

      let message = "Unable to book your appointment. Please try again.";

      if (typeof error?.data === "string") {
        message = error.data;
      } else if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.error) {
        message = error.error;
      }

      setErrorMessage(message);
      setHasError(true);
    }
  };

  // ==========================================
  // RETURN TO STEP 1
  // ==========================================

  const handleTryAgain = () => {
    if (onBackToFirstStep) {
      onBackToFirstStep();
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="confirmation-step">
      <div className="confirmation-step__header">
        <span className="confirmation-step__step">Step 5</span>

        <h1>Confirm Your Appointment</h1>

        <p>Please review your appointment information before confirming.</p>
      </div>

      {/* APPOINTMENT SUMMARY */}

      <div className="confirmation-step__card">
        <div className="confirmation-step__card-header">
          <div className="confirmation-step__icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h2>Appointment Summary</h2>
            <p>Check that everything is correct.</p>
          </div>
        </div>

        <div className="confirmation-step__details">
          <div className="confirmation-detail">
            <div className="confirmation-detail__icon">
              <Building2 size={18} />
            </div>

            <div className="confirmation-detail__content">
              <span>Department</span>
              <strong>{selectedDepartment?.name || "—"}</strong>
            </div>
          </div>

          <div className="confirmation-detail">
            <div className="confirmation-detail__icon">
              <Stethoscope size={18} />
            </div>

            <div className="confirmation-detail__content">
              <span>Speciality</span>
              <strong>{selectedSpeciality?.name || "—"}</strong>
            </div>
          </div>

          <div className="confirmation-detail">
            <div className="confirmation-detail__icon">
              <UserRound size={18} />
            </div>

            <div className="confirmation-detail__content">
              <span>Doctor</span>
              <strong>{doctorName}</strong>
            </div>
          </div>

          <div className="confirmation-detail">
            <div className="confirmation-detail__icon">
              <CalendarDays size={18} />
            </div>

            <div className="confirmation-detail__content">
              <span>Date</span>
              <strong>{formatDate(selectedDate) || "—"}</strong>
            </div>
          </div>

          <div className="confirmation-detail">
            <div className="confirmation-detail__icon">
              <Clock size={18} />
            </div>

            <div className="confirmation-detail__content">
              <span>Time</span>
              <strong>{selectedTime || "—"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* NOTICE */}

      <div className="confirmation-step__notice">
        <span>Please arrive a few minutes before your appointment.</span>
      </div>

      {/* ERROR MESSAGE */}

      {hasError && (
        <div
          className="confirmation-step__error"
          role="alert"
          aria-live="assertive"
        >
          <strong>Appointment Failed</strong>
          <p>{errorMessage}</p>
          <span>Please click "Try Again" to select another appointment.</span>
        </div>
      )}

      {/* ACTIONS */}

      <div className="confirmation-step__actions">
        {!hasError && (
          <button
            type="button"
            className="confirmation-step__back"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </button>
        )}

        {hasError ? (
          <button
            type="button"
            className="confirmation-step__confirm"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        ) : (
          <button
            type="button"
            className="confirmation-step__confirm"
            onClick={handleConfirm}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Booking..." : "Confirm Appointment"}
          </button>
        )}
      </div>
    </section>
  );
}

export default ConfirmationStep;
