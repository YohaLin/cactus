"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Diamond from "./Diamond";

const Welcome: React.FC = () => {
  const grassRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (grassRef.current) {
      gsap.set(grassRef.current, { x: -3000 });

      animationRef.current = gsap.to(grassRef.current, {
        x: 0,
        duration: 60,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          gsap.set(grassRef.current, { x: -3000 });
        },
      });
    }

    // 为向下箭头添加动画效果
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true, // 使动画来回进行
        ease: "power1.inOut",
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 菱形区块布局 */}
      <Diamond />

      {/* 文字和箭头 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-center text-white text-[28px] xl:text-4xl font-bold">
        <span>
          種下希望
          <br />
          開啟你的冒險
        </span>
        {/* 向下箭头 */}
        <div
          ref={arrowRef}
          className="flex justify-center items-center w-[60px] h-[60px] border-4 border-white rounded-full"
        >
          <ArrowDownIcon className="h-10 w-10 text-white" />
        </div>
      </div>

      {/* 草地 */}
      <div className="absolute -bottom-0 xl:-bottom-8 w-full">
        <div ref={grassRef} className="relative w-[3959px] xl:w-[5120px]">
          <Image
            src="/images/grass.svg"
            width={6436}
            height={390}
            alt="grass"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
