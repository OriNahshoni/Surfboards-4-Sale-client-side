import { NavLink } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

const NavLinkComponent = ({ to, children }) => {
  return (
    <Grid item xs={6} sm={3}>
      <NavLink to={to}>
        {({ isActive }) => (
          <Typography
            color={isActive ? "text.headerActive" : "text.primary"}
            sx={{ p: 2, fontWeight: 600 }}
          >
            {children}
          </Typography>
        )}
      </NavLink>
    </Grid>
  );
};

export default NavLinkComponent;
