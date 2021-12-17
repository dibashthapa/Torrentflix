import { Navigate, useLocation, RouteObject } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

interface Props extends RouteObject {
  element: React.ReactElement;
}

export const PrivateElement: React.FC<Props> = ({ element }) => {
  const location = useLocation();

  const { state } = useAuth();
  const { isUserLoggedIn } = state;

  return isUserLoggedIn ? (
    element
  ) : (
    <Navigate to={"/login"} state={{ prevLocation: location.pathname }} />
  );
};
