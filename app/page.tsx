import Image from "next/image";
import Button from "./components/Button";
import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div>
      <div className="relative max-h-screen w-full overflow-hidden bottom-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Description"
          width={5000}
          height={5000}
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 text-center text-white p-15">
        <div className="flex flex-col gap-5">
          <h1 className="text-6xl/20 font-bold text-left">Browse our<br></br>collection of<br></br>goods</h1>
          <Button>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
