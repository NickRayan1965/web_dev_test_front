import usePostRequest from '../../common/helpers/use-post-request';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import '../../css/app.css';
import { Button } from 'primereact/button';
import {
  maxLength,
  minLength,
  required,
} from '../../common/validators/primereact-validators';
import { toast } from 'sonner';
export function UserForm() {
  const { post } = usePostRequest('/user');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    toast.promise(post({ body: data }), {
      loading: 'Guardando...',
      success: () => {
        reset();
        return 'Usuario guardado correctamente';
      },
      error: (e) => {
        if (e?.message === 'Conflict') {
          return 'El nombre de usuario ya está en uso';
        }
        return 'Error al guardar el usuario';
      }
    });
  });
  return (
    <div className="centered-form-container">
      <form onSubmit={onSubmit}>
        <span className="form-container-title">Registro de Usuario</span>
        <div className="form-box">
          <span className="p-float-label input-container">
            <InputText
              id="username"
              {...register('username', {
                required,
                minLength: minLength(4),
                maxLength: maxLength(20),
              })}
            />
            <label htmlFor="username">Nombre de Usuario</label>
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </span>
          <span className="p-float-label input-container">
            <InputText
              type="password"
              id="password"
              {...register('password', {
                required,
                minLength: minLength(4),
                maxLength: maxLength(20),
              })}
            />
            <label htmlFor="username">Contraseña</label>
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </span>
          <Button type="submit" label="Submit" className="submit-button" />
        </div>
      </form>
    </div>
  );
}
