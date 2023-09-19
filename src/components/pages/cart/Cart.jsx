import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CardItemCart from "../../card/CardItemCart";
import { Alert, Snackbar, Typography } from "@mui/material";

// TO-DO: Add Skeleton | Render Checkout

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const clearShoppingCart = () => {
    clearCart()
    setOpen(true)
    setMessage("Your shopping cart has been cleared !")
  }

  let total = getTotalPrice();

  return (
    <Box>
      <Typography variant="h4" component="div">
        Your Cart
      </Typography>
      {cart.map((product) => (
        <CardItemCart
          key={product.id}
          product={product}
          deleteById={deleteById}
        />
      ))}
      {cart.length > 0 && (
        <Button
          sx={{ mt: "2rem" }}
          variant="outlined"
          component={Link}
          to="/checkout"
        >
          Start Checkout
        </Button>
      )}
      <Typography variant="h6">Final amount: ${total}</Typography>
      <Button variant="outlined" onClick={clearShoppingCart}>
        Clean cart
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
