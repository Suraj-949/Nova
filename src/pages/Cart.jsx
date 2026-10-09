import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useShop } from "../context/shop";
import QuantitySelector from "../components/QuantitySelector";

const formatPrice = (price) => "₹" + price.toLocaleString("en-IN");

const Cart = () => {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
  } = useShop();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="w-full px-11 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center py-20 text-center">
          <div className="w-[64px] h-[64px] rounded-full bg-[#151515] border border-[#292929] flex items-center justify-center">
            <ShoppingBag size={26} strokeWidth={1.6} className="text-[#555]" />
          </div>
          <p className="text-[18px] font-semibold text-white mt-5">
            Your cart is empty
          </p>
          <p className="text-[13px] text-[#666] mt-2">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 h-[42px] px-5 mt-6 bg-[#FF6B00] hover:bg-[#e65f00] text-white text-[13px] font-semibold rounded-[6px] transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-11 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end gap-3 mb-6">
          <h1 className="text-[26px] font-bold text-white">Shopping Cart</h1>
          <span className="text-[13px] text-[#666] pb-1">
            {cartCount} item{cartCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-[1.7fr_1fr] gap-8 items-start">
          {/* Items */}
          <div className="flex flex-col">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-5 py-4 border-b border-[#1e1e1e]"
              >
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-[90px] h-[90px] shrink-0 bg-[#111] border border-[#242424] rounded-[8px] overflow-hidden cursor-pointer"
                  aria-label={`View ${product.title}`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-[0.06em] text-[#FF6B00]">
                    {product.category}
                  </span>
                  <h3 className="text-[14px] font-semibold text-white truncate mt-1">
                    {product.title}
                  </h3>
                  <p className="text-[12px] text-[#666] mt-1">
                    {formatPrice(product.price)} each
                  </p>
                </div>

                <QuantitySelector
                  value={quantity}
                  onChange={(q) => updateCartQuantity(product.id, q)}
                  max={product.stock}
                />

                <span className="w-[110px] text-right text-[15px] font-bold text-white">
                  {formatPrice(product.price * quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="w-[34px] h-[34px] flex items-center justify-center text-[#777] hover:text-[#ef4444] transition-colors duration-200 cursor-pointer"
                  aria-label={`Remove ${product.title}`}
                >
                  <Trash2 size={16} strokeWidth={1.8} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[#151515] border border-[#292929] rounded-[8px] p-5 sticky top-24">
            <h2 className="text-[15px] font-semibold text-white mb-4">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#888]">Subtotal</span>
                <span className="text-white font-medium">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#888]">Shipping</span>
                <span className="text-[#22c55e] font-medium">Free</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#242424]">
              <span className="text-[14px] text-[#aaa]">Total</span>
              <span className="text-[20px] font-bold text-white">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button className="w-full h-[46px] mt-5 bg-[#FF6B00] hover:bg-[#e65f00] text-white text-[14px] font-semibold rounded-[6px] transition-colors duration-200 cursor-pointer">
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full h-[42px] mt-3 text-[13px] text-[#888] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
