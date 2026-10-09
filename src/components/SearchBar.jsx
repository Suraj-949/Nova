import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-[340px]">
      <Search
        size={16}
        strokeWidth={1.8}
        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#666] pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[42px] bg-[#171717] border border-[#252525] rounded-[10px] pl-[40px] pr-9 text-[14px] text-white placeholder-[#555] outline-none focus:border-[#3a3a3a] transition-colors duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
