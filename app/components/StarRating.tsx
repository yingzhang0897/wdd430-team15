import {useEffect, useState} from "react";
import AlertModal from "./AlertModal";
import {UUID} from "crypto";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface StarRatingProps {
  horizontal?: boolean;
  initialRating?: number;
  productId: UUID;
}

const StarRating = ({
  horizontal = false,
  initialRating = 0,
  productId,
}: StarRatingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [rating, setRating] = useState(initialRating);
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(initialRating);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!productId) return;

    // fetch average rating
    fetch(`/api/products/${productId}/rating`)
      .then((response) => response.json())
      .then((data) => {
        if (data.averageRating !== undefined) {
          setRating(data.averageRating);
        }
      })
      .catch((err) => console.error("Failed to load average rating:", err));

    // fetch reviews
    fetch(`/api/reviews/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data || []);
      })
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [productId]);

  const refreshReviews = () => {
    if (!productId) return;
    fetch(`/api/reviews/${productId}`)
      .then((response) => response.json())
      .then((data) => setReviews(data || []))
      .catch((err) => console.error("Failed to refresh reviews:", err));
  };
  
  // Handle mouse hover with proper MouseEvent typing
  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = Number(event.currentTarget.dataset.value);
    setHoverRating(value);
  };
  
  // Handle mouse out event
  const handleMouseOut = () => {
    setHoverRating(initialRating);
  };
  
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    router.push(`${pathname}/review?rating=${value}`);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className={
        "flex items-center" + (horizontal ? " flex-row space-x-2" : " flex-col")
      }
    >
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message="Please log in to rate products."
      />
      <div>
        {stars.map((star) => (
          <button
            key={star}
            data-value={star}
            className={`text-2xl transition-all duration-200 cursor-pointer ${
              hoverRating > 0
                ? hoverRating >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
                : rating >= star
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            onClick={(e) => {
              handleClick(e, star);
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={() => (window.location.href = `/reviews/${productId}`)}
        >
          <span className="text-blue-400 hover:underline cursor-pointer text-sm">
            {`(${reviews.length} review${reviews.length !== 1 ? "s" : ""})`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StarRating;
