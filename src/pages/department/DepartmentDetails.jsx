import { useParams } from "react-router-dom";

import { useGetDepartmentByIdQuery } from "../../features/department/departmentApi";

import { useSearchSpecialitiesQuery } from "../../features/speciality/specialityApi";

import DepartmentBreadcrumb from "../../components/ui/DepartmentBreadcrumb/Breadcrumb";
import DepartmentHero from "../../components/departments/DepartmentHero/DepartmentHero";
import DepartmentInfoGrid from "../../components/departments/DepartmentInfoGrid/DepartmentInfoGrid";
import SpecialitiesSection from "../../components/Speciality/SpecialitiesSection/SpecialitiesSection";
import DepartmentCTA from "../../components/departments/DepartmentCTA/DepartmentCTA";

import "./DepartmentDetails.css";

const DepartmentDetails = () => {
  const { id } = useParams();

  const {
    data: department,
    isLoading: departmentLoading,
    isError: departmentError
  } = useGetDepartmentByIdQuery(id);

  const {
    data: specialities,
    isLoading: specialitiesLoading,
    isError: specialitiesError
  } = useSearchSpecialitiesQuery({
    departmentId: id,
    active: true
  });

  if (departmentError || !department) {
    return <div>Unable to load department.</div>;
  }

  return (
    <main className="department-details">
      <DepartmentHero department={department} />
      <DepartmentInfoGrid
        department={department}
        departmentLoading={departmentLoading}
        departmentError={departmentError}
      />
      <SpecialitiesSection
        departmentName={department.name}
        specialities={specialities}
        specialitiesLoading={specialitiesLoading}
        specialitiesError={specialitiesError}
      />
      <DepartmentCTA
        title="Not sure which specialty you need?"
        description="Find the right specialist for your healthcare needs."
        buttonLabel="View All Doctors"
      />
      <DepartmentCTA
        title="Take care of your health today"
        description="Book an appointment with one of our specialists."
        buttonLabel="Book an Appointment"
      />
    </main>
  );
};

export default DepartmentDetails;
