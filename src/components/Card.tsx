/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const Card = ({ front, back }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-[30rem] max-w-[90vw] h-72"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        className="rounded-xl bg-neutral-900 border border-neutral-800 absolute top-0 left-0 w-full h-full flex justify-center items-center transition-transform duration-1000 ease-in-out"
        style={{
          transform: `rotate3d(0, ${isFlipped ? 1 : 0}, 0, 180deg)`,
          backfaceVisibility: "hidden",
        }}
      >
        <img
          className="no-select pointer-events-none absolute top-0 left-0 w-full h-full object-cover rounded-xl -z-10 blur opacity-25"
          src="./background2.webp"
          alt="background"
          // disable draggability
          draggable={false}
        />
        <div className="w-full h-full">{front}</div>
      </div>
      <div
        className="rounded-xl bg-neutral-900 border border-neutral-800 absolute top-0 left-0 w-full h-full flex justify-center items-center transition-transform duration-1000 ease-in-out"
        style={{
          transform: `rotate3d(0, ${isFlipped ? 0 : 1}, 0, 180deg)`,
          backfaceVisibility: "hidden",
        }}
      >
        <img
          className="no-select pointer-events-none absolute top-0 left-0 w-full h-full object-cover rounded-xl -z-10 blur opacity-75"
          src="./background.avif"
          alt="background"
          draggable={false}
        />
        <div className="w-full h-full">{back}</div>
      </div>
    </div>
  );
};

export default Card;
