"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import { UUID } from "crypto";

type Product = {
  product_id: UUID;
  seller_id: UUID;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
};

const ProductCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const products = await response.json();
        // Assuming the API returns an array of products
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: 0,
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getProductRating = (productId: UUID) => {
    fetch(`/api/products/${productId}/rating`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product rating:", data);
      })
      .catch((error) => {
        console.error("Error fetching product rating:", error);
      });
  };

  return (
    <Slider {...settings} className="mb-15 group">
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map((product, i) => {
          return (
            <div key={i} className="px-2">
              <div className="bg-white rounded-2xl border border-black/5 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.2)] overflow-hidden">
                {/* Image */}
                <Link
                  href={`/product/${product.product_id}`}
                  onClick={(e) => { if (isDragging) e.preventDefault(); }}
                  className="block relative w-full h-[200px]"
                >
                  <Image
                    src={`${product.image_url}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-neutral-dark mb-1">{product.name}</h3>
                  <p className="text-sm text-neutral-dark/70 mb-4">Starting at ${Math.round(product.price)}</p>
                  <div className="flex items-center gap-3">
                    <button className="bg-accent text-neutral-light px-4 py-2 rounded-md shadow-sm hover:brightness-95">Add to Cart</button>
                    <Link href={`/product/${product.product_id}`} className="px-4 py-2 rounded-md border border-neutral-light/60 bg-neutral-light text-neutral-dark hover:bg-white transition-colors">Details</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </Slider>
  );
};

const PrevArrow = ({onClick}: {onClick: () => void}) => (
  <button
    onClick={onClick}
    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-sm shadow hover:bg-gray-100 hover:cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-200"
  >
    {/* Left chevron */}
    <svg className="w-6 h-6" fill="white" stroke="black" viewBox="0 0 24 24">
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 18l-6-6 6-6"
      />
    </svg>
  </button>
);

const NextArrow = ({onClick}: {onClick: () => void}) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-sm shadow hover:bg-gray-100 hover:cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-200"
  >
    {/* Right chevron */}
    <svg className="w-6 h-6" fill="white" stroke="black" viewBox="0 0 24 24">
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6l6 6-6 6"
      />
    </svg>
  </button>
);

export default ProductCarousel;
