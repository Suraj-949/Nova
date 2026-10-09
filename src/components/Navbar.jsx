import { Search, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useShop } from "../context/shop";

const navLinks = [
  { name: "Shop", href: "#", active: true, page: "home" },
  { name: "Categories", href: "#", active: false },
  { name: "Featured", href: "#", active: false },
];

const Navbar = () => {
  const { cartCount } = useShop();
  const navigate = useNavigate();

  return (
    <nav className="w-full h-[66px] bg-[#0B0B0D] border-b border-[#242424] select-none">
      <div className="relative h-full w-full flex items-center justify-between px-11">

        {/* LEFT: Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-[11px] cursor-pointer"
          aria-label="Nova home"
        >
          <div className="w-[34px] h-[34px] bg-[#171719] rounded-[8px] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 15V3L15 15V3"
                stroke="#FF7A00"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-white font-bold text-[18px] tracking-[0.06em]">
            NOVA
          </span>
        </button>

        {/* CENTER: Navigation Links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[30px]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (link.page) navigate("/");
              }}
              className={`text-[14px] font-semibold transition-colors duration-200 ${link.active ? "text-white" : "text-[#8A8A8E] hover:text-white"
                }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT: Action Icons */}
        <div className="flex items-center gap-[20px]">

          {/* Search */}
          <button
            className="text-[#C8C8CC] hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.7} />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-[#C8C8CC] hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -top-[7px] -right-[7px] min-w-[18px] h-[18px] px-1 bg-[#FF7A00] rounded-full text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            className="w-[35px] h-[35px] rounded-full bg-[#FFB38F] flex items-center justify-center hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            aria-label="Account"
          >
            <User size={17} strokeWidth={1.8} className="text-[#1A1A1C]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
