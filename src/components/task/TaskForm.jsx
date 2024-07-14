import { useForm } from 'react-hook-form';
import InputBlock from '../../common/components/InputBlock';
import useAuth from '../../common/helpers/UseAuth';
import InputCalendarBlock from '../../common/components/InputCalendarBlock';
import {
  maxLength,
  minLength,
  required,
} from '../../common/validators/primereact-validators';
import InputTextAreaBlock from '../../common/components/InputTextAreaBlock';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import InputDropdownBlock from '../../common/components/InputDropdownBlock';
import { Dialog } from 'primereact/dialog';
import {
  ListTaskPriorityLabel,
  TaskPriorityFromLabel,
  TaskPriorityLabel,
} from './enum/task-priority';
import InputMultiSelectBlock from '../../common/components/InputMultiSelectBlock';
import usePostRequest from '../../common/helpers/use-post-request';
import useFetch from '../../common/helpers/use-fetch';
import { TaskCategoryFloatForm } from '../task-category/TaskCategoryForm';
import { toast } from 'sonner';
import getTaskDataFormated, {
  getCreatedTaskFormated,
} from './helpers/getTaskDataFormated';
import {
  toastErrorHandler,
  toastSuccessHandler,
} from './helpers/toastTaskHandlers';
const taskValidations = {
  description: {
    maxLength: maxLength(500),
  },
  name: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(50),
  },
  expiration: {
    required,
  },
  categoryIds: {},
};
import PropTypes from 'prop-types';
import usePatchRequest from '../../common/helpers/use-patch-request';
export default function TaskForm({ setWasTaskCreatedOrUpdated, task }) {
  const [showCategoryFormDialog, setShowCategoryFormDialog] = useState(false);
  const { jwt } = useAuth();
  const { post } = usePostRequest('/task');
  const { patch } = usePatchRequest('/task');
  const [categoryWasCreated, setCategoryWasCreated] = useState(false);
  const { data: categories, fetchData: fetchCategories } =
    useFetch('/task-category');
  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: TaskPriorityLabel.MEDIUM,
      ...(task && getCreatedTaskFormated(task)),
    },
  });
  const selectedCategories = watch('selectedCategories', []);
  const onSubmitToCreate = useCallback(
    (data) => {
      data.priority = TaskPriorityFromLabel[data.priority];
      toast.promise(post({ body: getTaskDataFormated(data), jwt }), {
        loading: 'Guardando...',
        success: toastSuccessHandler({ reset, setWasTaskCreatedOrUpdated, isToUpdate: Boolean(task) }),
        error: toastErrorHandler,
      });
    },
    [jwt, post, reset, setWasTaskCreatedOrUpdated, task]
  );
  const onSubmitToUpdate = useCallback(
    (data) => {
      data.priority = TaskPriorityFromLabel[data.priority];
      toast.promise(
        patch({ body: getTaskDataFormated(data), jwt, params: '/' + task._id }),
        {
          loading: 'Guardando...',
          success: () => {
            toastSuccessHandler({ reset, isToUpdate: true });
            setWasTaskCreatedOrUpdated((e) => !e);
          },
          error: toastErrorHandler,
        }
      );
    },
    [jwt, patch, reset, setWasTaskCreatedOrUpdated, task]
  );
  const onSubmit = useCallback(
    (data) => {
      if (task) {
        onSubmitToUpdate(data);
      } else {
        onSubmitToCreate(data);
      }
    },
    [onSubmitToCreate, onSubmitToUpdate, task]
  );
  useEffect(() => {
    fetchCategories({ jwt });
  }, [fetchCategories, jwt, categoryWasCreated]);
  return (
    <div className="centered-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="transparent-content">
        <InputBlock
          register={register}
          classNameOfSpan={'input-container'}
          errors={errors}
          title={'Nombre de la tarea'}
          namefield="name"
          validations={taskValidations.name}
          value={task?.name}
        />
        <InputTextAreaBlock
          register={register}
          errors={errors}
          title={'Descripción'}
          namefield="description"
          validations={taskValidations.description}
          value={task?.description}
        />
        <div className="flex-container-task">
          <InputCalendarBlock
            control={control}
            errors={errors}
            title={'Expira el...'}
            namefield="expiration"
            validations={taskValidations.expiration}
          />
          <InputDropdownBlock
            data={ListTaskPriorityLabel}
            title={'Prioridad'}
            namefield="priority"
            control={control}
            inputClassName='height-rem-2'
        
          />
        </div>

        <div className="categories-container">
          <InputMultiSelectBlock
          inputClassName='height-rem-2'
            data={categories?.data || []}
            namefield="selectedCategories"
            register={register}
            value={selectedCategories}
            errors={errors}
            maxSelectedLabels={3}
            title={'Seleccione las categorias'}
            validations={taskValidations.categoryIds}
            emptyMessage="No hay categorías disponibles"
          />
          <Button
            className="height-rem-2"
            label="+"
            type="button"
            onClick={() => setShowCategoryFormDialog(true)}
          />
          <Dialog
            header="Crear categoría"
            visible={showCategoryFormDialog}
            onHide={() => setShowCategoryFormDialog(false)}
          >
            <TaskCategoryFloatForm
              setCategoryWasCreated={setCategoryWasCreated}
            />
          </Dialog>
        </div>

        <Button type="submit" label="Guardar" className="submit-button" />
      </form>
    </div>
  );
}

TaskForm.propTypes = {
  setWasTaskCreatedOrUpdated: PropTypes.func.isRequired,
  task: PropTypes.object,
};
