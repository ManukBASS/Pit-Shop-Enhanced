import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// TO-DO: Render Chekout in Cart

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "en-EN",
  });

  const [orderId, setOrderId] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [userData, setUserData] = useState({
    cp: "",
    phone: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status");

  useEffect(() => {
    // Here we save the order when the payment is already confirmed
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved") {
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );

      order.items.forEach((element) => {
        updateDoc(doc(db, "products", element.id), {
          stock: element.stock - element.quantity,
        });
      });

      localStorage.removeItem("order");
      clearCart();
    }
  }, [paramValue]);

  let total = getTotalPrice();

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
        "https://pit-shop-backend-qmnxcd6gh-manukbass.vercel.app/create_preference",
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
    let order = {
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      total: total,
      email: user.email,
    };
    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();

    if (id) {
      setPreferenceId(id);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!orderId ? (
        <>
          <Typography variant="h5" sx={{ mb: "1rem" }}>
            Checkout
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "20rem",
            }}
          >
            <TextField
              required
              name="cp"
              variant="outlined"
              label="Postal Code"
              onChange={handleChange}
            />
            <TextField
              required
              name="phone"
              variant="outlined"
              label="Phone"
              onChange={handleChange}
            />
          </Box>
          <Button sx={{ mt: "1rem" }} onClick={handleBuy}>
            Select payment method
          </Button>
        </>
      ) : (
        <>
          <h4>Payment completed !</h4>
          <h4>Your order number is: {orderId}</h4>
          <Link to="/shop">Continue shopping</Link>
        </>
      )}

      {preferenceId && (
        <Button sx={{ mt: "1rem" }} disabled>
          <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
        </Button>
      )}
    </Box>
  );
};

export default Checkout;
