import React from "react";
import { Container,  Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  const navigate = useNavigate();
  const handleSignUP = () => {
    navigate(ROUTES.REGISTER);
  };

  const theme = useTheme();

  return (
    <Container
      sx={{
        marginBottom: 30,
        marginTop: 3,
      }}
    >
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage: `url('/assets/imgs/about.jpg')`,
            alt: "businessPIC",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "block",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: theme.spacing(4),
            }}
          >
            <Box
              component="form"
              noValidate
              sx={{
                marginBottom: 2,
                fontSize: "1.2rem",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.2rem",
                  width: "75vw",
                  margin: "center",
                  height: "90vh",
                },
              }}
            >
              <Typography variant="h4" fontFamily="lucida" textAlign="center">
                Welcome to SURFBOARDS 4 SALE!
              </Typography>
              <Typography
                textAlign="center"
                sx={{
                  marginBottom: 2,
                  marginTop:2,
                  fontSize: "1.2rem",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1.2rem",
                    width: "75vw",
                    margin: "center",
                    height: "90vh",
                  },
                }}
              >
                At SURFBOARDS 4 SALE, we're passionate about surfing and
                dedicated to providing surfers of all levels with high-quality
                second-hand surfboards. Whether you're a seasoned pro or just
                starting out, we're here to help you find the perfect board to
                catch those waves and enjoy the thrill of the ocean. <br />
                Our Story: Founded by a group of avid surfers, SURFBOARDS 4 SALE
                started with a simple mission: to make surfing more accessible
                and affordable for everyone. We noticed that many surfers were
                looking for quality surfboards without breaking the bank, so we
                decided to create a platform where surfers could buy and sell
                second-hand boards with ease.
                <br />
                <br />
                Click below to join us now!
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, fontSize: "1.1rem" }}
                onClick={handleSignUP}
              >
                Sign Up!
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
