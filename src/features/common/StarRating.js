import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const StarRating = ({
  rating,
  style,
  filledColor,
  halfColor,
  unfilledColor,
}) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = (count, isFilled) => {
    const stars = [];
    const colorClass = isFilled
      ? filledColor || "text-yellow-500"
      : unfilledColor || "text-gray-300";

    for (let i = 0; i < count; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={colorClass}
         
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars(fullStars, true)}
      {hasHalfStar && (
        <StarIcon
          className={halfColor || "text-yellow-500"}
          style={{ fontSize: style.fontSize }}
        />
      )}
      {renderStars(maxStars - fullStars - (hasHalfStar ? 1 : 0), false)}
    </div>
  );
};

export default StarRating;
