import DepartmentSection from "../../components/departments/DepartmentSection/DepartmentSection";
import DoctorSection from "../../components/doctor/DoctorSection/DoctorSection";
import CareConnectSections from "../../components/ui/homepagecomposant/WhyCareConnect";
import "./Home.css";

function HomePage() {
  return (
    <div className="home">
      {/* =========================
          HERO / BANNER
      ========================= */}

      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>
              Your Health,
              <span> Our Priority</span>
            </h1>

            <p>
              Find the right doctor and get the care you deserve with
              CareConnect.
            </p>

            <div className="home-hero-actions">
              <button className="hero-primary-button">Find a Doctor</button>

              <button className="hero-secondary-button">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          INTRO SECTION
      ========================= */}

      <section className="home-intro">
        <div className="home-container">
          <div className="home-intro-content">
            <p className="home-section-label">CARECONNECT</p>

            <h2>Healthcare made simple</h2>

            <p>
              CareConnect helps you find the right healthcare professionals and
              access the care you need, easily and securely.
            </p>
          </div>
        </div>
        {/* DEPARTMENTS */}

        <DepartmentSection />
        <DoctorSection />
        <CareConnectSections />
      </section>
    </div>
  );
}

export default HomePage;
