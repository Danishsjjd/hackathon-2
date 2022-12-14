import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getLogin, getUser } from "../store/authSlice";

const PrivateRoutes = ({ redirect = "/", element, role = "user" }) => {
  const isLogin = useSelector(getLogin);
  const user = useSelector(getUser);
  if (!isLogin) return <Navigate to={redirect} replace />;
  if (role !== user?.role) return <Navigate to={redirect} replace />;
  return element || <Outlet />;
};

export default PrivateRoutes;
