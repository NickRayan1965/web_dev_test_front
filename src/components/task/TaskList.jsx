import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
export function TaskList({ tasks, setSelectTask, setShowTaskForm, onDelete, onCompleted }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} setSelectTask={setSelectTask} setShowTaskForm={setShowTaskForm} onDelete={onDelete} onCompleted={onCompleted}/>
      ))}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setSelectTask: PropTypes.func.isRequired,
  setShowTaskForm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};
