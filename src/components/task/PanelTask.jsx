import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../common/helpers/UseAuth';
import TaskForm from './TaskForm';
import { TaskList } from './TaskList';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
//import { Paginator } from 'primereact/paginator';
import useFetch from '../../common/helpers/use-fetch';
import useDeleteRequest from '../../common/helpers/use-delete-request';
import { toast } from 'sonner';
import usePatchRequest from '../../common/helpers/use-patch-request';
import { TaskStatus, TaskStatusFromLabel } from './enum/task-status';
import TaskFilters from './TaskFilters';
import { TaskPriorityFromLabel } from './enum/task-priority';

export default function PanelTask() {
  const { jwt } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { data: tasksOfUser, fetchData: fetchTasksOfUser } = useFetch('/task');
  const { data: categories, fetchData: fetchCategories } =
    useFetch('/task-category');
  const { Delete: deleteTask } = useDeleteRequest('/task');
  const { patch: patchTask } = usePatchRequest('/task');
  const [selectedTask, setSelectedTask] = useState(null);

  const [wasTaskCreatedOrUpdated, setWasTaskCreatedOrUpdated] = useState(false);
  // const [first, setFirst] = useState(1);
  // const [rows, setRows] = useState(50);
  // const onPaginate = useCallback((event) => {
  //   setFirst(event.first);
  //   setRows(event.rows);
  // }, []);
  const onDelete = useCallback(
    (taskId) => () => {
      toast.promise(deleteTask({ jwt, params: '/' + taskId }), {
        loading: 'Eliminando tarea...',
        success: () => {
          fetchTasksOfUser({ jwt });
          return 'Tarea eliminada correctamente';
        },
        error: () => {
          return 'Error al eliminar la tarea';
        },
      });
    },
    [deleteTask, fetchTasksOfUser, jwt]
  );
  const onCompleted = useCallback(
    (taskId) => () => {
      toast.promise(
        patchTask({
          body: { status: TaskStatus.COMPLETED },
          jwt,
          params: '/' + taskId,
        }),
        {
          loading: 'Marcando tarea como completada...',
          success: () => {
            fetchTasksOfUser({ jwt });
            return 'Tarea completada correctamente';
          },
          error: (e) => {
            console.log(e);
            return 'Error al completar la tarea';
          },
        }
      );
    },
    [fetchTasksOfUser, jwt, patchTask]
  );

  useEffect(() => {
    fetchTasksOfUser({ jwt });
  }, [jwt, fetchTasksOfUser, wasTaskCreatedOrUpdated]);

  useEffect(() => {
    fetchCategories({ jwt });
  }, [jwt, fetchCategories]);

  const onFilterSubmit = useCallback(
    (data) => {
      const query = {
        ...data,
        status: TaskStatusFromLabel[data.status],
        priority:
          data.priority === 'Todas'
            ? undefined
            : TaskPriorityFromLabel[data.priority],
        categoryIds: JSON.stringify(
          data.selectedCategories?.map((category) => category._id)
        ),
        selectedCategories: undefined,
      };
      fetchTasksOfUser({ jwt, query: JSON.parse(JSON.stringify(query)) });
      console.log(query);
    },
    [fetchTasksOfUser, jwt]
  );
  return (
    <div className="panel">
      <div className="panel-content transparent-content">
        <TaskFilters
          onSubmit={onFilterSubmit}
          categories={categories?.data ?? []}
        />
        <TaskList
          tasks={tasksOfUser?.data ?? []}
          setSelectTask={setSelectedTask}
          setShowTaskForm={setShowTaskForm}
          onDelete={onDelete}
          onCompleted={onCompleted}
        />
        {/* <Paginator
          className="paginator"
          first={first}
          rows={rows}
          onPageChange={onPaginate}
          totalRecords={120}
        /> */}
        <Button
          label="Crear tarea"
          className="p-button-raised p-button-rounded btn-create-task"
          onClick={() => setShowTaskForm(true)}
        />
        <Dialog
          header={selectedTask ? 'Editar tarea' : 'Crear tarea'}
          visible={showTaskForm}
          onHide={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }}
        >
          <TaskForm
            setWasTaskCreatedOrUpdated={setWasTaskCreatedOrUpdated}
            task={selectedTask}
          />
        </Dialog>
      </div>
    </div>
  );
}
