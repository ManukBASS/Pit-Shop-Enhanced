import { Box, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5rem",
        backgroundColor: '#BC5449'
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <img src="/images/logo.png" alt="Logo" style={{ width: "4rem" }} />
        <Typography variant="subtitle1" color="whitesmoke">Pit-Shop</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <CopyrightIcon htmlColor="whitesmoke"/>
        <Typography variant="subtitle1" color="whitesmoke">ManukBASS</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
