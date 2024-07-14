import { InputTextarea } from 'primereact/inputtextarea';
import PropTypes from 'prop-types';
export default function InputTextAreaBlock({
  register,
  namefield,
  value,
  title = namefield,
  validations = {},
  errors = {},
}) {
  return (
    <div>
      <span className="p-float-label input-container">
        <InputTextarea
          autoResize
          id={namefield}
          {...register(namefield, {
            ...validations,
          })}
          {...(value && { defaultValue: value })}
        />
        <label htmlFor={namefield}>{title}</label>
      </span>
      {errors[namefield] && (
        <small className="p-error">{errors[namefield].message}</small>
      )}
    </div>
  );
}
InputTextAreaBlock.propTypes = {
  register: PropTypes.func.isRequired,
  namefield: PropTypes.string.isRequired,
  validations: PropTypes.object,
  errors: PropTypes.object,
  value: PropTypes.string,
  title: PropTypes.string,
};
