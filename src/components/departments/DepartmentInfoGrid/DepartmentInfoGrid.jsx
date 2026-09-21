import { Building2, Stethoscope, Info, HeartPulse } from "lucide-react";

import DepartmentInfoCard from "../DepartmentInfoCard/DepartmentInfoCard";
import "./DepartmentInfoGrid.css";

const DepartmentInfoGrid = ({
  department,
  departmentLoading,
  departmentError
}) => {
  if (!department) {
    return null;
  }

  if (departmentLoading) {
    return <div>Loading...</div>;
  }

  if (departmentError || !department) {
    return <div>Unable to load department.</div>;
  }

  return (
    <section className="department-info-grid">
      <DepartmentInfoCard
        icon={<Building2 size={21} />}
        title="Floor"
        value={department.floor || "N/A"}
        description="Main Hospital Building"
      />

      <DepartmentInfoCard
        icon={<Stethoscope size={21} />}
        title="Number of Specialities"
        value={department.specialityCount ?? 0}
        description="Specialities"
      />

      <DepartmentInfoCard
        icon={<Info size={21} />}
        title="Contact"
        value={department.phoneNumber}
        description={department.email}
      />

      <DepartmentInfoCard
        icon={<HeartPulse size={21} />}
        title="Medical Team"
        value={department.doctorCount ?? 0}
        description="Doctors"
      />
    </section>
  );
};

export default DepartmentInfoGrid;
