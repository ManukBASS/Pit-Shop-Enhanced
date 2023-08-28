import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((err) => console.log(err));
  }, [id]);

  // ADD ONE
  const addOne = () => {
    if(counter < product.stock){
        setCounter(counter + 1)
    } else{
        alert("Maximum stock")
    }
  }

  // REMOVE ONE
  const removeOne = () => {
    if(counter > 1){
        setCounter(counter -1)
    } else{
        alert("Cannot add less than 1 items")
    }
  }

  // ADD TO CART
  const onAdd = () => {
    let obj = {
        ...product,
        quantity: counter
    }
    addToCart(obj)
  }

  return (
    <div>
      <Link to="/shop">Go Back</Link>
      <h1>Item Detail</h1>

      {product && (
        <div>
          <h2>{product.title}</h2>
          <img
            src={product.image}
            style={{ width: "12.5rem" }}
            alt={product.title}
          />
        </div>
      )}

      <Box sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
        <Button variant="contained" size="small" onClick={removeOne}>-</Button>
        <Typography variant="h6">{counter}</Typography>
        <Button variant="contained" size="small" onClick={addOne} >+</Button>
      </Box>
        <Button variant="outlined" onClick={onAdd}>Add to Cart</Button>

    </div>
  );
};

export default ItemDetail;
