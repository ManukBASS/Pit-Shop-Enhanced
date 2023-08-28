import { createContext, useState } from "react"

export const CartContext = createContext()

const CartContextComponent = ({children}) => {

  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const data = {
    cart,
    addToCart
  }

  return <CartContext.Provider value={data}>
    {children}
  </CartContext.Provider>
}

export default CartContextComponent