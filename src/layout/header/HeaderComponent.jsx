import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Switch } from "@mui/material";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import FilterComponent from "./ui/FilterComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "../../store/darkThemeSlice";
import { authActions } from "../../store/authSlice";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";

const HeaderComponent = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => state.darkTheme);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    localStorage.getItem("token");
    sessionStorage.getItem("token");
  }, [token]);

  const handleThemeChange = () => {
    dispatch(toggleDarkTheme());
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logout successfully! see you later 👋");
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 15 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            SURFBOARDS 4 SALE
          </Typography>

          <Links userRole={userRole} />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {darkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={darkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {token && (
              <Box>
                <AccountCircle />
                <Typography
                  variant="button"
                  color="inherit"
                  onClick={handleLogout}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  Logout
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};

export default HeaderComponent;
