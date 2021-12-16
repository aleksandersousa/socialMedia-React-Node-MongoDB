import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

  const authActions = {
    loginStart: () => dispatch({ type: 'LOGIN_START' }),
    loginSuccess: (user) => dispatch({ type: 'LOGIN_SUCCESS', payload: user }),
    loginFailure: (error) => dispatch({ type: 'LOGIN_FAILURE', payload: error })
  };

  return (
    <AuthContext.Provider value={{
      user: state.user, 
      isFetching: state.isFetching, 
      error: state.error ,
      authActions: authActions
    }}>
      {children}
    </AuthContext.Provider>
  );
}
