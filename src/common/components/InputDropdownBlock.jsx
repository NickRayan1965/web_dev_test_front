import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
export default function InputDropdownBlock({
  namefield,
  control,
  data,
  title,
  defaultValue,
  className = '',
  inputClassName = '',
}) {
  const dropdownClassName = 'use-all-with align-center'.concat(
    inputClassName ? ' '.concat(inputClassName) : ''
  );
  return (
    <div className={'input-dropdown-block '.concat(className)}>
      <Controller
        name={namefield}
        control={control}
        render={({ field }) => {
          return (
            <span className="p-float-label input-container">
              <Dropdown
                inputId={namefield}
                options={data}
                value={field.value || defaultValue}
                onChange={(e) => field.onChange(e.value)}
                className={dropdownClassName}
              />
              <label htmlFor={namefield}>{title}</label>
            </span>
          );
        }}
      />
    </div>
  );
}
InputDropdownBlock.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  namefield: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};
