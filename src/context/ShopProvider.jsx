import { useState, useMemo, useCallback } from "react";
import { ShopContext } from "./shop";

export const ShopProvider = ({ children }) => {
  const [route, setRoute] = useState({ page: "home", id: null });
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());

  const navigate = useCallback((page, id = null) => {
    setRoute({ page, id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      route,
      navigate,
      cartItems,
      addToCart,
      cartCount,
      wishlist,
      toggleWishlist,
    }),
    [route, navigate, cartItems, addToCart, cartCount, wishlist, toggleWishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
