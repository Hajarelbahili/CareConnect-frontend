import { useEffect } from "react";
import {
  X,
  UserRound,
  Building2,
  Stethoscope,
  Phone,
  Mail,
  Clock3,
  Venus,
  CalendarDays
} from "lucide-react";

import "./DoctorInfoModal.css";

const DoctorInfoModal = ({ doctor, isOpen, onClose, onBookAppointment }) => {
  // Empêche le scroll de la page lorsque le modal est ouvert
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fermer avec Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !doctor) {
    return null;
  }

  const doctorName =
    doctor.name || doctor.fullName || doctor.username || "Doctor";

  const doctorImage = doctor.imageBase64
    ? `data:${doctor.imageType || "image/jpeg"};base64,${doctor.imageBase64}`
    : doctor.image || null;

  return (
    <div
      className="doctor-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="doctor-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-modal-title"
      >
        {/* =========================
            HEADER
        ========================= */}
        <div className="doctor-modal__header">
          <div className="doctor-modal__header-title">
            <span>Doctor Information</span>
            <p>Complete information about this doctor</p>
          </div>

          <button
            type="button"
            className="doctor-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================
            DOCTOR HERO
        ========================= */}
        <section className="doctor-modal__hero">
          <div className="doctor-modal__hero_grid">
            {/* Image */}
            <div className="doctor-modal__image-wrapper">
              {doctorImage ? (
                <img
                  src={doctorImage}
                  alt={doctorName}
                  className="doctor-modal__image"
                />
              ) : (
                <div className="doctor-modal__image-placeholder">
                  <UserRound size={60} />
                </div>
              )}
            </div>

            {/* Main information */}
            <div className="doctor-modal__main-info">
              <h2 id="doctor-modal-title">Dr. {doctorName}</h2>

              <div className="doctor-modal__tags">
                {doctor.specialityName && (
                  <div className="doctor-modal__tag">
                    <Stethoscope size={17} />
                    <span>{doctor.specialityName}</span>
                  </div>
                )}

                {doctor.departmentName && (
                  <div className="doctor-modal__tag">
                    <Building2 size={17} />
                    <span>{doctor.departmentName}</span>
                  </div>
                )}
                {/* Gender */}
                {doctor.gender && (
                  <div className="doctor-modal__tag">
                    <Venus size={17} />
                    <span>{doctor.gender}</span>
                  </div>
                )}
              </div>

              <p className="doctor-modal__description">About doctor </p>
            </div>
          </div>
          <div className="doctor-modal__quick-info">
            <div className="doctor-modal__info-item">
              <div className="doctor-modal__icon">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Consultation Duration</span>
                <strong>{doctor.consultationDuration || 30} minutes</strong>
              </div>
            </div>

            {doctor.phone && (
              <div className="doctor-modal__info-item">
                <div className="doctor-modal__icon">
                  <Phone size={21} />
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{doctor.phone}</strong>
                </div>
              </div>
            )}

            {doctor.email && (
              <div className="doctor-modal__info-item">
                <div className="doctor-modal__icon">
                  <Mail size={21} />
                </div>

                <div>
                  <span>Email</span>
                  <strong>{doctor.email}</strong>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================
            QUICK INFORMATION
        ========================= */}

        {/* =========================
            DETAILS
        ========================= */}

        {/* =========================
            FOOTER / CTA
        ========================= */}
        <div className="doctor-modal__footer">
          <button
            type="button"
            className="doctor-modal__cancel"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="doctor-modal__appointment"
            onClick={onBookAppointment}
          >
            <CalendarDays size={19} />
            <span>Book an Appointment</span>
            <span className="doctor-modal__arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoModal;
