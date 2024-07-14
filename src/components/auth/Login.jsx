import { useForm } from 'react-hook-form';
import '../../css/app.css';
import { Button } from 'primereact/button';
import {
  maxLength,
  minLength,
  required,
} from '../../common/validators/primereact-validators';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../common/helpers/UseAuth';
import InputBlock from '../../common/components/InputBlock';
import { toast } from 'sonner';
import RedirectLoginRegister from './RedirectLoginRegister';
import isValidJson from '../../common/utilities/isValidJson.util';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((dataForm) => {
    login(dataForm)
      .then(() => {
        navigate('/users');
      })
      .catch((e) => {
        const message = JSON.parse(isValidJson(e?.message) ? e.message : '{}');
        if (message?.statusCode === 401) {
          toast.error('Credenciales inválidas');
          return;
        }
        toast.error('Ocurrió un error al iniciar sesión');
      });
  });
  return (
    <div className="centered-form-container user-form">
      <form onSubmit={onSubmit} className="transparent-content">
        <span className="form-container-title">Iniciar Sesión</span>
        <div className="form-box">
          <br />
          <InputBlock
            register={register}
            namefield="username"
            title={'Nombre de Usuario'}
            errors={errors}
            validations={{
              required,
              minLength: minLength(4),
              maxLength: maxLength(20),
            }}
          />
          <br />
          <br />
          <InputBlock
            type="password"
            register={register}
            namefield="password"
            title={'Contraseña'}
            errors={errors}
            validations={{
              required,
              minLength: minLength(4),
              maxLength: maxLength(20),
            }}
          />
          <Button
            type="submit"
            label="Iniciar sesión"
            className="submit-button"
          />
          <RedirectLoginRegister
            redirectTo="/register"
            message="¿No tienes una cuenta?"
            linkMessage="Regístrate"
          />
        </div>
      </form>
    </div>
  );
}
