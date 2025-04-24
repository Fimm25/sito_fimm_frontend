import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token'); // Ottieni il token dal localStorage

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
