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
        backgroundColor: "#BC5449",
        flexDirection: "row",
        "@media (max-width: 600px)": {
          flexDirection: "column",
          gap: "1rem",
          p: "1rem",
        },
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
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{
            width: "4rem",
            "@media (max-width: 600px)": {
              width: "3rem",
            },
          }}
        />
        <Typography
          variant="subtitle1"
          color="whitesmoke"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.875rem",
            },
          }}
        >
          Pit-Shop
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <CopyrightIcon htmlColor="whitesmoke" />
        <Typography
          variant="subtitle1"
          color="whitesmoke"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.875rem",
            },
          }}
        >
          ManukBASS
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
