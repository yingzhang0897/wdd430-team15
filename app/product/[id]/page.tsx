"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {ArrowLeft, ShoppingCart, Package, Star} from "lucide-react";
import StarRating from "@/app/components/StarRating";
import {UUID} from "crypto";
import type { Product } from "@/app/lib/definitions";

// Mock product data
const mockProducts = [
  {
    id: "c5a4731c-db0b-4f5e-8796-0ae31a2b9697",
    name: "Elegant Athena Ring Setting",
    description:
      "Accent diamonds with low profile hidden halo setting. This beautiful ring features carefully selected diamonds in a sophisticated design that combines elegance with everyday wearability.",
    price: 45.0,
    rating: 4.8,
    category: "Jewelry",
    stock: 10,
    image_url: "/images/jewlery1.png",
    artist: "Luna's Handcrafts",
  },
  {
    id: "2",
    name: "Heart Bezel Necklace Setting",
    description:
      "This necklace setting fits a heart shape to up 5.9mm gemstone with solid 14k gold cable chain. Perfect for expressing love and creating meaningful jewelry pieces.",
    price: 25.0,
    rating: 4.6,
    category: "Jewelry",
    stock: 15,
    image_url: "/images/jewlery2.png",
    artist: "Luna's Handcrafts",
  },
  {
    id: "3",
    name: "TimberCopter",
    description:
      "Recall your happy memory of childhood. This handcrafted wooden helicopter toy brings back the joy of simple, imaginative play with its smooth finish and attention to detail.",
    price: 30.0,
    rating: 4.9,
    category: "Woodcraft",
    stock: 8,
    image_url: "/images/woodcraft1.png",
    artist: "Oak Grove Studio",
  },
  {
    id: "4",
    name: "Timber Truckie",
    description:
      "With its rolling wheels and cheerful charm, it's ready to carry imagination anywhere. This wooden truck is perfect for young adventurers and collectors alike.",
    price: 40.0,
    rating: 4.7,
    category: "Woodcraft",
    stock: 12,
    image_url: "/images/woodcraft2.png",
    artist: "Oak Grove Studio",
  },
  {
    id: "5",
    name: "Willowtime Tea Party",
    description:
      "Handwoven with care, each piece carrying the natural warmth of willow branches. This beautiful tea set brings rustic elegance to your home.",
    price: 35.0,
    rating: 4.5,
    category: "Textiles",
    stock: 20,
    image_url: "/images/willow1.png",
    artist: "Willow Textiles",
  },
  {
    id: "6",
    name: "Decorative Willow Containers",
    description:
      "Organic weave brings rustic warmth to any room while keeping things beautifully tidy. Perfect for storage or as decorative pieces.",
    price: 28.0,
    rating: 4.4,
    category: "Textiles",
    stock: 18,
    image_url: "/images/willow2.png",
    artist: "Willow Textiles",
  },
  {
    id: "7",
    name: "Luxury Leather Handbag",
    description:
      "Fine leather with delicate cat design. This premium handbag combines functionality with artistic flair, perfect for the discerning fashion enthusiast.",
    price: 80.0,
    rating: 4.9,
    category: "Leather",
    stock: 14,
    image_url: "/images/leather1.png",
    artist: "Evergreen Leatherworks",
  },
  {
    id: "8",
    name: "Cute Leather Keychain",
    description:
      "Cute leather keychain for daily use. Handcrafted with attention to detail, this practical accessory adds a touch of personality to your keys.",
    price: 20.0,
    rating: 4.3,
    category: "Leather",
    stock: 6,
    image_url: "/images/leather2.png",
    artist: "Evergreen Leatherworks",
  },
  {
    id: "9",
    name: "Ancient Liquor Container",
    description:
      "The creativity lies in its unique ivory design. This handcrafted pottery piece combines traditional techniques with modern aesthetics.",
    price: 55.0,
    rating: 4.6,
    category: "Pottery",
    stock: 10,
    image_url: "/images/pottery1.png",
    artist: "Sunrise Pottery",
  },
  {
    id: "10",
    name: "Impressionist Vase",
    description:
      "Hand-painted pottery vase with impressionist style. Each piece is unique, featuring flowing brushstrokes that capture the essence of impressionist art.",
    price: 22.0,
    rating: 4.2,
    category: "Pottery",
    stock: 25,
    image_url: "/images/pottery2.png",
    artist: "Sunrise Pottery",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        // await new Promise(resolve => setTimeout(resolve, 500));

        const foundProduct = await fetch(`/api/products/${params.id}`).then(
          (res) => res.json()
        );

        if (foundProduct) {
          setProduct(foundProduct);
          console.log("Fetched product:", foundProduct);
          console.log(product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  useEffect(() => {
    console.log("Product state updated:", product);
    console.log(product);
  }, [product]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // call an API to add the item to cart
    alert(`Added "${product?.name}" to cart!`);

    setIsAddingToCart(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading product...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Product not found
              </h1>
              <p className="text-gray-600 mb-6">
                The product you're looking for doesn't exist or may have been
                removed.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 pt-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-blue-600 transition-colors">
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <section className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image_url}
                  alt={`${product.name} - ${product.category} by ${product.seller_id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </section>

            {/* Product Details */}
            <section className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    by {product.seller_id}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <StarRating productId={product.product_id as UUID} horizontal />
                </div>

                <div className="text-4xl font-bold text-gray-900 mb-6">
                  ${(product.price || 0).toFixed(2)}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium text-lg transition-colors ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-blue-500 text-white cursor-wait"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding to Cart...
                  </>
                ) : product.stock === 0 ? (
                  <>
                    <Package className="w-5 h-5" />
                    Out of Stock
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                    <span className="text-sm text-white">
                      ({product.stock} in stock)
                    </span>
                  </>
                )}
              </button>

              {/* Additional Info */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Product Details
                </h3>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Artist:</dt>
                    <dd className="text-gray-900 font-medium">
                      {product.seller_id}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category:</dt>
                    <dd className="text-gray-900 font-medium">
                      {product.category}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Availability:</dt>
                    <dd className="text-gray-900 font-medium">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
