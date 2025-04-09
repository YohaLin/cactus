"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Diamond = () => {
  const cactusRef = useRef<HTMLImageElement | null>(null);
  const girlRef = useRef<HTMLImageElement | null>(null);
  const flowerRef = useRef<HTMLImageElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (cactusRef.current) {
        gsap.to(cactusRef.current, {
          x: 4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      if (girlRef.current) {
        gsap.to(girlRef.current, {
          x: 4,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (flowerRef.current) {
        gsap.to(flowerRef.current, {
          y: 2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    },
    // 使用mainRef作為作用域，確保只操作元件内的元素
    { scope: mainRef }
  );

  return (
    <div
      ref={mainRef}
      className="absolute top-[120px] md:top-[76px] xl:top-[88px] left-1/2 -translate-x-1/2 z-10 w-[360px] h-[270px] md:w-[480px] md:h-[360px] xl:w-[560px] xl:h-[420px]"
    >
      <div className="relative w-full h-full">
        {/* LOGO */}
        <div className="absolute z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/3">
          <div className="relative w-[120px] h-[120px] xl:w-[140px] xl:h-[140px] overflow-hidden ">
            <Image
              src="/images/logo.svg"
              width={300}
              height={300}
              alt="logo"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* 右方菱形 - 仙人掌 */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 xl:top-10 xl:right-10">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[120%] h-[120%]">
              <Image
                src="/images/cactus.svg"
                width={300}
                height={300}
                alt="girl"
                className="w-full h-full object-contain"
                priority
                ref={girlRef}
              />
            </div>
          </div>
        </div>

        {/* 左方菱形 - 女孩 */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 xl:top-10 xl:left-10">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <div className="absolute top-3/4 left-[85%] -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[200%] h-[200%]">
              <Image
                src="/images/girl.svg"
                width={300}
                height={300}
                alt="girl"
                className="w-full h-full object-contain"
                priority
                ref={girlRef}
              />
            </div>
          </div>
        </div>

        {/* 下方菱形 - 花 */}
        <div className="absolute bottom-6 md:bottom-8 xl:bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <div className="absolute top-2/3 left-[60%] -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[150%] h-[150%]">
              <Image
                src="/images/flower.svg"
                width={300}
                height={300}
                alt="girl"
                className="w-full h-full object-contain"
                priority
                ref={girlRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diamond;
