import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ value, onChange, max }) => {
  const limit = typeof max === "number" && max > 0 ? max : undefined;

  const decrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const increase = () => {
    if (!limit || value < limit) onChange(value + 1);
  };

  return (
    <div className="flex items-center h-[40px] bg-[#151515] border border-[#292929] rounded-[6px] overflow-hidden">
      <button
        onClick={decrease}
        disabled={value <= 1}
        className="w-[38px] h-full flex items-center justify-center text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span className="w-[40px] text-center text-[14px] font-medium text-white select-none">
        {value}
      </span>
      <button
        onClick={increase}
        disabled={limit ? value >= limit : false}
        className="w-[38px] h-full flex items-center justify-center text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
};

export default QuantitySelector;
