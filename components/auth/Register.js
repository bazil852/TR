import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import Copyright from "../Copyright";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#292929",
    border: "1px solid #ced4da",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
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

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();

    if (newData.status == 409) {
      setLoading(false);

      setError("Email already exists");
    } else {
      const res = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      const session = await getSession();
      setLoading(false);
      setError("");
      // router.push({pathname: '/verify-token', query: {email: session.user.email}});
      router.push("/verify-token");
    }
  };

  return (
    <>
      <Container
        sx={{
          background: "#191919",
          borderRadius: 5,
          p: 1,
          border: "1px solid #666666",
        }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography
            sx={{ mt: 1 }}
            color="primary"
            component="h1"
            variant="h5"
          >
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  First Name:
                </Typography>
                <ValidationTextField
                  focused
                  required
                  autoComplete="given-name"
                  fullWidth
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Last Name:
                </Typography>
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Email Address:
                </Typography>
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Password:
                </Typography>
                <ValidationTextField
                  color="primary"
                  focused
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              loading={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            {error && (
              <Alert sx={{ mb: 1 }} severity="error">
                {error}
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link color="#795BFF" href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default Register;
