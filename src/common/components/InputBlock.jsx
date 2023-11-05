import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
export default function InputBlock({
  register,
  namefield,
  title = namefield,
  validations = {},
  errors = {},
  type = 'text',
}) {
  return (
    <div>
      <span className="p-float-label input-container">
        <InputText type={type}
          {...register(namefield, {
            ...validations,
          })}
        />
        <label htmlFor="username">{title}</label>
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
  errors: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string,
};
