import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const theme = createTheme({
    palette: {
      primary: {
        main: "#BC5449",
      },
    },
  });


  const handleChange = (e) => {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await signUp(userCredentials)
    if(res.user.uid){
      await setDoc(doc(db, "users", res.user.uid), {rol: "user"})
    }
    navigate("/login")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?formula-1)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
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
            }}
          >
            <Avatar src="/public/favicon.ico" sx={{ m: 1 }} />
            <Typography component="h1" variant="h5">
              Create your account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                name="password"
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                required
                margin="normal"
                fullWidth
                label="Password"
              />
              <TextField
                name="confirmPassword"
                onChange={handleChange}
                id="outlined-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                required
                margin="normal"
                fullWidth
                label="Confirm Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Button onClick={() => navigate("/login")} size="small">
                    {"Already have an account? Sign In"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
