"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import { UUID } from "crypto";
import { get } from "http";

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
    slidesToShow: 5,
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1279,
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
    <Slider {...settings} className="mx-15 mb-15 group text-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map((product, i) => {
          return (
            <Link
              key={i}
              className="px-1"
              href={`/product/${product.product_id}`}
              onClick={(e) => {
                if (isDragging) e.preventDefault(); // prevent navigation if dragging
              }}
            >
              <div className="bg-lightgray flex flex-col items-center justify-center overflow-hidden gap-4">
                <div className="w-full h-full relative">
                  <Image
                    src={`${product.image_url}`}
                    alt={product.name}
                    width={314}
                    height={314}
                    className="w-full h-[314px] object-cover rounded-sm hover:opacity-0 transition-opacity duration-300"
                  />
                  <Image
                    src={`${product.image_url}`}
                    alt={product.name}
                    width={314}
                    height={314}
                    className="w-full h-[314px] object-cover rounded-sm absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="text-center text-md">
                  {product.name}
                  <br />
                  From ${product.price}
                </p>
                <StarRating
                  productId={product.product_id}
                />
                <p className="text-center text-sm">
                  Crafted by {product.seller_id.toString().slice(0, 8)}...
                </p>
              </div>
            </Link>
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
