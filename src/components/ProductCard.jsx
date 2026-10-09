import { Heart, Star, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useShop } from "../context/shop";

const formatPrice = (price) => "₹" + price.toLocaleString("en-IN");

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const navigate = useNavigate();
  const isFavorite = wishlist.has(product.id);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-[#151515] border border-[#292929] rounded-[8px] overflow-hidden transition-all duration-200 hover:border-[#3a3a3a] group cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-[140px] bg-[#111] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />

        {/* Category label */}
        <span className="absolute top-2 left-2 px-2 py-[2px] bg-[#0B0B0D]/80 backdrop-blur-sm text-[10px] font-medium text-[#ccc] rounded-[4px]">
          {product.category}
        </span>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 w-[26px] h-[26px] rounded-full bg-[#0B0B0D]/80 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
          aria-label="Toggle favorite"
        >
          <Heart
            size={13}
            strokeWidth={2}
            className={
              isFavorite
                ? "text-[#FF6B00] fill-[#FF6B00]"
                : "text-[#aaa] hover:text-white"
            }
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-2.5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={11} className="text-[#FF6B00] fill-[#FF6B00]" />
          <span className="text-[11px] text-[#ccc] font-medium">{product.rating}</span>
          <span className="text-[11px] text-[#555]">({product.stock} in stock)</span>
        </div>

        {/* Title */}
        <h3 className="text-[13px] font-semibold text-white truncate mb-1">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-[#666] leading-[1.5] mb-3 line-clamp-2 overflow-hidden">
          {product.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-white">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex items-center gap-1.5 px-3 h-[28px] bg-[#FF6B00] hover:bg-[#e65f00] text-white text-[11px] font-semibold rounded-[6px] transition-colors duration-200 cursor-pointer"
          >
            <ShoppingBag size={12} strokeWidth={2} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
