import { UserForm } from './components/user/UserForm';
import { LoginForm } from './components/auth/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import TaskForm from './components/task/TaskForm';
import PrivateRoute from './auth/privateRoute';
import {} from 'react-router-dom';
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
            <TaskForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
  return routes;
}
