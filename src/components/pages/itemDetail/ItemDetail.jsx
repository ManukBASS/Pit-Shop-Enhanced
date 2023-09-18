import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, Typography } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  const quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false)
  const [message, setMessage] = useState("");

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseBuy = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenBuy(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#BC5449",
      },
    },
  });

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((err) => console.log(err));
  }, [id]);

  // ADD ONE
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      setOpen(true);
      setMessage("You have reached the maximum stock for this item");
    }
  };

  // REMOVE ONE
  const removeOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      setOpen(true);
      setMessage("Cannot add less than 1 item");
    }
  };

  // ADD TO CART
  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
    setOpenBuy(true)
    setMessage("Product added to cart successfully!")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Link to="/shop" style={{ textDecoration: "none" }}>
          <Button variant="outlined" style={{ marginBottom: "1rem" }}>
            Go Back
          </Button>
        </Link>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {product && (
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {product && (
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Price: ${product.unit_price}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button variant="contained" size="small" onClick={removeOne}>
                    -
                  </Button>
                  <Typography variant="h6">{counter}</Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={addOne}
                  >
                    +
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  onClick={onAdd}
                  style={{ marginTop: "1rem" }}
                >
                  Add to Cart
                </Button>
                {quantity && (
                  <Typography variant="body2" style={{ marginTop: "1rem" }}>
                    You have {quantity} in your cart
                  </Typography>
                )}
                {product?.stock === quantity && (
                  <Typography
                    variant="body2"
                    color="error"
                    style={{ marginTop: "1rem" }}
                  >
                    You have reached the maximum stock for this item
                  </Typography>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        <Snackbar open={openBuy} autoHideDuration={4000} onClose={handleCloseBuy}>
          <Alert variant="filled" onClose={handleCloseBuy} severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default ItemDetail;
