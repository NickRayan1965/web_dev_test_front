import { createContext, useState } from 'react';
import authService from '../auth/authService';
import PropTypes from 'prop-types';
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [jwt, setJwt] = useState(authService.getJwt());

  const logout = () => {
    authService.logout();
    setUser(null);
    setJwt(null);
  };
  const login = async ({ username, password }) => {
    const login = await authService.login({ username, password });
    setUser(login.user);
    setJwt(login.jwt);
  };
  const value = { user, jwt, logout, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
