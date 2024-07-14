import { MultiSelect } from 'primereact/multiselect';
import PropTypes from 'prop-types';
export default function InputMultiSelectBlock({
  register,
  namefield,
  value,
  data,
  emptyMessage = 'No hay opciones disponibles',
  maxSelectedLabels = 3,
  title = namefield,
  validations = {},
  errors = {},
  className = '',
  usePlaceholder = false,
  inputClassName = '',
}) {
  let spanClassName = !usePlaceholder ? 'p-float-label input-container' : '';
  spanClassName = spanClassName.concat(' use-all-with');
  const inputClassNameFinal = inputClassName.concat(
    ' use-all-with align-center'
  );
  return (
    <div className={'categories-multiselect '.concat(className)}>
      <span className={spanClassName.concat(' input-with-placeholder-margin')}>
        <MultiSelect
          id={namefield}
          value={value}
          options={data}
          filter
          {...register(namefield, {
            ...validations,
            value,
          })}
          placeholder={usePlaceholder ? title : ''}
          optionLabel="name"
          emptyMessage={emptyMessage}
          maxSelectedLabels={maxSelectedLabels}
          className={inputClassNameFinal.concat(
            usePlaceholder ? ' input-with-placeholder-margin' : ''
          )}
        />
        {!usePlaceholder && <label htmlFor={namefield}>{title}</label>}
      </span>
      {errors[namefield] && (
        <small className="p-error">{errors[namefield].message}</small>
      )}
    </div>
  );
}
InputMultiSelectBlock.propTypes = {
  register: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
  value: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  namefield: PropTypes.string.isRequired,
  maxSelectedLabels: PropTypes.number,
  validations: PropTypes.object,
  errors: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
  usePlaceholder: PropTypes.bool,
  inputClassName: PropTypes.string,
};
