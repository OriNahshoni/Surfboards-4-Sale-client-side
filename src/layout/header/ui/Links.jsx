import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import {
  loggedInLinksGuest,
  loggedInLinksIsBusiness,
  loggedOutLinks,
  loggedInLinksAdmin,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userRole = useSelector((state) => state.auth.userRole);

  const linksToUserRole = () => {
    switch (userRole) {
      case "guest":
        return loggedIn ? loggedInLinksGuest : loggedOutLinks;
      case "business":
        return loggedInLinksIsBusiness;
      case "admin":
        return loggedInLinksAdmin;
      default:
        return loggedOutLinks;
    }
  };

  const linksToShow = linksToUserRole();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {linksToShow.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={nextKey()}>
          {myItem.children}
        </NavLinkComponent>
      ))}
    </Box>
  );
};

export default Links;
