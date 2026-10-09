import { ShopProvider } from "./context/ShopProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="min-h-screen w-full bg-[#0B0B0D]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>

  );
}

export default App;
