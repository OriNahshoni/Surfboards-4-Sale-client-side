import React from "react";
import { Container, Divider, Typography, Box} from "@mui/material";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const WelcomeComponent = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <Container
      sx={{
        backgroundColor: "background.paper",
        padding: 3,
        backgroundImage: `url('/assets/imgs/ocean.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" textAlign="center" mt={3} color="primary">
        SURFBOARS 4 SALE!
      </Typography>
      <Typography
        variant="body1"
        fontWeight={600}
        textAlign="center"
        mt={3}
        color="text.primary"
      >
        Find your perfect surfboard at Surfboards 4 Sale.
        <br /> Explore our wide selection of high-quality used surfboards at
        affordable prices.
        <br />
        Or registere as a business account and post a surfboard for sale.
      </Typography>

      <Box mt={3} mb={3} textAlign="center">
        <Fab
          size="large"
          color="primary"
          variant="extended"
          onClick={handleSignUp}
        >
          Create an account
        </Fab>
      </Box>

      <Divider mt={3} />
    </Container>
  );
};

export default WelcomeComponent;
