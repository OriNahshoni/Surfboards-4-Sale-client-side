import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AuthGuard = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return loggedIn ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

export default AuthGuard;
