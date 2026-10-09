import { useState, useMemo, useCallback, useEffect } from "react";
import { ShopContext } from "./shop";
import products from "../data/products.json";

const CART_STORAGE_KEY = "nova-cart";


// Coerce any value into a positive integer (>= 1).
const toPositiveInt = (value, fallback = 1) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  const int = Math.floor(num);
  return int > 0 ? int : fallback;
};



const getProductById = (id) =>
  products.find((product) => String(product.id) === String(id));




// Safely read and sanitize the persisted cart.
const loadCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce((items, entry) => {
      const storedProduct = entry && entry.product ? entry.product : null;
      // Prefer the current catalog data so stale prices are refreshed.
      const product = getProductById(storedProduct?.id) ?? storedProduct;
      if (!product || product.id == null) return items;

      const quantity = toPositiveInt(entry?.quantity);
      if (quantity > 0) items.push({ product, quantity });
      return items;
    }, []);
  } catch {
    // Corrupted JSON or blocked storage: fall back to an empty cart.
    return [];
  }
};

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);
  const [wishlist, setWishlist] = useState(new Set());

  // Persist the cart whenever it changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage may be full or unavailable (e.g. private mode) - ignore.
    }
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.id == null) return;

    const amount = toPositiveInt(quantity);

    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: exists.quantity + amount }
            : item
        );
      }

      return [...prev, { product, quantity: amount }];
    });
  }, []);

  const updateCartQuantity = useCallback((id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, toPositiveInt(quantity)) }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
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

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      cartCount,
      cartTotal,
      wishlist,
      toggleWishlist,
    }),
    [
      cartItems,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      cartCount,
      cartTotal,
      wishlist,
      toggleWishlist,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
