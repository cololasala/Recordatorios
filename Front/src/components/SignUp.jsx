import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../hooks/useForm";
import { axiosClient } from "../api/api.ts";
import { CustomSnackBar } from "./CustomSnackBar";
import { useState, useEffect } from "react";

const formValidations = {
  firstName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  lastName: [(value) => value.length >= 1, "El apellido es obligatorio"],
  email: [(value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value), "Formato de email incorrecto"],
  password: [
    (value) => value.length >= 6,
    "El password debe ser mayor a 6 caracteres",
  ],
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © Luciano Lasala {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

export const SignUp = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const {
    handleTouch,
    touched,
    onInputChange,
    isFormValid,
    firstNameValid,
    lastNameValid,
    emailValid,
    passwordValid,
    formState,
    onResetForm
  } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    formValidations,
    {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosClient
      .post("users", formState)
      .then(() => {
        setShowSnackBar(true);
        onResetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, [])
  

  return (
    <>
      <CustomSnackBar showSnackBar={showSnackBar} message={'El usuario fue creado exitosamente'} severity={"success"} onClosed={() => setShowSnackBar(false)}/>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    onChange={onInputChange}
                    onBlur={() => handleTouch("firstName")}
                    error={touched["firstName"] && !!firstNameValid}
                    helperText={touched["firstName"] && firstNameValid}
                    value={formState.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="family-name"
                    onBlur={() => handleTouch("lastName")}
                    onChange={onInputChange}
                    error={touched["lastName"] && !!lastNameValid}
                    helperText={touched["lastName"] && lastNameValid}
                    value={formState.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    onBlur={() => handleTouch("email")}
                    onChange={onInputChange}
                    error={touched["email"] && !!emailValid}
                    helperText={touched["email"] && emailValid}
                    value={formState.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onBlur={() => handleTouch("password")}
                    onChange={onInputChange}
                    error={touched["password"] && !!passwordValid}
                    helperText={touched["password"] && passwordValid}
                    value={formState.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid}
              >
                Registrarse
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-in" variant="body2">
                    ¿Tiene cuenta? Iniciar sesión
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
