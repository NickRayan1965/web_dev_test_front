import { ListTaskStatusLabel, TaskStatusLabel } from './enum/task-status';
import InputDropdownBlock from '../../common/components/InputDropdownBlock';
import { useForm } from 'react-hook-form';
import { ListTaskPriorityLabel } from './enum/task-priority';
import InputMultiSelectBlock from '../../common/components/InputMultiSelectBlock';
import PropTypes from 'prop-types';
import InputBlock from '../../common/components/InputBlock';
import { Button } from 'primereact/button';
export default function TaskFilters({ onSubmit, categories }) {
  const { register, control, watch, handleSubmit } = useForm();
  const selectedCategories = watch('selectedCategories', []);

  return (
    <form className="task-filters">
      <span className="task-filters-title">Filtros</span>
      <div className="task-filters-content">
        <InputBlock
          className="use-all-with"
          namefield="filterByContent"
          register={register}
          inputClassName="use-all-with small-input"
          title={'Buscar'}
          type="text"
          usePlaceholder={true}
        />
        <div className="task-filters-content-row">
          <InputDropdownBlock
            className="task-dropdown"
            data={ListTaskStatusLabel}
            title="Estado"
            namefield="status"
            control={control}
            defaultValue={TaskStatusLabel.PENDING}
            inputClassName="small-input-dropdown"
          />
          <InputDropdownBlock
            className="task-dropdown"
            data={['Todas', ...ListTaskPriorityLabel]}
            title="Prioridad"
            namefield="priority"
            control={control}
            defaultValue={'Todas'}
            inputClassName="small-input-dropdown"
          />
        </div>
        <div className="task-filters-content-row">
          <InputMultiSelectBlock
            usePlaceholder={true}
            namefield="selectedCategories"
            register={register}
            maxSelectedLabels={3}
            title={'Categorias'}
            value={selectedCategories}
            emptyMessage="No hay categorias disponibles"
            data={categories ?? []}
            inputClassName="small-multiselect"
          />
          <Button
            label="Filtrar"
            className="p-button-raised p-button-rounded btn-filter-tasks"
            severity="warning"
            type="button"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </form>
  );
}

TaskFilters.propTypes = {
  categories: PropTypes.array,
  onSubmit: PropTypes.func,
};
