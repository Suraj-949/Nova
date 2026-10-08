import { Star } from "lucide-react";

const Rating = ({ value, reviews, size = 14 }) => {
  if (value == null) return null;

  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            strokeWidth={1.5}
            className={
              star <= rounded
                ? "text-[#FF6B00] fill-[#FF6B00]"
                : "text-[#3a3a3a]"
            }
          />
        ))}
      </div>
      <span className="text-[13px] font-medium text-white">{value}</span>
      {reviews != null && (
        <span className="text-[13px] text-[#666]">({reviews} reviews)</span>
      )}
    </div>
  );
};

export default Rating;
