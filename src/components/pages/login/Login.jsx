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
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { db, googleLogin, onSignIn } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

// TO-DO: Check Google Login

const Login = () => {
  const { handleLogIn } = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#BC5449",
      },
    },
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await onSignIn(userCredentials);
      if (res.user) {
        const userCollection = collection(db, "users");
        const userRef = doc(userCollection, res.user.uid);
        const userDoc = await getDoc(userRef);
        let finalUser = {
          email: res.user.email,
          rol: userDoc.data().rol,
        };

        handleLogIn(finalUser);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleLogin();
      let finalUser = {
        email: res.user.email,
        rol: "user",
      };
      handleLogIn(finalUser)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

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
              Welcome to our shop
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                type="button"
                fullWidth
                sx={{
                  color: "white",
                  textTransform: "none",
                  mb: 3,
                }}
              >
                Sign In with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button
                    onClick={() => navigate("/forgot-password")}
                    size="small"
                  >
                    Forgot password?
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => navigate("/register")} size="small">
                    {"Don't have an account? Create One"}
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

export default Login;
