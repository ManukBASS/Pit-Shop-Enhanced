import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

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
      localStorage.setItem("cart", JSON.stringify(newArr))
      setCart(newArr);
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, product]))
      setCart([...cart, product]);
    }
  };

  const getQuantityById = (id) => {
    let product = cart.find(e => e.id === id)
    return product?.quantity
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  const deleteById = (id) => {
    const newArr = cart.filter( e => e.id !== id)
    localStorage.setItem("cart", JSON.stringify(newArr))
    setCart(newArr)
  }

  const getTotalPrice = () => {
    const total = cart.reduce((acc, element) => {
      return acc + (element.unit_price * element.quantity) 
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
