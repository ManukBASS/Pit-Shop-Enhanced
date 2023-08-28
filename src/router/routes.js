import Home from "../components/pages/home/Home";
import Login from "../components/pages/login/Login";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "login",
    path: "/login",
    Element: Login
  }
 
];
