import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];

  const [selected, setSelected] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="w-full h-[460px] bg-[#111] border border-[#242424] rounded-[8px] overflow-hidden">
        <img
          src={images[selected]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`w-[80px] h-[80px] bg-[#111] rounded-[6px] overflow-hidden border transition-colors duration-200 cursor-pointer ${
                index === selected
                  ? "border-[#FF6B00]"
                  : "border-[#242424] hover:border-[#3a3a3a]"
              }`}
            >
              <img
                src={img}
                alt={`${product.title} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
