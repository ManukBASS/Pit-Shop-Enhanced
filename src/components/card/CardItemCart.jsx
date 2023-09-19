import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Chip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CardItemCart = ({ product, deleteById }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <Box sx={{ gap: "2rem", display: "flex", mt: "1rem" }}>
      <Card
        sx={{
          display: "flex",
          width: "20rem",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <img width={"20%"} src={product.image} alt={product.title} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            pl: "1rem",
          }}
        >
          <Typography variant="subtitle1">{product.title}</Typography>
          <Chip
            label={`Quantity: ${product.quantity}`}
            variant="outlined"
            size="small"
            color={"success"}
            sx={{ width: "6rem" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="more"
            aria-controls={`long-menu-${product.id}`}
            aria-expanded={Boolean(anchorEl)}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={`long-menu-${product.id}`}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "13ch",
              },
            }}
          >
            <Link to={`/itemDetail/${product.id}`}>
              <Button
                color="inherit"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: ".5rem",
                  width: "100%"
                }}
                onClick={handleClose}
              >
                <VisibilityIcon color="info" />
                View
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                deleteById(product.id);
                handleClose();
              }}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: ".5rem",
                width: "100%"
              }}
            >
              <DeleteForeverIcon color="error" />
              Delete
            </Button>
          </Menu>
        </Box>
      </Card>
    </Box>
  );
};

export default CardItemCart;
