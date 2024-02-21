import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const Error404Page = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("${process.env.PUBLIC_URL}/assets/imgs/404.jpg") center/cover no-repeat fixed`,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", color: "#404040" }}>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h6" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateHome}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default Error404Page;
