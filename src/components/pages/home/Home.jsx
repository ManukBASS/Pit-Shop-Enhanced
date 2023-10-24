import Box from "@mui/material/Box";
import Policies from "../../policies/Policies";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Grid, Skeleton, Typography } from "@mui/material";
import CardItem from "../../card/CardItem";
import { Link } from "react-router-dom";

const Home = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsQuery = query(productsCollection, orderBy("unit_price"));
      const querySnapshot = await getDocs(productsQuery);
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const randomIndexes = [];
      while (randomIndexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      const randomProducts = randomIndexes.map((index) => allProducts[index]);
      setRandomProducts(randomProducts);
      setLoading(false);
    };

    fetchRandomProducts();
  }, []);

  return (
    <>
      <Box sx={{ mb: "1rem" }}>
        <video
          autoPlay
          loop
          muted
          style={{ width: "100%", borderRadius: "10px" }}
        >
          <source src="/videos/“No Ordinary Sport” - a Formula 1 edit.mp4" />
        </video>
      </Box>
      <Box sx={{ p: "1rem", mb: "3rem" }}>
        <Typography sx={{ mb: "1rem" }} variant="h4">
          Shop
        </Typography>
        {loading ? (
          <Grid container spacing={2}>
            {randomProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="100%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {randomProducts.map((product) => (
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
      <Policies />
    </>
  );
};

export default Home;
