import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <BrowserRouter>
      <CartContextComponent>
        <NextUIProvider>
          <AppRouter />
        </NextUIProvider>
      </CartContextComponent>
    </BrowserRouter>
  );
}

export default App;
