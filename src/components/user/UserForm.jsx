import usePostRequest from '../../common/helpers/use-post-request';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import {
  isEmailPattern,
  maxLength,
  minLength,
  required,
} from '../../common/validators/primereact-validators';
import { toast } from 'sonner';
import InputBlock from '../../common/components/InputBlock';
import RedirectLoginRegister from '../auth/RedirectLoginRegister';
import { bodyParser } from '../../common/utilities/bodyparser.util';
import PropTypes from 'prop-types';

export function UserForm({ update = false, data, onUpdate }) {
  const title = update ? 'Actualizar Usuario' : 'Registrar Usuario';
  const { post } = usePostRequest('/auth/register');
  const getDefaults = (data) => {
    return data ? data : {};
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: getDefaults(data),
  });
  const onSubmit = handleSubmit((data) => {
    if (update) {
      onUpdate(data);
      return;
    }
    toast.promise(post({ body: bodyParser({ body: data }) }), {
      loading: 'Guardando...',
      success: () => {
        reset();
        return 'Usuario guardado correctamente';
      },
      error: (e) => {
        const responseError = JSON.parse(e.message);
        if (responseError?.statusCode === 409) {
          const msg = Array.isArray(responseError?.message)
            ? responseError.message[0]
            : 'Ya existe un usuario con los datos ingresados';
          return msg;
        }
        return 'Error al guardar el usuario';
      },
    });
  });

  return (
    <div className="centered-form-container user-form ">
      <form onSubmit={onSubmit} className="transparent-content">
        <span className="form-container-title">{title}</span>
        <div className="form-box">
          <br />
          <InputBlock
            namefield="name"
            register={register}
            errors={errors}
            title="Nombres"
            validations={{
              maxLength: maxLength(100),
              required: false,
            }}
            usePlaceholder={true}
          />
          <br />
          <br />
          <InputBlock
            namefield="lastname"
            register={register}
            errors={errors}
            title="Apellidos"
            validations={{
              maxLength: maxLength(100),
              required: false,
            }}
            usePlaceholder={true}
          />
          <br />
          <br />
          <InputBlock
            namefield="email"
            register={register}
            errors={errors}
            title="Email"
            validations={{
              maxLength: maxLength(200),
              required: false,
              pattern: isEmailPattern(),
            }}
            usePlaceholder={true}
          />
          <br />
          <br />
          <InputBlock
            namefield="username"
            register={register}
            errors={errors}
            title="Nombre de Usuario"
            validations={{
              required,
              minLength: minLength(4),
              maxLength: maxLength(50),
            }}
            usePlaceholder={true}
          />
          <br /> <br />
            <InputBlock
              namefield="password"
              register={register}
              errors={errors}
              title="Contraseña"
              validations={{
                required: !update,
                minLength: minLength(4),
                maxLength: maxLength(50),
              }}
              type="password"
            />
          <Button
            type="submit"
            label={update ? 'Guardar' : 'Registrar'}
            className="submit-button"
          />
          {!update && (
            <RedirectLoginRegister
              redirectTo="/login"
              message="¿Ya tienes una cuenta?"
              linkMessage="Inicia Sesión"
            />
          )}
        </div>
      </form>
    </div>
  );
}
UserForm.propTypes = {
  update: PropTypes.bool,
  data: PropTypes.object,
  onUpdate: PropTypes.func,
}