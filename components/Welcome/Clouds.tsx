"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Clouds = () => {
  const cloudOneRef = useRef<HTMLImageElement | null>(null);
  const cloudTwoRef = useRef<HTMLImageElement | null>(null);
  const cloudThreeRef = useRef<HTMLImageElement | null>(null);
  const cloudFourRef = useRef<HTMLImageElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 雲朵一動畫
      if (cloudOneRef.current) {
        gsap.to(cloudOneRef.current, {
          x: 20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // 雲朵二動畫
      if (cloudTwoRef.current) {
        gsap.to(cloudTwoRef.current, {
          x: -15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 雲朵三動畫
      if (cloudThreeRef.current) {
        gsap.to(cloudThreeRef.current, {
          x: 25,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // 雲朵四動畫
      if (cloudFourRef.current) {
        gsap.to(cloudFourRef.current, {
          x: -20,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: mainRef }
  );

  return (
    <div
      ref={mainRef}
      className="relative w-full h-full mt-4 lg:mt-10 pointer-events-none overflow-hidden"
    >
      {/* 左上雲朵 */}
      <div className="absolute -left-28 md:-left-20">
        <div className="relative">
          <Image
            src="/images/cloudTwo.svg"
            width={190}
            height={30}
            alt="cloud 2"
            priority
            ref={cloudOneRef}
          />
        </div>
      </div>

      {/* 右上雲朵 */}
      <div className="absolute top-12 -right-16 md:-right-10">
        <div className="relative">
          <Image
            src="/images/cloudOne.svg"
            width={190}
            height={33}
            alt="cloud 1"
            priority
            ref={cloudTwoRef}
          />
        </div>
      </div>

      {/* 左下雲朵 */}
      <div className="hidden md:block absolute top-60 left-[8%]">
        <div className="relative">
          <Image
            src="/images/cloudThree.svg"
            width={120}
            height={30}
            alt="cloud 3-1"
            priority
            ref={cloudThreeRef}
          />
        </div>
      </div>

      {/* 右下雲朵 */}
      <div className="hidden md:block absolute top-72 right-[5%]">
        <div className="relative">
          <Image
            src="/images/cloudThree.svg"
            width={60}
            height={15}
            alt="cloud 3-2"
            priority
            ref={cloudFourRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Clouds;
