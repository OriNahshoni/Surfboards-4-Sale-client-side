import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const GuestGuard = ({ children }) => {
  const userData = useSelector((state) => state.auth.userData);

  return userData && !userData.isBusiness && !userData.isAdmin ? (
    children
  ) : (
    <Navigate to={ROUTES.HOME} replace />
  );
};

export default GuestGuard;
