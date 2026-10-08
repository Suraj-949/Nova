import ProductCard from "./ProductCard";

const ProductGrid = ({ products, favorites, onToggleFavorite, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[16px] text-[#666] font-medium">No products found</p>
        <p className="text-[13px] text-[#444] mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
