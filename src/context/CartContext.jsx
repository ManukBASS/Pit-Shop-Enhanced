import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let exist = cart.some(e => e.id === product.id);

    if (exist) {
      let newArr = cart.map(element => {
        if (element.id === product.id) {
          return { ...element, quantity: product.quantity };
        } else {
          return element;
        }
      });
      setCart(newArr);
    } else {
      setCart([...cart, product]);
    }
  };

  const getQuantityById = (id) => {
    let product = cart.find(e => e.id === id)
    return product?.quantity
  }

  const clearCart = () => {
    setCart([])
  }

  const deleteById = (id) => {
    const newArr = cart.filter( e => e.id !== id)
    setCart(newArr)
  }

  const getTotalPrice = () => {
    const total = cart.reduce((acc, e) => {
      return acc + (e.unit_price * e.quantity) 
    }, 0)
    return total
  }

  const data = {
    cart,
    addToCart,
    getQuantityById,
    clearCart,
    deleteById,
    getTotalPrice
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
