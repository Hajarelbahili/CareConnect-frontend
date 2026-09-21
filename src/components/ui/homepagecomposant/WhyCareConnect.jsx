import {
  User,
  Search,
  CalendarDays,
  Bell,
  FileText,
  ShieldCheck,
  Heart,
  ArrowRight
} from "lucide-react";
import womanImage from "../../../assets/images/why-careconnect-woman.webp";
import typing from "../../../assets/images/Typing-pana.png";
import mobile from "../../../assets/images/Mobile login-pana.png";
import calendar from "../../../assets/images/Calendar-bro.png";
import medicine from "../../../assets/images/Medicine-bro.png";
import "./CareConnectSections.css";

const features = [
  {
    icon: User,
    title: "Create your free account",
    description:
      "Sign up in a few minutes and access all your healthcare information in one place.",
    color: "blue"
  },
  {
    icon: Search,
    title: "Find the right doctor",
    description:
      "Explore doctors across different departments and specialties, and choose the one that suits your needs.",
    color: "green"
  },
  {
    icon: CalendarDays,
    title: "Book when it suits you",
    description:
      "Check real-time availability and book your appointment at the time that works best for you.",
    color: "purple"
  },
  {
    icon: Bell,
    title: "Stay on track",
    description:
      "Receive a reminder before your appointment and never miss a visit again.",
    color: "orange"
  },
  {
    icon: FileText,
    title: "Keep your medical history organized",
    description:
      "Access your past and upcoming appointments, along with the documents and files related to each visit.",
    color: "red"
  },
  {
    icon: ShieldCheck,
    title: "You're always in control",
    description:
      "Need to change your plans? Cancel or reschedule your appointment whenever you need to.",
    color: "green"
  }
];

const steps = [
  {
    number: "01",
    image: typing,
    title: "Create your account",
    description: "Sign up for free in just a few minutes."
  },
  {
    number: "02",
    image: medicine,
    title: "Find your doctor",
    description:
      "Browse departments and specialties, and choose the right doctor for you."
  },
  {
    number: "03",
    image: calendar,
    title: "Book your appointment",
    description: "Select an available date and time that suits your schedule."
  },
  {
    number: "04",
    image: mobile,
    title: "Manage your care",
    description:
      "Receive reminders, view your appointment history, and access your medical documents."
  }
];

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <article className="feature-card">
      <div
        className={`feature-icon feature-icon-${feature.color}`}
        aria-hidden="true"
      >
        <Icon size={28} strokeWidth={2} />
      </div>

      <div className="feature-content">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </article>
  );
}

function HealthBadge() {
  return (
    <div className="health-badge">
      <div className="health-badge-icon">
        <Heart size={23} strokeWidth={2} />
      </div>

      <p>
        A healthier
        <br />
        tomorrow
        <br />
        is in your hands.
      </p>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="quote-card">
      <p>
        “Your health journey
        <br />
        matters, and we're here
        <br />
        to make it easier.”
      </p>

      <span className="quote-line" />
    </div>
  );
}

function WhyCareConnect() {
  return (
    <section className="why-careconnect">
      <div className="why-container">
        {/* LEFT CONTENT */}
        <div className="why-content">
          <div className="section-label">WHY CARECONNECT?</div>

          <h2>
            Healthcare made simple,
            <br />
            accessible, and organized.
          </h2>

          <p className="section-description">
            CareConnect helps you take control of your healthcare with a simple
            and secure platform designed around your needs.
          </p>

          <div className="feature-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="main-visual">
          <img
            src={womanImage}
            alt="Woman using CareConnect on her smartphone"
            className="woman-image"
          />

          <HealthBadge />

          <QuoteCard />
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, isLast }) {
  return (
    <div className="step-wrapper">
      <article className="step-card">
        <div className="step-number">{step.number}</div>

        <div className="step-image-wrapper">
          <img src={step.image} alt="" className="step-image" />
        </div>

        <h3>{step.title}</h3>

        <p>{step.description}</p>
      </article>

      {!isLast && <div className="step-connector" aria-hidden="true" />}
    </div>
  );
}

function HowCareConnectWorks() {
  return (
    <section className="how-careconnect">
      {/* DECORATIVE LEAVES */}
      <img
        src="/images/decorative-leaves.svg"
        alt=""
        className="decorative-leaves decorative-leaves-left"
      />

      <img
        src="/images/decorative-leaves.svg"
        alt=""
        className="decorative-leaves decorative-leaves-right"
      />

      <div className="how-container">
        {/* HEADER */}
        <div className="how-header">
          <div>
            <div className="section-label">HOW CARECONNECT WORKS</div>

            <h2>
              From booking to follow-up,
              <br />
              <span>everything in one</span> place.
            </h2>
          </div>

          <p>
            Getting started with CareConnect is easy.
            <br />
            Follow these simple steps and take control of your healthcare today.
          </p>
        </div>

        {/* STEPS */}
        <div className="steps-container">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="cta-wrapper">
          <div className="cta-content">
            <h3>Ready to start your healthcare journey?</h3>

            <p>Create your free CareConnect account today.</p>
          </div>

          <button className="cta-button">
            Create Your Free Account
            <ArrowRight size={21} strokeWidth={2} />
          </button>
        </div>

        {/* HANDWRITTEN NOTE */}
        <div className="handwritten-note">
          <svg className="note-arrow" viewBox="0 0 100 50" aria-hidden="true">
            <path
              d="M95 5 C70 2, 45 8, 25 25 C17 32, 10 38, 3 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M3 45 L15 43 M3 45 L8 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <span>
            It only takes
            <br />a few minutes!
          </span>
        </div>
      </div>
    </section>
  );
}

export default function CareConnectSections() {
  return (
    <>
      <WhyCareConnect />
      <HowCareConnectWorks />
    </>
  );
}
