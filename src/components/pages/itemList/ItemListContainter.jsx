import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

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
      <Box sx={{ p: "1rem",  gap: "2rem" }}>
        <Grid container spacing={3}>
          {loading
            ? products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Skeleton variant="rounded" width="100%" height="100%" />
                </Grid>
              ))
            : products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Link key={product.id} to={`/itemDetail/${product.id}`}>
                    <Card sx={{ width: "12.5rem", height: "16.5rem" }}>
                      <Box>
                        <img
                          src={product.image}
                          style={{
                            width: "12.5rem",
                            height: "12rem",
                            backgroundSize: "cover",
                          }}
                          alt={product.title}
                        />
                        <Box sx={{ paddingX: ".5rem" }}>
                          <Typography variant="subtitle1">
                            {product.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: ".85rem" }}
                            >
                              Price: ${product.unit_price}
                            </Typography>
                            <Chip
                              label={
                                product.stock === 0 ||
                                product.stock == undefined
                                  ? "Stock: 0"
                                  : `Stock: ${product.stock}`
                              }
                              variant="outlined"
                              size="small"
                              color={
                                product.stock === 0 ||
                                product.stock == undefined
                                  ? "error"
                                  : "success"
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
          {loading && (
            <Skeleton variant="rounded" width="12.5rem" height="16.5rem" />
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default ItemListContainter;
