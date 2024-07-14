export const required = {
  value: true,
  message: 'Campo requerido',
};
export const minLength = (min) => {
  return {
    value: min,
    message: `El campo debe tener al menos ${min} caracteres`,
  };
};
export const maxLength = (max) => {
  return {
    value: max,
    message: `El campo debe tener como máximo ${max} caracteres`,
  };
};
export const isEmailPattern = () => {
  return {
    value: /^$|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Ingrese un email válido',
  };
};
