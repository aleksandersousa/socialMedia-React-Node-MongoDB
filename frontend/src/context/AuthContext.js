import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  const authActions = {
    loginStart: () => dispatch({ type: 'LOGIN_START' }),
    loginSuccess: (user) => dispatch({ type: 'LOGIN_SUCCESS', payload: user }),
    loginFailure: (error) => dispatch({ type: 'LOGIN_FAILURE', payload: error }),
    follow: (userId) => dispatch({ type: 'FOLLOW', payload: userId }),
    unfollow: (userId) => dispatch({ type: 'UNFOLLOW', payload: userId }),
    updateStorage: (user) => dispatch({ type: 'UPDATE_STORAGE', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT', payload: null})
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
