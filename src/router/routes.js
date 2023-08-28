import Cart from "../components/pages/cart/Cart";
import Home from "../components/pages/home/Home";
import ItemDetail from "../components/pages/itemDetail/ItemDetail";
import ItemListContainter from "../components/pages/itemList/ItemListContainter";
// import Login from "../components/pages/login/Login";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home
  },
  {
    id: "shop",
    path: "/shop",
    Element: ItemListContainter
  },
  {
    id: "detail",
    path: "/itemDetail/:id",
    Element: ItemDetail
  },
  {
    id: "cart",
    path: "/cart",
    Element: Cart
  }
 
];
