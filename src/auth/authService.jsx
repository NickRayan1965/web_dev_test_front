import { API_URL } from '../config/Environment';

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
    const errorBody = await response.json();
    throw new Error(JSON.stringify(errorBody));
  }

  const data = await response.json();
  if (data && data.jwt) {
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('Login exitoso:', data);
  } else {
    console.error('No se recibieron los datos de autenticación esperados.');
  }
  return data;
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    logout();
    return null;
  }
};
export const getJwt = () => {
  try {
    return localStorage.getItem('jwt');
  } catch (error) {
    logout();
    return null;
  }
};
export default {
  logout,
  login,
  getCurrentUser,
  getJwt,
};
