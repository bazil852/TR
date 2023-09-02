import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { Google } from "../../utils/icons";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    marginTop: "2rem",
    padding: "10px 5px",
    fontFamily: "Barlow, san-serif",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #fff",
    fontSize: 18,
    color: "#fff",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: "none",
      borderColor: "none",
    },
  },
}));

const Login = () => {
  const [error, setError] = useState("");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  console.log("Backend: ", process.env.NEXT_PUBLIC_BACKEND_URL);

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    console.log(res);

    if (!res.error) {
      const session = await getSession();
      if (session.user.accountVerified === false) {
        router.push({
          pathname: "/verify-token",
          query: { email: session.user.email, password: session.user.password },
        });
      } else {
        router.push("/dashboard?selected=0");
      }
    } else {
      setError("Please enter correct email or password");
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mt: 4,
              width: width > 1300 ? "45vw" : width < 1000 ? "70vw" : "50vw",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#262626c4",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 10,
              px: 11,
              py: 8,
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                mt: 2,
                fontSize: "50px",
                color: "white",
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: "nowrap",
                fontFamily: "Barlow, san-serif",
              }}
              color="primary"
              component="h1"
            >
              Welcome Back
            </Typography>
            <Typography
              sx={{ mt: 1, fontFamily: "Barlow, san-serif" }}
              color="#cecece"
              variant="h6"
              fontSize="1rem"
            >
              Log in to access your account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <ValidationTextField
                focused
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                placeholder="Email Address / Username"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <ValidationTextField
                focused
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                id="password"
                autoComplete="current-password"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    fontFamily: "Barlow, san-serif",
                    background:
                      "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                    color: "white",
                    fontWeight: "600",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                      opacity: 0.9,
                    },
                    width: "8rem",
                  }}
                >
                  Login
                </Button>
              </Box>

              {error && (
                <Alert
                  sx={{ mb: 1, fontFamily: "Barlow, san-serif" }}
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              <Box
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                  mt: 3,
                }}
              >
                <Typography fontWeight={600} fontFamily={"Barlow, san-serif"}>
                  Or Login with
                </Typography>
                <Google />
              </Box>
            </Box>
          </Box>
          <Link
            href="register"
            color="#FFFFFF"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              fontFamily: "Barlow, san-serif",
            }}
          >
            Don't have an account?
            <Typography
              sx={{ fontWeight: 800, fontFamily: "Barlow, san-serif" }}
            >
              Sign Up
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default Login;
