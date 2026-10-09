import { Minus, Plus } from "lucide-react";

const toPositiveInt = (value, fallback = 1) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  const int = Math.floor(num);
  return int > 0 ? int : fallback;
};

const QuantitySelector = ({ value, onChange, max }) => {
  const current = toPositiveInt(value);
  const hasLimit = typeof max === "number" && Number.isFinite(max);
  const limit = hasLimit ? Math.max(0, Math.floor(max)) : Infinity;
  const atLimit = current >= limit;

  const decrease = () => {
    if (current > 1) onChange(current - 1);
  };

  const increase = () => {
    if (current < limit) onChange(current + 1);
  };

  return (
    <div className="flex items-center h-[40px] bg-[#151515] border border-[#292929] rounded-[6px] overflow-hidden">
      <button
        onClick={decrease}
        disabled={current <= 1}
        className="w-[38px] h-full flex items-center justify-center text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span className="w-[40px] text-center text-[14px] font-medium text-white select-none">
        {current}
      </span>
      <button
        onClick={increase}
        disabled={atLimit}
        className="w-[38px] h-full flex items-center justify-center text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
};

export default QuantitySelector;
