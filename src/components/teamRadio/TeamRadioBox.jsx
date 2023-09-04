import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TeamRadioBox = ({ headerText, message }) => {
  return (
    <Box
      sx={{
        border: "1px solid #DDDDDD",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#BC5449",
          color: "white",
          padding: "8px",
          borderRadius: "4px 4px 0 0",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {headerText}
      </Typography>
      <Typography  variant="body1" sx={{ marginTop: "8px", fontStyle: "italic" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default TeamRadioBox;

