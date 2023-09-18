import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";
import CardItem from "../../card/CardItem";

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
    <div>
      <h1>Shop</h1>
      <Box sx={{ p: "1rem", gap: "2rem", display: "flex" }}>
        {loading
          ? products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Skeleton variant="rounded" width="100%" height="100%" />
              </Grid>
            ))
          : products.map((product) => (
              <Box key={product.id}>
                <Link key={product.id} to={`/itemDetail/${product.id}`}>
                  <CardItem
                    image={product.image}
                    title={product.title}
                    unit_price={product.unit_price}
                    stock={product.stock}
                  />
                </Link>
              </Box>
            ))}
        {loading && (
          <Skeleton variant="rounded" width="12.5rem" height="16.5rem" />
        )}
      </Box>
    </div>
  );
};

export default ItemListContainter;
