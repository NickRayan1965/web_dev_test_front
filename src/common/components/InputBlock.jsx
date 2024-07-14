import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
export default function InputBlock({
  register,
  namefield,
  value,
  title = namefield,
  validations = {},
  errors = {},
  type = 'text',
  classNameOfSpan,
  usePlaceholder = false,
  className = '',
  inputClassName = '',
}) {
  const spanClassName = !usePlaceholder ? 'p-float-label ' : '';

  return (
    <div className={className}>
      <span className={spanClassName.concat(classNameOfSpan)}>
        <InputText
          type={type}
          {...register(namefield, validations)}
          {...(value && { defaultValue: value })}
          className={inputClassName}
          placeholder={usePlaceholder ? title : ''}
        />
        {!usePlaceholder && <label htmlFor={namefield}>{title}</label>}
      </span>
      {errors[namefield] && (
        <small className="p-error">{errors[namefield].message}</small>
      )}
    </div>
  );
}
InputBlock.propTypes = {
  register: PropTypes.func.isRequired,
  namefield: PropTypes.string.isRequired,
  validations: PropTypes.object,
  classNameOfSpan: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string,
  usePlaceholder: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};
