import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, Typography } from "@mui/material";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  initMercadoPago("APP_USR-602709f8-9f3a-4935-935f-d0371d49525a", {
    locale: "en-US",
  });

  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    const newArr = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });

    try {
      let response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          items: newArr,
          shipment_cost: 10,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();

    if (id) {
      setPreferenceId(id);
    }
  };

  return <div>
    <Typography>Checkout</Typography>
    <Button onClick={handleBuy}>Select payment method</Button>

    {
      preferenceId && <Wallet initialization={{preferenceId, redirectMode: "modal"}} />
    }
  </div>;
};

export default Checkout;
