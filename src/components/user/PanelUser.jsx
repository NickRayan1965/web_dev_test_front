import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../common/helpers/UseAuth';
import UserTable from './UserTable';
import useFetch from '../../common/helpers/use-fetch';
import useDeleteRequest from '../../common/helpers/use-delete-request';
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import { UserForm } from './UserForm';
import usePatchRequest from '../../common/helpers/use-patch-request';
import { bodyParser } from '../../common/utilities/bodyparser.util';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function PanelUser({onRefresh}) {
  const { jwt, user, logout } = useAuth();
  const { fetchData: fetchUsers } = useFetch('/users');
  const { Delete: deleteUser } = useDeleteRequest('/users');
  const { patch: patchUser } = usePatchRequest('/users');
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const fetchUsersImpl = ({ page, pageSize }) => {
    return fetchUsers({ jwt, query: { page, count: pageSize } });
  };
  const onDelete = useCallback(
    (userId, next) => {
      if (user.id === userId) {
        toast.info('No te puedes eliminar a ti mismo');
        return;
      }
      toast.promise(deleteUser({ jwt, params: '/' + userId }), {
        loading: 'Eliminando usuario',
        success: () => {
          next();
          return 'Usuario eliminado correctamente';
        },
        error: () => {
          return 'Error al eliminar el usuario';
        },
      });
    },
    [deleteUser, jwt, user]
  );
  const onPatchUser = useCallback(
    (data) => {
      const body = bodyParser({ body: data });
      if (!body.password) delete body.password;
      delete body.id;
      delete body.isActive;
      toast.promise(patchUser({ body, jwt, params: '/' + selectedUser.id }), {
        loading: 'Actualizando...',
        success: () => {
          setShowUserForm(false);
          setSelectedUser(null);
          setTimeout(() => {
            onRefresh();
          }, 500);
          return 'Usuario actualizado correctamente';
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
    },
    [jwt, patchUser, selectedUser]
  );
  const onEdit = useCallback((user) => {
    console.log(user);
    setSelectedUser(user);
    setShowUserForm(true);
  }, []);
  useEffect(() => {
    fetchUsers({ jwt });
  }, [jwt, fetchUsers]);
  const navigate = useNavigate();
  return (
    <div className="panel">
      <div className="panel-content transparent-content">
        <UserTable
          onDelete={onDelete}
          onEdit={onEdit}
          fetchUsers={fetchUsersImpl}
        />
        <Dialog
          visible={showUserForm}
          onHide={() => {
            setShowUserForm(false);
            setSelectedUser(null);
          }}
        >
          <UserForm update data={selectedUser} onUpdate={onPatchUser} />
        </Dialog>
      </div>
      <Button
        className="exit-button"
        label="Salir"
        onClick={() => {
          navigate('/login');
          logout();
        }}
      />
    </div>
  );
}
