import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box"
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div>
      <h1>Cart</h1>
      {
        cart.length > 0 && <Button variant="outlined"><Link to="/checkout">Start Checkout</Link></Button>
      }
      {cart.map((product) => {
        return (
          // <Card key={product.id}>
          //   <Box></Box>
          // </Card>
          <div key={product.id} style={{width: "12.5rem", border: "1px solid red"}}>
            <h6>{product.title}</h6>
            <h6>{product.quantity}</h6>
            <button onClick={() => deleteById(product.id)}>Delete</button>
          </div>
        );
      })}
      <h5>Final amount: ${total}</h5>
      <button onClick={clearCart}>Clean cart</button>
    </div>
  );
};

export default Cart;
