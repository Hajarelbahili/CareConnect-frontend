import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROLES } from "../constants/roles";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/common/HomePage";
import DepartmetPage from "../pages/department/departmentPage";
import GuestRoute from "./GuestRoute";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DoctorDashboardPage from "../pages/doctor/DoctorDashboardPage";
import PatientDashboardPage from "../pages/patient/PatientDashboardPage";
import AssistantDashboardPage from "../pages/assistant/AssistantDashboardPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/common/NotFoundPage";
import UnauthorizedPage from "../pages/common/UnauthorizedPage";
import DepartmentDetails from "../pages/department/DepartmentDetails";
import DoctorPage from "../pages/doctor/doctorPage";
import AppointmentBookingPage from "../pages/appointment/AppointmentBookingPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/departments" element={<DepartmetPage />} />
          <Route path="/departments/:id" element={<DepartmentDetails />} />
          <Route path="/doctors/departments/:id" element={<DoctorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* GUEST 
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
*/}
        {/* PATIENT */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.PATIENT]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/patient" element={<PatientDashboardPage />} />
            <Route
              path="/appointmentBooking"
              element={<AppointmentBookingPage />}
            />
          </Route>
        </Route>

        {/* DOCTOR */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/doctor" element={<DoctorDashboardPage />} />
          </Route>
        </Route>

        {/* ASSISTANT */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ASSISTANT]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/assistant" element={<AssistantDashboardPage />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Route>

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
