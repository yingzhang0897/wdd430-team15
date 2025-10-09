import {useEffect, useState} from "react";
import AlertModal from "./AlertModal";
import ReviewModal from "./ReviewModal";
import {UUID} from "crypto";
import Link from "next/link";

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
  const [rating, setRating] = useState(initialRating);
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(initialRating);
  const userLoggedIn = true; // Replace with actual authentication logic
  const [showAlert, setShowAlert] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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

  const onRate = (value: number) => {
    setRating(value);
    setShowReviewModal(true); // Open review modal after rating
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
    e.preventDefault();
    if (!userLoggedIn) {
      // Show modal or alert
      setShowAlert(true);
      return;
    }
    onRate(value); // Callback to parent component or API
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
      <ReviewModal
        isOpen={showReviewModal}
        prevRating={rating}
        productId={productId}
        onClose={() => setShowReviewModal(false)}
        onSubmitted={() => {
          // refresh review list and rating after successful submission
          refreshReviews();
          fetch(`/api/products/${productId}/rating`)
            .then((response) => response.json())
            .then((data) => {
              if (data.averageRating !== undefined)
                setRating(data.averageRating);
            })
            .catch((err) => console.error("Failed to refresh rating:", err));
        }}
      />
      <div>
        {stars.map((star) => (
          <button
            key={star}
            data-value={star}
            className={`text-2xl transition-all duration-200 ${
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
