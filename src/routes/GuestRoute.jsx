import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { getRoleRoute } from "../utils/getRoleRoute";

function GuestRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Utilisateur déjà connecté
  if (isAuthenticated) {
    return <Navigate to={getRoleRoute(user?.role)} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
