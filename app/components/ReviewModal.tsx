"use client";

import {useEffect, useState} from "react";
import ReactDOM from "react-dom";

const ReviewModal = ({
  isOpen,
  onClose,
  prevRating,
  productId,
  onSubmitted,
}: {
  isOpen: boolean;
  onClose: () => void;
  prevRating: number;
  productId: string;
  onSubmitted?: (createdReview: any) => void;
}) => {
  const [rating, setRating] = useState(prevRating); // Rating from 1 to 5
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState<string>("");
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      setShowModal(true);
      setRating(prevRating);
    } else {
      // Wait for the fade-out transition before setting showModal to false
      document.body.style.overflow = ""; // Restore scrolling
      const timeout = setTimeout(() => setShowModal(false), 300); // 300ms for fade-out duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen, prevRating]);

  const onSubmit = (rating: number, review: string) => {
    // Send the rating and review to the backend API route
    try {
      fetch("/api/reviews", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productId, rating, review}),
      }).then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.error("Failed to post review", res.status, body);
        } else {
          const created = await res.json();
          console.log("Review created", created);
          // notify parent if provided
          try {
            onSubmitted && onSubmitted(created);
          } catch (cbErr) {
            console.warn("onSubmitted handler threw:", cbErr);
          }
        }
      });
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  // Handle mouse hover with proper MouseEvent typing
  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = Number(event.currentTarget.dataset.value);
    setHoverRating(value);
  };

  // Handle mouse out event
  const handleMouseOut = () => {
    setHoverRating(-1);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();
    setRating(value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && review.trim()) {
      onSubmit(rating, review);
      setReview(""); // Clear the review field
      setRating(0); // Reset rating after submit
      onClose(); // Close the modal
    } else {
      alert("Please select a rating and write a review!");
    }
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-lg p-6 w-96 opacity-100 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent click on modal from closing it
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Rate and Review
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Product ID: {productId}
        </p>

        {/* Rating Section */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
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

        {/* Review Text */}
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReviewModal;
