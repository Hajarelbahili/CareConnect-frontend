import { CalendarDays, UserRound, HeartPulse } from "lucide-react";
import doctorPassient from "../../assets/images/Mobile login-pana.png";
import "./AuthLayout.css";

function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      {/* Background */}

      <div className="auth-background-shape auth-shape-one"></div>

      <div className="auth-background-shape auth-shape-two"></div>

      <div className="auth-container">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <section className="auth-intro">
          <div className="auth-intro-content">
            <span className="auth-welcome-badge">Welcome to CareConnect</span>

            <h1>
              Your Health,
              <span> Our Priority</span>
            </h1>

            <p className="auth-intro-description">
              Connect with qualified healthcare professionals, book appointments
              and manage your healthcare journey with ease.
            </p>

            {/* FEATURES */}

            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <CalendarDays size={24} />
                </div>

                <div>
                  <h3>Book Appointments</h3>

                  <p>Schedule visits with qualified doctors</p>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <UserRound size={24} />
                </div>

                <div>
                  <h3>Access Your Profile</h3>

                  <p>Manage your personal information</p>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <HeartPulse size={24} />
                </div>

                <div>
                  <h3>Better Healthcare</h3>

                  <p>A simpler way to a healthier you</p>
                </div>
              </div>
            </div>
          </div>

          {/* DOCTORS VISUAL */}

          <div className="auth-doctors-visual">
            <div className="auth-doctor-circle"></div>

            <div className="auth-heart-floating">
              <HeartPulse size={30} />
            </div>

            {/* 
              Ton image PNG des médecins
              pourra être ajoutée ici.
            */}

            <img
              src={doctorPassient}
              alt="CareConnect healthcare professionals"
              className="auth-doctors-image"
            />
          </div>

          {/* SLOGAN */}

          <div className="auth-slogan">
            Caring
            <br />
            for a Healthier
            <br />
            Tomorrow
          </div>
        </section>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <section className="auth-card">{children}</section>
      </div>
    </main>
  );
}

export default AuthLayout;
