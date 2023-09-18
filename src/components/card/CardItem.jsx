import { Box, Card, Chip, Typography } from "@mui/material";

const CardItem = ({ image, title, unit_price, stock }) => {
  return (
    <Card
      sx={{
        width: "12.5rem",
        height: "16.5rem",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box>
        <img
          src={image}
          style={{
            width: "12.5rem",
            height: "12rem",
            backgroundSize: "cover",
          }}
          alt={title}
        />
        <Box sx={{ paddingX: ".5rem" }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontSize: ".85rem" }}>
              Price: ${unit_price}
            </Typography>
            <Chip
              label={
                stock === 0 || stock == undefined
                  ? "Stock: 0"
                  : `Stock: ${stock}`
              }
              variant="outlined"
              size="small"
              color={
                stock === 0 || stock == undefined
                  ? "error"
                  : "success"
              }
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardItem;
