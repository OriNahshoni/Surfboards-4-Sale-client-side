import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import FooterComponent from "./footer/FooterComponent";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "../store/darkThemeSlice";

const LayoutComponent = ({ children, userRole }) => {
  const { darkTheme } = useSelector((state) => state.darkTheme);

  const dispatch = useDispatch();

  const themes = tmc({
    "text.headerColor": "!#b219e6",
    "text.headerActive": "*#90dbda",
    favActive: "*#e91e63",
    primary: "#a5917e",
    secondary: "#b2102f",
  });

  const darkThemeTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);

  const handleThemeChange = () => {
    dispatch(toggleDarkTheme());
  };

  return (
    <ThemeProvider theme={darkTheme ? darkThemeTheme : lightTheme}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={darkTheme}
        onThemeChange={handleThemeChange}
        userRole={userRole}
      />
      <MainComponent>{children}</MainComponent>
      <FooterComponent />
    </ThemeProvider>
  );
};

export default LayoutComponent;
