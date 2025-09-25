"use client";

import React from "react";
import Image from "next/image";

const ArtisanSpotlight: React.FC = () => {
  return (
    <section className="bg-black text-white flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-16 gap-12">
      {/* Text */}
      <div className="spotlight-content flex-1">
        <h2 className="text-4xl font-bold mb-6">Meet our Artisan: John Doe</h2>
        <p className="mb-2 leading-relaxed">
          John Doe is a skilled artisan specializing in handcrafted pottery.
          With over 10 years of experience, John brings a unique blend of
          traditional techniques and modern design to his work.
        </p>
        <p className="mb-2 leading-relaxed">
          His pieces are known for their intricate details and vibrant glazes,
          making each item a true work of art. John is passionate about
          sustainability and uses eco-friendly materials in his creations.
        </p>
        <p className="mb-6 leading-relaxed">
          When he's not in the studio, John enjoys teaching pottery classes and
          sharing his love for the craft with others.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          View John&apos;s Collection
        </button>
      </div>

      {/* Image */}
      <div className="spotlight-image flex-1">
        <Image
          src="/images/artisan.jpg"
          alt="Artisan John Doe"
          width={650}
          height={650}
          className="rounded-lg object-cover w-full h-auto max-h-[650px]"
        />
      </div>
    </section>
  );
};

export default ArtisanSpotlight;
