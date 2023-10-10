import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import { NextUIProvider } from "@nextui-org/react";
import AuthContextComponent from "./context/AuthContext";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <CartContextComponent>
          <NextUIProvider>
            <AppRouter />
            <Footer />
          </NextUIProvider>
        </CartContextComponent>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
