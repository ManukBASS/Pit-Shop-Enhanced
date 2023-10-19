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
import { forgotPassword } from "../../../firebaseConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#BC5449",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    navigate("/login");
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 20,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src="favicon.ico" sx={{ m: 1 }} />
            <Typography component="h1" variant="h5">
              ¿Forgot your password?
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                sx={{ mt: "1.5rem" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Recover
              </Button>
              <Grid container>
                <Grid item>
                  <Button onClick={() => navigate("/login")} size="small">
                    {"Back to Login"}
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

export default ForgotPassword;
