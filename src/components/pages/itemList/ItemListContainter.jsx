import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import CardItem from "../../card/CardItem";
import { Typography } from "@mui/material";

const ItemListContainter = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        const newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(newArray);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography sx={{ mb: "1rem" }} variant="h4">
        Shop
      </Typography>
      {loading ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link to={`/itemDetail/${product.id}`}>
                <CardItem
                  image={product.image}
                  title={product.title}
                  unit_price={product.unit_price}
                  stock={product.stock}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ItemListContainter;
