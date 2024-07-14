import usePostRequest from '../../common/helpers/use-post-request';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import {
  maxLength,
  minLength,
  required,
} from '../../common/validators/primereact-validators';
import { toast } from 'sonner';
import InputBlock from '../../common/components/InputBlock';
import { useCallback } from 'react';
import useAuth from '../../common/helpers/UseAuth';
import PropTypes from 'prop-types';
export function TaskCategoryFloatForm({
  setCategoryWasCreated,
}) {
  const { jwt } = useAuth();
  const { post } = usePostRequest('/task-category');
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();
  const onSuccess = useCallback(() => {
    setCategoryWasCreated(e => !e);
    reset();
    return 'Categoría guardada correctamente';
  }, [reset, setCategoryWasCreated]);
  const onSubmit = handleSubmit((data) => {
    toast.promise(post({ body: data, jwt }), {
      loading: 'Guardando...',
      success: onSuccess,
      error: (e) => {
        console.log(e);
        if (e?.message === 'Conflict') {
          return 'Ya existe una categoría con ese nombre';
        }
        return 'Error al guardar el la categoría';
      },
    });
  });
  const handleValidationAndSubmit = useCallback(async () => {
    const isValid = await trigger();
    if (isValid) {
      onSubmit();
    }
  }, [onSubmit, trigger]);
  return (
    <form>
      <InputBlock
        classNameOfSpan={'input-container'}
        namefield="name"
        register={register}
        errors={errors}
        title="Nombre"
        validations={{
          required,
          minLength: minLength(4),
          maxLength: maxLength(20),
        }}
      />
      <Button
        type="button"
        label="Agregar"
        className="submit-button"
        onClick={handleValidationAndSubmit}
      />
    </form>
  );
}
TaskCategoryFloatForm.propTypes = {
  setCategoryWasCreated: PropTypes.func.isRequired,
};
