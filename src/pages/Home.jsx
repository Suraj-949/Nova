import { useState, useMemo } from "react";
import products from "../data/products.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, selectedCategory]);

  return (
    <main className="w-full">
      {/* Hero */}
      <section className="flex flex-col items-center py-15">
        <h1 className="text-[42px] font-bold leading-[1.2] text-center text-white">
          Discover products you'll
          <br />
          <span className="text-[#FF6B00]">love.</span>
        </h1>
        <p className="text-[15px] text-[#666] text-center mt-5 max-w-[480px] leading-[1.7]">
          Explore our curated collection of everyday essentials, technology, fashion and more.
        </p>
      </section>

      {/* Search */}
      <section className="flex px-11 justify-center pb-8">
        <SearchBar value={search} onChange={setSearch} />
      </section>

      {/* Category Filters */}
      <section className="flex justify-start px-11 pb-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      {/* Product Header */}
      <section className="w-full px-11 mb-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-semibold text-white">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <span className="text-[11px] font-medium text-[#FF6B00] tracking-[0.05em]">
              {filteredProducts.length} PRODUCTS
            </span>
          </div>
          <span className="text-[12px] text-[#666]">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto px-11 pb-16">
        <ProductGrid
          products={filteredProducts}
          onReset={() => {
            setSearch("");
            setSelectedCategory("All");
          }}
        />
      </section>
    </main>
  );
};

export default Home;
