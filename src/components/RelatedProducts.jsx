import { useNavigate } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  const sameCategory = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );

  const others = products.filter(
    (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
  );

  const related = [...sameCategory, ...others].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-semibold text-white">
          You might also like
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-[13px] text-[#FF6B00] hover:text-[#ff8534] transition-colors duration-200 cursor-pointer"
        >
          Explore Collection →
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
