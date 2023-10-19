/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Typography } from "@mui/material";
import ProductsList from "./ProductsList";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setIsChange(false);
    let prodcutsCollection = collection(db, "products");
    getDocs(prodcutsCollection).then((res) => {
      const newArr = res.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      console.log(newArr);
      setProducts(newArr);
    });
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: ".5rem" }}>
        Admin Dashboard
      </Typography>
      <ProductsList products={products} setIsChange={setIsChange} />
    </div>
  );
};

export default Dashboard;
