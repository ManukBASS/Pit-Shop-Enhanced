import { useEffect, useState, useContext } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

const UserOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    let ordersFiltered = query(ordersCollection, where("email", "==", user.email));
    getDocs(ordersFiltered)
      .then((res) => {
        const newArr = res.docs.map(order => {
          return { ...order.data(), id: order.id };
        });
        setMyOrders(newArr);
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  return (
    <div>
      <h1>My Orders</h1>
      {
        myOrders.map(order => {
            return <div key={order.id}>
                <h4>Order total is: {order.total}</h4>
            </div>
        })
      }
    </div>
  );
};

export default UserOrders;
