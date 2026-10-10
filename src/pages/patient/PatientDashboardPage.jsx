import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CalendarCheck,
  History,
  Plus,
  Stethoscope
} from "lucide-react";

import { useGetPatientAppointmentsQuery } from "../../features/appointment/appointmentApi";
import { getAppointmentStats } from "../../../src/utils/appointmentUtils";
import AppointmentCard from "../../components/appointment/AppointmentCard";

import "./PatientDashboardPage.css";

const PatientDashboardPage = () => {
  const navigate = useNavigate();

  const {
    data: appointments = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetPatientAppointmentsQuery();

  const stats = getAppointmentStats(appointments);

  if (isLoading) {
    return (
      <main className="patient-dashboard" aria-live="polite">
        <p>Loading your appointments...</p>
      </main>
    );
  }

  if (isError) {
    const message =
      error?.data?.message ??
      "Unable to load your appointments. Please try again.";

    return (
      <main className="patient-dashboard" role="alert">
        <h2>Unable to load appointments</h2>
        <p>{message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </main>
    );
  }

  return (
    <main className="patient-dashboard">
      <section className="patient-welcome">
        <div>
          <span className="dashboard-eyebrow">PATIENT PORTAL</span>
          <h1>Welcome back!</h1>
          <p>Manage your appointments and take care of your health.</p>
        </div>

        <button
          className="book-appointment-btn"
          onClick={() => navigate("/appointmentBooking")}
        >
          <Plus size={18} />
          Book an Appointment
        </button>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <div className="stat-icon">
            <CalendarDays size={22} />
          </div>
          <div>
            <p>Total Appointments</p>
            <h2>{stats.total}</h2>
          </div>
        </article>

        <article className="dashboard-stat-card">
          <div className="stat-icon">
            <CalendarCheck size={22} />
          </div>
          <div>
            <p>Scheduled</p>
            <h2>{stats.scheduled}</h2>
          </div>
        </article>

        <article className="dashboard-stat-card">
          <div className="stat-icon">
            <History size={22} />
          </div>
          <div>
            <p>Completed</p>
            <h2>{stats.completed}</h2>
          </div>
        </article>
      </section>

      <section className="appointments-section">
        <div className="appointments-heading">
          <div>
            <h2>My Appointments</h2>
            <p>View your appointment history and status.</p>
          </div>

          <button
            className="view-doctors-btn"
            onClick={() => navigate("/doctors/departments/11")}
          >
            <Stethoscope size={17} />
            Find a Doctor
          </button>
        </div>

        <div className="appointments-list">
          {appointments.length === 0 ? (
            <div className="appointments-empty">
              <CalendarDays size={42} />
              <h3>No appointments yet</h3>
              <p>Book your first appointment with a doctor.</p>

              <button
                className="book-appointment-btn"
                onClick={() => navigate("/appointments/book")}
              >
                <Plus size={18} />
                Book Now
              </button>
            </div>
          ) : (
            appointments.map((appointment) => (
              <AppointmentCard
                key={
                  appointment.appointmentId ??
                  `${appointment.doctorId}-${appointment.date}-${appointment.startTime}`
                }
                appointment={appointment}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default PatientDashboardPage;
