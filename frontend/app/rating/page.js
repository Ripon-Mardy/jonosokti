'use client';
import { useState } from "react";
import { Star } from "lucide-react";

const Rating  = ({ rating }) => {
  const totalStars = 3;
  
  return (
    <div className="flex items-center gap-2 pt-20">
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              size={20}
              className={`${
                starValue <= rating
                  ? "text-yellow-400"
                  : starValue - 0.5 === rating
                  ? "text-yellow-400 half-filled"
                  : "text-gray-300"
              }`}
              fill={starValue <= rating ? "currentColor" : "none"}
            />
          );
        })}
      </div>
      <span className="text-sm font-medium text-gray-800">{rating}/5</span>
    </div>
  );
};

export default function RatingComponent() {
  const [userRating, setUserRating] = useState(4.5);

  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold mb-2">Customer Rating</h2>
      <Rating rating={userRating} />
    </div>
  );
}
