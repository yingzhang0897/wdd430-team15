"use client";

import React, {useEffect} from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export default function ReviewsPage({params}: {params: {productId: string}}) {
  // Some Next versions pass `params` as a Promise. Unwrap it with React.use(params)
  // when available to stay forward compatible. Fall back to direct access.
  const maybeUse = (React as any).use as ((p: any) => any) | undefined;
  const resolvedParams = maybeUse ? maybeUse(params) : params;
  const productId = resolvedParams?.productId ?? params?.productId ?? "";

  const [seller, setSeller] = React.useState<any>(null);
  const [product, setProduct] = React.useState<any>(null);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);

    // Fetch reviews and product in parallel
    Promise.all([
        fetch(`/api/reviews/${encodeURIComponent(productId)}`)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`Failed to fetch: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                // Map DB response shape to our Review interface
                if (!Array.isArray(data)) return [];
                return data.map((r: any) => ({
                    id: r.review_id ?? r.id ?? String(Math.random()),
                    author: r.user_id ?? r.author ?? "User",
                    rating: Number(r.rating ?? 0),
                    comment: r.comment ?? r.comment_text ?? "",
                }));
            }),
        fetch(`/api/products/${encodeURIComponent(productId)}`)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`Failed to fetch: ${response.status}`);
                return response.json();
            }),
    ])
        .then(([reviewsData, productData]) => {
            setReviews(reviewsData);
            setProduct(productData);

            // Now fetch seller after product is set
            if (productData?.seller_id) {
                fetch(`/api/sellers/${encodeURIComponent(productData.seller_id)}`)
                    .then((response) => {
                        if (!response.ok)
                            throw new Error(`Failed to fetch: ${response.status}`);
                        return response.json();
                    })
                    .then((sellerData) => {
                        setSeller(sellerData);
                    })
                    .catch((err) => {
                        console.error("Failed to load seller:", err);
                        setError(String(err));
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        })
        .catch((err) => {
            console.error("Failed to load data:", err);
            setError(String(err));
            setReviews([]);
            setProduct(null);
            setLoading(false);
        });
}, [productId]);

  return (
    <div className="pt-40 pb-20 min-h-screen bg-gray-50 pt-20">
      <div className={"p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-xl"}>
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
          Product Reviews
        </h1>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">Showing reviews for:</p>
            <p className="text-sm text-gray-500 break-words">{product?.name}</p>
          </div>
          <div className="text-right">
            {loading ? (
              <div className="text-gray-500">Loading…</div>
            ) : reviews.length > 0 ? (
              <div className="text-gray-800 font-semibold">
                {(
                  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
                ).toFixed(1)}
                /5 · {reviews.length} review{reviews.length > 1 ? "s" : ""}
              </div>
            ) : (
              <div className="text-gray-500">No reviews yet</div>
            )}
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded">
            {error}
          </div>
        )}
        <ul className="space-y-8">
          {loading ? (
            // show skeletons
            Array.from({length: 3}).map((_, idx) => (
              <li
                key={idx}
                className="animate-pulse bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-full w-10 h-10" />
                    <div className="space-y-1">
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                      <div className="h-3 w-24 bg-gray-200 rounded mt-1" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-20 bg-gray-200 rounded" />
              </li>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <li
                key={review.id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        {review.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        Verified buyer
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-yellow-400">
                      {Array.from({length: 5}).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-yellow-400"
                              : "fill-gray-200"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.64 16.56,18 10,13.72 3.44,18 6.03,11.64 0.49,7.36 7.41,7.36" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {review.rating}/5
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {review.comment}
                </p>
              </li>
            ))
          ) : (
            // empty state
            <li className="bg-white rounded-xl p-6 border border-dashed border-gray-200 text-center text-gray-500">
              No reviews yet — be the first to leave feedback!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
