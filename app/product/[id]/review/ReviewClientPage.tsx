"use client";

import Image from "next/image";
import {useSearchParams, useRouter} from "next/navigation";
import {useState} from "react";
import AlertModal from "@/app/components/AlertModal";

export default function ReviewClientPage({product}: {product: any}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRating = searchParams.get("rating");
  const [rating, setRating] = useState(
    initialRating ? Number(initialRating) : 0
  );
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating > 0 && review.trim()) {
      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({productId: product.product_id, rating, review}),
        });

        if (!res.ok) {
          const err = await res.json();
          alert("Error: " + err.message);
          return;
        }

        setAlertOpen(true);
      } catch (err) {
        console.error("Submit error:", err);
        alert("An error occurred.");
      }
    } else {
      alert("Please select a rating and write a review.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AlertModal
        isOpen={alertOpen}
        onClose={() => {
          setAlertOpen(false);
          router.push(`/product/${product.product_id}`);
        }}
        message="Review Successfully Submitted!"
      />
      <div className="bg-white text-black rounded-lg w-full max-w-3xl h-full shadow-lg flex overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-2/5"
        />
        <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Rate and Review
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            <span className="font-mono">{product.name}</span>
          </p>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
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
                onClick={() => setRating(star)}
                onMouseOver={() => setHoverRating(star)}
                onMouseOut={() => setHoverRating(0)}
                aria-label={`${star} star`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </main>
  );
}
