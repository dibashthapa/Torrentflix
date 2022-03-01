import {ReactNode, useContext, useReducer} from 'react';
import {AuthContext, State} from './authContext';
import {reducer} from './authReducer';

interface ProviderProps {
  children: React.ReactChildren | ReactNode;
}

const initialState: State = {
  currentUser: undefined,
  errorMessage: '',
  isLoading: true,
  isUserLoggedIn: false,
};

export const AuthProvider: React.FC<ProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth should be within a AuthProvider');
  }
  return context;
}
