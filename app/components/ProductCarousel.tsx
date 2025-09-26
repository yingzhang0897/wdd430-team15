"use client";

import Image from "next/image";
import products from "@/public/dummydata/products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {useState} from "react";
import {before} from "node:test";

const ProductCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <Slider {...settings} className="bg-white mx-15 mb-15 group">
      {products.map((product, i) => {
        return (
          <Link
            key={i}
            className="px-1"
            href={`/shop/${product.id}`}
            onClick={(e) => {
              if (isDragging) e.preventDefault(); // prevent navigation if dragging
            }}
          >
            <div className="bg-lightgray flex flex-col items-center justify-center overflow-hidden gap-4">
              <div className="w-full h-full relative">
                <Image
                  src={`${product.images[0]}`}
                  alt={product.name}
                  width={314}
                  height={314}
                  className="w-full h-[314px] object-cover rounded-sm hover:opacity-0 transition-opacity duration-300"
                />
                <Image
                  src={`${product.images[1]}`}
                  alt={product.name}
                  width={314}
                  height={314}
                  className="w-full h-[314px] object-cover rounded-sm absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="text-center text-md text-black">
                {product.name}
                <br />
                From ${product.price}
              </p>
              <p className="text-center text-sm text-gray-500">
                Crafted by {product.artist}
              </p>
            </div>
          </Link>
        );
      })}
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
