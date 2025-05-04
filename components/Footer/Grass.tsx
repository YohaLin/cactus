import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0 w-full text-center text-black">
        <p className="text-base xl:text-lg font-semibold">
          隱私權政策｜使用者規約
        </p>
        <p className="text-sm xl:text-lg font-semibold">
          Cactus Flower Studio © 2024-2025
        </p>
        <p className="text-sm xl:text-lg font-semibold">
          Contact:contact@cactus-flower.studio
        </p>
      </div>

      <div className="absolute z-10 lg:z-20 right-4 lg:right-16 top-8 lg:top-0 w-[120px] lg:w-[180px] xl:w-[220px]">
        <Image
          src="/images/blueGrass.svg"
          width={150}
          height={150}
          alt="藍草"
          className="w-full h-auto"
          priority
        />
      </div>

      <div ref={containerRef} className="absolute -bottom-0 w-full">
        <div
          ref={grassRef}
          className="relative -bottom-2 w-[3959px] xl:w-[5120px]"
        >
          <Image
            src="/images/footer.svg"
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
