import { Calendar } from 'primereact/calendar';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
export default function InputCalendarBlock({
  namefield,
  control,
  title = namefield,
  validations = {},
  errors = {},
}) {
  return (
    <div className="calendar-block">
      <Controller
        control={control}
        name={namefield}
        rules={validations}
        render={({ field }) => (
          <span className="p-float-label input-container">
            <Calendar
              className="height-rem-2"
              {...field}
              showIcon
              dateFormat="dd/mm/yy"
            />
            <label htmlFor="birth_date">{title}</label>
          </span>
        )}
      />
      {errors[namefield] && (
        <small className="p-error">{errors[namefield].message}</small>
      )}
    </div>
  );
}
InputCalendarBlock.propTypes = {
  control: PropTypes.object.isRequired,
  namefield: PropTypes.string.isRequired,
  validations: PropTypes.object,
  errors: PropTypes.object,
  title: PropTypes.string,
};
