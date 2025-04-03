"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const $yoyoAnimation = (obj: HTMLImageElement | null, x: number, y: number) => {
  return gsap.to(obj, {
    x,
    y,
    duration: 1.5,
    repeat: -1,
    yoyo: true, // 使动画来回进行
    ease: "power1.inOut",
  });
};

const Diamond = () => {
  const cactusRef = useRef<HTMLImageElement | null>(null);
  const girlRef = useRef<HTMLImageElement | null>(null);
  const flowerRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (cactusRef.current) {
      $yoyoAnimation(cactusRef.current, 2, 4);
    }
    if (girlRef.current) {
      $yoyoAnimation(girlRef.current, 3, 5);
    }
    if (flowerRef.current) {
      $yoyoAnimation(flowerRef.current, 3, 2);
    }
  }, []);

  return (
    <div className="absolute top-[120px] md:top-[76px] xl:top-[88px] left-1/2 -translate-x-1/2 z-10 w-[360px] h-[270px] md:w-[480px] md:h-[360px] xl:w-[560px] xl:h-[420px]">
      <div className="relative w-full h-full">
        {/* LOGO */}
        <div className="absolute z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/3">
          <div className="relative w-[120px] h-[120px] xl:w-[140px] xl:h-[140px] overflow-hidden ">
            <Image
              src="/images/logo.svg"
              width={300}
              height={300}
              alt="cactus"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
              priority
              ref={cactusRef}
            />
          </div>
        </div>

        {/* 右方菱形 - 仙人掌 */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 xl:top-10 xl:right-10">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <Image
              src="/images/cactus.svg"
              width={300}
              height={300}
              alt="cactus"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full h-auto"
              priority
              ref={cactusRef}
            />
          </div>
        </div>

        {/* 左方菱形 - 女孩 */}
        <div className="absolute top-6 left-6  md:top-8 md:left-8 xl:top-10 xl:left-10">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <Image
              src="/images/girl.svg"
              width={300}
              height={300}
              alt="girl"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full h-auto"
              priority
              ref={girlRef}
            />
          </div>
        </div>

        {/* 下方菱形 - 花 */}
        <div className="absolute bottom-6 md:bottom-8 xl:bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative bg-[#93B6E1] w-[120px] h-[120px] md:w-40 md:h-40 xl:w-[190px] xl:h-[190px] rotate-45 overflow-hidden ">
            <Image
              src="/images/flower.svg"
              width={300}
              height={300}
              alt="flower"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full h-auto"
              priority
              ref={flowerRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diamond;
