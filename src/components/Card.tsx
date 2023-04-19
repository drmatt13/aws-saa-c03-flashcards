/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const Card = ({ front, back }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-[30rem] max-w-[90vw] h-72">
      <div
        className={`${
          !isFlipped ? "text-green-600" : "text-red-700"
        } absolute top-2.5 right-3 z-10 no-select pointer-events-none`}
      >
        {!isFlipped ? "front" : "back"}
      </div>
      <div
        className={`${
          !isFlipped ? "bg-slate-900" : "pointer-events-none opacity-0"
        } rounded-xl border border-slate-950 absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer`}
      >
        <div className="w-full h-full" onClick={() => setIsFlipped(true)}>
          {front}
        </div>
      </div>
      <div
        className={`${
          isFlipped ? "bg-slate-900" : "pointer-events-none opacity-0"
        } rounded-xl border border-slate-950 absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer`}
      >
        <div className="w-full h-full" onClick={() => setIsFlipped(false)}>
          {back}
        </div>
      </div>
    </div>
  );
};

export default Card;
