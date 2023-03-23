import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";
import { axiosClient } from "../api/api.ts";
import { SnackBar } from "./SnackBar";
import { useNavigate } from "react-router-dom";

const formValidations = {
  email: [
    (value) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ),
    "Formato de email incorrecto",
  ],
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
const rememberInitial = localStorage.getItem('remember') === 'true';
const rememberUserInitial = localStorage.getItem('user');

export const SignIn = ({ user }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [remember, setRemember] = useState(rememberInitial);
  const [rememberUser, setRememberUser ] = useState(JSON.parse(rememberUserInitial));

  const navigate = useNavigate();
  const {
    handleTouch,
    touched,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
    formState,
  } = useForm(
    {
      email: rememberUser?.email || "",
      password: rememberUser?.password || "",
    },
    formValidations,
    {
      email: false,
      password: false,
    }
  );

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosClient
      .post("users/user", formState)
      .then(({ data }) => {
        sessionStorage.removeItem("user");
        if (remember) {
          localStorage.setItem('user', JSON.stringify(data[0]));
        }
        user(JSON.stringify(data[0]));
        navigate("/dashboard", {
          replace: true,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 401) {
          setShowSnackBar(true);
        }
      });
  };

  const rememberSession = (e) => {
    localStorage.removeItem('remember');
    localStorage.setItem('remember', JSON.stringify(e.target.checked));
    setRemember(e.target.checked);
    if(!e.target.checked) {
      localStorage.removeItem('user');
    }
  };

  return (
    <>
      <SnackBar
        showSnackBar={showSnackBar}
        message={"Usuario o contraseña incorrectos"}
        severity={"error"}
        onClosed={() => setShowSnackBar(false)}
      />
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
              Iniciar sesión
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
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
                value={formState?.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={() => handleTouch("password")}
                onChange={onInputChange}
                error={touched["password"] && !!passwordValid}
                helperText={touched["password"] && passwordValid}
                value={formState?.password}
              />
              <FormControlLabel
                control={<Checkbox color="primary" onChange={(event) => rememberSession(event)} checked={remember === true} />}
                onClick={rememberSession}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste la contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    ¿No tiene cuenta? Registrate aquí
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
