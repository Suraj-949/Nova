import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { ShoppingBag, Heart, Check } from "lucide-react";

import products from "../data/products.json";
import { useShop } from "../context/shop";

import ProductGallery from "../components/ProductGallery";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import RelatedProducts from "../components/RelatedProducts";


const formatPrice = (price) => "₹" + price.toLocaleString("en-IN");

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  const product = products.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!product) {
    return (
      <main className="w-full px-11 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[16px] text-[#888] font-medium">Product not found</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[13px] text-[#777] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft size={15} strokeWidth={1.8} />
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  const inStock = typeof product.stock === "number" && product.stock > 0;
  const isFavorite = wishlist.has(product.id);
  const highlights = Array.isArray(product.highlights)
    ? product.highlights
    : Array.isArray(product.features)
      ? product.features
      : null;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product, quantity);
    setToast(true);
  };

  return (
    <main className="w-full px-11 py-6">
      <div className="max-w-[1200px] mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[13px] text-[#777] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Back to Products
        </button>

        <div className="grid grid-cols-[1.4fr_1fr] gap-10 mt-6">
          {/* LEFT: Gallery */}
          <ProductGallery product={product} />

          {/* RIGHT: Info */}
          <div className="flex flex-col">
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#FF6B00]">
              {product.category}
            </span>

            <h1 className="text-[28px] font-bold text-white leading-[1.25] mt-2">
              {product.title}
            </h1>

            <div className="mt-3">
              <Rating
                value={product.rating}
                reviews={product.reviews ?? product.reviewCount}
              />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-[24px] font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice != null &&
                product.originalPrice > product.price && (
                  <span className="text-[15px] text-[#666] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              {product.discount != null && (
                <span className="text-[12px] font-semibold text-[#22c55e]">
                  {typeof product.discount === "number"
                    ? `${product.discount}% off`
                    : product.discount}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`w-[7px] h-[7px] rounded-full ${inStock ? "bg-[#22c55e]" : "bg-[#ef4444]"
                  }`}
              />
              <span
                className={`text-[12px] font-medium ${inStock ? "text-[#22c55e]" : "text-[#ef4444]"
                  }`}
              >
                {inStock ? `In Stock` : "Out of Stock"}
              </span>
              {inStock && (
                <span className="text-[12px] text-[#666]">
                  · {product.stock} available
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[13px] text-[#888] leading-[1.75] mt-5">
              {product.description}
            </p>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <ul className="flex flex-col gap-2 mt-5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[12px] text-[#aaa]"
                  >
                    <Check size={13} strokeWidth={2.4} className="text-[#22c55e]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#888]">
                Quantity
              </span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="w-full h-[46px] mt-5 bg-[#FF6B00] hover:bg-[#e65f00] disabled:bg-[#2a2a2a] disabled:text-[#666] disabled:cursor-not-allowed text-white text-[14px] font-semibold rounded-[6px] flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
            >
              <ShoppingBag size={17} strokeWidth={2} />
              Add to Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full h-[46px] mt-3 bg-[#151515] border border-[#292929] hover:border-[#3a3a3a] text-[14px] font-medium rounded-[6px] flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
            >
              <Heart
                size={16}
                strokeWidth={2}
                className={
                  isFavorite
                    ? "text-[#FF6B00] fill-[#FF6B00]"
                    : "text-[#aaa]"
                }
              />
              <span className={isFavorite ? "text-[#FF6B00]" : "text-[#ccc]"}>
                {isFavorite ? "Saved to Wishlist" : "Save to Wishlist"}
              </span>
            </button>

          </div>
        </div>

        <RelatedProducts currentProduct={product} />
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#151515] border border-[#292929] rounded-[8px] px-4 py-3 flex items-center gap-2 z-50">
          <Check size={15} strokeWidth={2.5} className="text-[#22c55e]" />
          <span className="text-[13px] text-white">Added to cart</span>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
