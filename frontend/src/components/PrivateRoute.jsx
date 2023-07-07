import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  // logged in user information is stored in userInfo.
  const { currentUser } = useSelector((state) => state.auth);

  // userInfo is present? <Outlet /> else redirect to login page.
  return currentUser ? <Outlet /> : <Navigate to='/register' replace />;
};

export default PrivateRoute;
