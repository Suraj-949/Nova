const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex items-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 h-[28px] rounded-full text-[12px] font-medium transition-colors duration-200 cursor-pointer ${
            selected === cat
              ? "bg-[#FF6B00] text-white border border-[#FF6B00]"
              : "bg-[#171717] text-[#999] border border-[#252525] hover:border-[#3a3a3a] hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
