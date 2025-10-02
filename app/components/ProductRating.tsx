'use client';

import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function ProductRating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = true 
}: ProductRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderStars = () => {
    return Array.from({ length: maxRating }, (_, index) => {
      const starRating = index + 1;
      const isFilled = starRating <= rating;
      const isHalfFilled = starRating === Math.ceil(rating) && rating % 1 !== 0;

      return (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            isFilled || isHalfFilled 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'fill-gray-200 text-gray-200'
          }`}
          aria-hidden="true"
        />
      );
    });
  };

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {renderStars()}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600" aria-label={`${rating} out of ${maxRating}`}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}
