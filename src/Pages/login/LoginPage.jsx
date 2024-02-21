import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { validateLogin } from "../../validation/loginValidation";
import { Alert } from "@mui/material";
import { storeToken } from "../../service/storageService";
import { authActions } from "../../store/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorsState, setErrorsState] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDontHaveAnAccount = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const errors = validateLogin({
        email: emailValue,
        password: passwordValue,
      });
      if (errors) {
        setErrorsState(errors);
        return;
      }

      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      const { jwt, _doc } = response.data;
      if (!jwt || !_doc) {
        throw new Error("Token or user data missing in login response");
      }
      const { isAdmin, isBusiness, _id } = _doc;

      dispatch(authActions.login({ token: jwt, isAdmin, isBusiness, _id }));
      storeToken(jwt, rememberMe);
      toast("Login successful", { type: "success" });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Login failed:", error);
      toast("Login failed. Please try again.", { type: "error" });
    }
  };

  const handleEmailInputChange = (e) => {
    setEmailValue(e.target.value);
    setIsSubmitDisabled(e.target.value === "" || passwordValue === "");
  };

  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
    setIsSubmitDisabled(e.target.value === "" || emailValue === "");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Grid container component="main" sx={{ height: "80vh", margin: 3 }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('/assets/imgs/login.jpg')`,
          alt: "login",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign in</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailInputChange}
            />
            {errorsState && errorsState.email && (
              <Alert severity="warning">{errorsState.email}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordInputChange}
            />
            {errorsState && errorsState.password && (
              <Alert severity="warning">{errorsState.password}</Alert>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitDisabled}
            >
              Sign In
            </Button>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleDontHaveAnAccount}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
