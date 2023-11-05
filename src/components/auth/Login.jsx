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

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((dataForm) => {
    console.log(dataForm);
    login(dataForm)
      .then(() => {
        console.log('login success');
        navigate('/tasks');
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div className="centered-form-container">
      <form onSubmit={onSubmit}>
        <span className="form-container-title">Iniciar Sesión</span>
        <div className="form-box">
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
        </div>
      </form>
    </div>
  );
}
