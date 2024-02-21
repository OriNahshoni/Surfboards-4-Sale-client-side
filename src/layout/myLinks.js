import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.FAVCARDS, children: "Favorite cards" },
  { to: ROUTES.EDITCARD, children: "Edit card" },
  { to: ROUTES.CREATECARD, children: "Create card" },
  { to: ROUTES.MYCARDS, children: "My cards" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const loggedInLinksGuest = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.FAVCARDS, children: "Favorite surfboards" },
];
const loggedInLinksIsBusiness = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.FAVCARDS, children: "Favorite surfboards" },
  { to: ROUTES.MYCARDS, children: "My surfboards" },
  { to: ROUTES.CREATECARD, children: "post a surfboard" },
];
const loggedInLinksAdmin = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.FAVCARDS, children: "Favorite surfboards" },
  { to: ROUTES.MYCARDS, children: "My surfboards" },
  { to: ROUTES.CREATECARD, children: "post a surfboard" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];
const loggedOutLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

export default myLinks;
export {
  loggedInLinksGuest,
  loggedInLinksIsBusiness,
  loggedOutLinks,
  loggedInLinksAdmin,
};
