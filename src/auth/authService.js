import { API_URL } from "../config/Environment";

export const logout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
};
export const login = async ({ username, password }) => {
  const response = await fetch(API_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  localStorage.setItem('jwt', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
export const getJwt = () => {
  return localStorage.getItem('jwt');
};
export default {
  logout,
  login,
  getCurrentUser,
  getJwt,
};
