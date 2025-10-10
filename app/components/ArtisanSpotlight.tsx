"use client";

import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import Link from 'next/link';

const ArtisanSpotlight: React.FC = () => {
  return (
    <section className="bg-secondary text-neutral-dark">
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto max-w-7xl px-6 sm:px-8 py-16 gap-12">
        {/* Text */}
        <div className="spotlight-content flex-1">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Meet Our Artisans: John & Rachel
          </h2>
          <p className="mb-2 leading-relaxed font-accent">
            John and Rachel are a husband-and-wife team devoted to the timeless craft of handmade pottery. Blending traditional techniques with modern design, they create pieces that are both functional and full of character.
          </p>
          <p className="mb-2 leading-relaxed font-accent">
            Each work is shaped and glazed by hand, using eco-friendly materials and small-batch methods to ensure authenticity and sustainability. Their pottery reflects the natural beauty of clay — organic lines, earthy tones, and the subtle imperfections that make each piece truly one-of-a-kind.
          </p>
          <p className="mb-6 leading-relaxed font-accent">
            When they’re not at the wheel, John and Rachel love teaching others the art of pottery and sharing the joy that comes from creating something by hand. Their studio is more than a workspace — it’s a place where creativity, community, and craftsmanship come together.
          </p>
          <Button className="w-auto px-6 py-3">
            <Link href="/products">View Collection</Link>
          </Button>
        </div>

        {/* Image */}
        <div className="spotlight-image flex-1">
          <Image
            src="/images/artisan.jpg"
            alt="Artisan John Doe"
            width={650}
            height={650}
            className="rounded-lg object-cover object-top w-full h-auto max-h-[650px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;
