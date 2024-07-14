import { UserForm } from './components/user/UserForm';
import { LoginForm } from './components/auth/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/privateRoute';
import {} from 'react-router-dom';
import PanelTask from './components/task/PanelTask';
import PanelUser from './components/user/PanelUser';
export default function App() {
  let routes = (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<UserForm />} />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <PanelTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <PanelUser />
          </PrivateRoute>
        }
      />
    </Routes>
  );
  return routes;
}
