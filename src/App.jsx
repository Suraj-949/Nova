import { ShopProvider } from "./context/ShopProvider";
import { useShop } from "./context/shop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";

const CurrentPage = () => {
  const { route } = useShop();

  if (route.page === "product" && route.id != null) {
    return <ProductDetail key={route.id} id={route.id} />;
  }

  return <Home />;
};

function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen w-full bg-[#0B0B0D]">
        <Navbar />
        <CurrentPage />
        <Footer />
      </div>
    </ShopProvider>
  );
}

export default App;
