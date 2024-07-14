import { UserForm } from './components/user/UserForm';
import { LoginForm } from './components/auth/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import PanelTask from './components/task/PanelTask';
import PanelUser from './components/user/PanelUser';
import { useState } from 'react';
export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  let routes = (
    <Routes key={refreshKey}>
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
            <PanelUser onRefresh={handleRefresh}/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
  return routes;
}
