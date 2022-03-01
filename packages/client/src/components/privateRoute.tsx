import {useEffect} from 'react';
import {Navigate, useLocation, RouteObject} from 'react-router-dom';
import {verifyUser} from '../auth/authActions';
import {useAuth} from '../auth/authProvider';
import Loader from './loader';

interface Props extends RouteObject {
  element: React.ReactElement;
}

export const PrivateElement: React.FC<Props> = ({element}) => {
  const location = useLocation();

  const {state, dispatch} = useAuth();
  useEffect(() => {
    console.log('routing');
    verifyUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(state.isLoading);
  const {isUserLoggedIn} = state;
  if (state.isLoading) return <Loader isLoading={true} />;

  return isUserLoggedIn ? (
    element
  ) : (
    <Navigate to={'/login'} state={{prevLocation: location.pathname}} />
  );
};
