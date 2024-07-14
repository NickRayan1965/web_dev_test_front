export const toastErrorHandler = (e) => {
  console.log({ e });
  return 'Error al guardar la tarea';
};
export const toastSuccessHandler =
  ({ reset, setWasTaskCreatedOrUpdated, isToUpdate = false }) =>
  () => {
    reset();
    setWasTaskCreatedOrUpdated(e => !e);
    return 'Tarea'
      .concat(isToUpdate ? ' actualizada' : ' creada')
      .concat(' correctamente');
  };
