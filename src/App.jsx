import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin(); //false is default
      } catch (err) {
        console.error(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, [autoLogin]);
  return (
    <LayoutComponent>
      <ToastContainer />
      {doneAuth ? <Router /> : <LinearProgress />}
    </LayoutComponent>
  );
};

export default App;
