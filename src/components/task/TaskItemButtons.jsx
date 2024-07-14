import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
export default function TaskItemButtons({ setSelectTask, setShowTaskForm, onDelete, onCompleted }) {
  return (
    <div className="task-options">
      <Button
        icon="pi pi-check"
        rounded
        outlined
        severity="success"
        aria-label="Completar"
        onClick={onCompleted}
      />
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        severity="secondary"
        aria-label="Editar"
        onClick={() => {
          setSelectTask();
          setShowTaskForm(true);
        }}
      />
      <Button
        icon="pi pi-times"
        rounded
        outlined
        severity="danger"
        aria-label="Eliminar"
        onClick={onDelete}
      />
    </div>
  );
}
TaskItemButtons.propTypes = {
  setSelectTask: PropTypes.func.isRequired,
  setShowTaskForm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};
