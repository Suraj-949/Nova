import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onReset }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[16px] text-[#666] font-medium">No products found</p>
        <p className="text-[13px] text-[#444] mt-1">Try adjusting your search or filters</p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-4 px-4 py-2 text-[12px] font-semibold text-[#FF6B00] hover:text-[#ff8534] border border-[#FF6B00]/30 hover:border-[#FF6B00] rounded-[6px] transition-colors duration-200 cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
