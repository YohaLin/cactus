import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

const Grass = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (grassRef.current) {
        gsap.set(grassRef.current, { x: -3000 });

        gsap.to(grassRef.current, {
          x: 0,
          duration: 60,
          ease: "linear",
          repeat: -1,
          onRepeat: () => {
            gsap.set(grassRef.current, { x: -3000 });
          },
        });
      }

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: containerRef }
  );
  return (
    <>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-center text-white text-[28px] xl:text-4xl font-bold">
        <span>
          種下希望
          <br />
          開啟你的冒險
        </span>
        {/* 向下箭頭 */}
        <div
          ref={arrowRef}
          className="flex justify-center items-center w-[60px] h-[60px] border-4 border-white rounded-full"
        >
          <ArrowDownIcon className="h-10 w-10 text-white" />
        </div>
      </div>
      <div
        ref={containerRef}
        className="absolute -bottom-0 xl:-bottom-8 w-full"
      >
        <div ref={grassRef} className="relative w-[3959px] xl:w-[5120px]">
          <Image
            src="/images/grass.svg"
            width={6436}
            height={390}
            alt="草地"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Grass;
