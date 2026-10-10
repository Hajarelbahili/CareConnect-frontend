import { CalendarDays, Clock, Stethoscope } from "lucide-react";

import {
  formatAppointmentDate,
  formatAppointmentTime,
  getAppointmentStatus
} from "../../utils/appointmentUtils";

function AppointmentCard({ appointment }) {
  const status = getAppointmentStatus(appointment.status);

  return (
    <article className="appointment-card">
      <div className="appointment-doctor-icon">
        <Stethoscope size={23} />
      </div>

      <div className="appointment-info">
        <h3>Dr. {appointment.doctorName}</h3>
        <p>Medical appointment</p>

        <div className="appointment-meta">
          <span>
            <CalendarDays size={15} />
            {formatAppointmentDate(appointment.date)}
          </span>

          <span>
            <Clock size={15} />
            {formatAppointmentTime(appointment.startTime)}
            {" - "}
            {formatAppointmentTime(appointment.endTime)}
          </span>
        </div>
      </div>

      <span className={`appointment-status ${status.className}`}>
        {status.label}
      </span>
    </article>
  );
}

export default AppointmentCard;
