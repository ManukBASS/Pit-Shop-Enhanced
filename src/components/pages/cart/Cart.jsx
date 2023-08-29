import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={clearCart}>Clean cart</button>
      {cart.map((product) => {
        return (
          <div key={product.id} style={{width: "12.5rem", border: "1px solid red"}}>
            <h6>{product.title}</h6>
            <h6>{product.quantity}</h6>
            <button onClick={() => deleteById(product.id)}>Delete</button>
          </div>
        );
      })}
      <h5>Final amount: ${total}</h5>
    </div>
  );
};

export default Cart;
