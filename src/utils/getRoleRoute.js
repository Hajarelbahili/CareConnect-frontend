import { ROLE_ROUTES } from "../constants/routes";

export function getRoleRoute(role) {
  return ROLE_ROUTES[role] || "/unauthorized";
}
