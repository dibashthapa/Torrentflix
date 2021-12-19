import { useEffect } from "react";
import { Navigate, useLocation, RouteObject } from "react-router-dom";
import { verifyUser } from "../auth/authActions";
import { useAuth } from "../auth/authProvider";

interface Props extends RouteObject {
  element: React.ReactElement;
}

export const PrivateElement: React.FC<Props> = ({ element }) => {
  const location = useLocation();

  const { state, dispatch } = useAuth();
  useEffect(() => {
    verifyUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoading]);
  const { isUserLoggedIn } = state;
  if (state.isLoading) return <p>loading</p>;

  return isUserLoggedIn ? (
    element
  ) : (
    <Navigate to={"/login"} state={{ prevLocation: location.pathname }} />
  );
};
