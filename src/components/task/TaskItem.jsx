import { ScrollPanel } from 'primereact/scrollpanel';

import PropTypes from 'prop-types';
import TaskItemButtons from './TaskItemButtons';
import PanelCategories from './PanelCategories';
import { TaskPriorityLabel } from './enum/task-priority';
import { TaskStatusLabel } from './enum/task-status';
export default function TaskItem({
  task,
  setSelectTask,
  setShowTaskForm,
  onDelete,
  onCompleted,
}) {
  return (
    <div className="task-card">
      <hr />
      <div className='task-header'>
        <span className="task-title">{task.name}</span>
        <div className="task-header-info">
          <span>Prioridad: {TaskPriorityLabel[task.priority]}</span>
          <span>{TaskStatusLabel[task.status]}</span>
        </div>
      </div>

      <div>
        <ScrollPanel className="scroll-panel">{task.description}</ScrollPanel>
        <div className="task-card-footer">
          <PanelCategories
            categories={task.categories?.map((category) => category.name) ?? []}
          />
          <TaskItemButtons
            setSelectTask={() => setSelectTask(task)}
            setShowTaskForm={setShowTaskForm}
            onDelete={onDelete(task._id)}
            onCompleted={onCompleted(task._id)}
          />
        </div>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  setSelectTask: PropTypes.func.isRequired,
  setShowTaskForm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};
