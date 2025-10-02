import Image from "next/image";
import Button from "./components/Button";
import Link from "next/dist/client/link";
import ArtisanSpotlight from "./components/ArtisanSpotlight";
import ProductCarousel from "./components/ProductCarousel";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative max-h-screen w-full overflow-hidden bottom-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Description"
          width={5000}
          height={5000}
        />
        <div className="absolute top-1/2 -translate-y-1/2 text-center text-white p-15">
          <div className="flex flex-col gap-5">
            <h1 className="text-6xl/20 font-bold text-left">
              Browse our
              <br />
              collection of
              <br />
              goods
            </h1>
            <Button>
              <Link href="/product">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight Section */}
      <ArtisanSpotlight />

      <div>
        <h2 className="text-3xl font-bold my-15 text-center text-black">Featured Products</h2>
        <ProductCarousel />
      </div>
    </main>
  );
}
