import { useEffect, useState } from "react"
import { db } from "../../../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { Typography } from "@mui/material"
import ProductsList from "./ProductsList"

const Dashboard = () => {

  const [products, setProducts] = useState([])
  // const [isChange, setIsChange] = useState(false);

  useEffect(()=>{
    // setIsChange(false);
    let productsCollection = collection(db, "products")
    getDocs(productsCollection).then(res => {
      const newArr = res.docs.map(product => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(newArr);
    });
  },[])

  return (
    <div>
      <Typography variant="h5">
        Dashboard
      </Typography>
      <ProductsList product={products}/>
    </div>
  )
}

export default Dashboard