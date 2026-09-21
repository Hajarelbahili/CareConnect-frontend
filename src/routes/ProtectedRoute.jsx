import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Utilisateur non connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Aucun rôle spécifié
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Vérification du rôle
  const hasAccess = allowedRoles.includes(user?.role);

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
