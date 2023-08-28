import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

const ItemListContainter = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        const newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Shop</h1>

      {products.map((product) => {
        return (
          <Link key={product.id} to={`/itemDetail/${product.id}`}>
            <div style={{ border: "2px solid black" }}>
              <img
                src={product.image}
                style={{ width: "12.5rem" }}
                alt={product.title}
              />
              <h4>{product.title}</h4>
              <h4>${product.unit_price}</h4>
              <h4>Units in stock: {product.stock}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemListContainter;
