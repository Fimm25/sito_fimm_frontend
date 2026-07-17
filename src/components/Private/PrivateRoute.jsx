import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  const { user } = useUser();

  return user
      ? element
      : <Navigate to="/login" replace />;
};

export default PrivateRoute;