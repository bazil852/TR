import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import Copyright from "../Copyright";
import { useRouter } from "next/router";
import "typeface-poppins";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    fontFamily: "Barlow, san-serif",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    marginTop: "5px",
    padding: "10px 5px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #fff",
    fontFamily: "Barlow, san-serif",
    fontSize: 18,
    color: "#fff",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&::placeholder": {
      color: "#ffffff",
    },
  },
}));

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(payload);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}users/register`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response.json();

    if (!response.ok) {
      setLoading(false);

      setError("Email already exists");
    } else {
      setLoading(false);
      setError("");
      router.push({
        pathname: "/verify-token",
        query: { email: payload.email, password: payload.password },
      });
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          pt: 12,
        }}
        component="main"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "65vw",
            alignItems: "center",
            marginTop: "-5%",
            borderRadius: 10,
            px: 10,
            py: 5,
            background: "#262626c4",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: 10,
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                mt: 1,
                fontSize: "50px",
                color: "white",
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "Barlow, san-serif",
              }}
              color="primary"
              component="h1"
            >
              Start Signup
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: "50px",
                color: "white",
                fontWeight: 900,
                fontFamily: "Barlow, san-serif",
                lineHeight: 1,
              }}
              color="primary"
              component="h1"
            >
              for free
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#CCC2CF",
                fontWeight: "400",
                lineHeight: 4,
                fontFamily: "Barlow, san-serif",
              }}
            >
              Create your free account
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ValidationTextField
                  color="primary"
                  focused
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    pt: 2,
                    pb: 4,
                  }}
                >
                  <Checkbox
                    style={{
                      color: "white",
                      "&$checked": {
                        color: "white",
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Barlow, san-serif" }}
                  >
                    By signing up you agree to our{" "}
                    <Link sx={{ fontFamily: "Barlow, san-serif" }}>
                      terms and conditions
                    </Link>
                    .
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                sx={{
                  mb: 5,
                  height: "40px",
                  width: "180px",
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "Barlow, san-serif",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                    opacity: 0.9,
                  },
                }}
              >
                Sign Up
              </LoadingButton>
            </Box>
            {error && (
              <Alert sx={{ mb: 1 }} severity="error">
                {error}
              </Alert>
            )}
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="login"
                  color="#FFFFFF"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                    fontFamily: "Barlow, san-serif",
                  }}
                >
                  Already have an account?
                  <Typography
                    sx={{ fontWeight: 800, fontFamily: "Barlow, san-serif" }}
                  >
                    Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Copyright sx={{ mt: 8, pb: 3 }} />
    </>
  );
};

export default Register;
