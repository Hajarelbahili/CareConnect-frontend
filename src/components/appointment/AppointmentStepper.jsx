import { Check } from "lucide-react";

import "./AppointmentStepper.css";

const steps = [
  {
    number: 1,
    label: "Department"
  },
  {
    number: 2,
    label: "Speciality"
  },
  {
    number: 3,
    label: "Doctor"
  },
  {
    number: 4,
    label: "Date & Time"
  },
  {
    number: 5,
    label: "Confirm"
  }
];

function AppointmentStepper({ currentStep }) {
  return (
    <div className="appointment-stepper">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div
            className={`appointment-stepper__step ${
              isActive ? "appointment-stepper__step--active" : ""
            } ${isCompleted ? "appointment-stepper__step--completed" : ""}`}
            key={step.number}
          >
            <div className="appointment-stepper__indicator">
              {isCompleted ? <Check size={14} /> : step.number}
            </div>

            <span>{step.label}</span>

            {index < steps.length - 1 && (
              <div className="appointment-stepper__line" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AppointmentStepper;
