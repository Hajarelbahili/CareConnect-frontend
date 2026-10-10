import { useState } from "react";

import AppointmentStepper from "../../components/appointment/AppointmentStepper";
import DepartmentStep from "../../components/appointment/DepartmentStep";
import SpecialityStep from "../../components/appointment/SpecialityStep";
import DoctorStep from "../../components/appointment/DoctorStep";
import DateTimeStep from "../../components/appointment/DateTimeStep";
import ConfirmationStep from "../../components/appointment/ConfirmationStep";
import AppointmentSuccess from "../../components/appointment/AppointmentSuccess";

import "./AppointmentBookingPage.css";

function AppointmentBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAppointmentSuccess = () => {
    setCurrentStep(6);
  };
  const handleBackToFirstStep = () => {
    setCurrentStep(1);
    setSelectedDepartment(null);
    setSelectedSpeciality(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DepartmentStep
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            onNext={handleNext}
          />
        );

      case 2:
        return (
          <SpecialityStep
            selectedDepartment={selectedDepartment}
            selectedSpeciality={selectedSpeciality}
            setSelectedSpeciality={setSelectedSpeciality}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 3:
        return (
          <DoctorStep
            selectedDepartment={selectedDepartment}
            selectedSpeciality={selectedSpeciality}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 4:
        return (
          <DateTimeStep
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 5:
        return (
          <ConfirmationStep
            selectedDepartment={selectedDepartment}
            selectedSpeciality={selectedSpeciality}
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBack={handleBack}
            onSuccess={handleAppointmentSuccess}
            onBackToFirstStep={handleBackToFirstStep}
          />
        );

      case 6:
        return (
          <AppointmentSuccess
            selectedDepartment={selectedDepartment}
            selectedSpeciality={selectedSpeciality}
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="appointment-booking-page">
      <div className="appointment-booking-page__container">
        {currentStep <= 5 && <AppointmentStepper currentStep={currentStep} />}

        {renderStep()}
      </div>
    </main>
  );
}

export default AppointmentBookingPage;
