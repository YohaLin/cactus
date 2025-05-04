"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timelineData } from "@/constants/story";
import clsx from "clsx";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const AboutMobile = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const timelineBarRef = useRef<HTMLDivElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const girlImageRef = useRef<HTMLDivElement | null>(null);
  const keepGoingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        containerRef.current &&
        textRef.current &&
        timelineBarRef.current &&
        timelineContainerRef.current &&
        girlImageRef.current &&
        keepGoingRef.current
      ) {
        // 創建主時間線
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2500", // 增加滾動長度
            scrub: 1, // 平滑滾動效果
            pin: true, // 固定元素在視口中
            pinSpacing: true,
            // anticipatePin: 1,
          },
        });

        mainTimeline
          .to(
            textRef.current,
            {
              y: "-100%",
              opacity: 0,
              duration: 0.5,
              ease: "power1.inOut",
            },
            0
          )
          .fromTo(
            timelineContainerRef.current,
            {
              y: "100%",
              opacity: 0,
              ease: "power1.inOut",
            },
            {
              y: "0%",
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            },
            0
          )
          .to(
            [girlImageRef.current, keepGoingRef.current],
            {
              x: "-100vw",
              duration: 0.5,
              ease: "power1.inOut",
            },
            0.5
          )
          .fromTo(
            timelineContainerRef.current,
            {
              x: "0%",
              ease: "power1.inOut",
              delay: 0.2,
            },
            {
              x:
                containerRef.current!.offsetWidth -
                timelineContainerRef.current!.offsetWidth,
              duration: 0.5,
              ease: "power1.inOut",
            },
            0.5
          )
          .fromTo(
            timelineBarRef.current,
            {
              width: "0%",
            },
            {
              width: "100%",
              duration: 0.5,
              ease: "none",
            },
            0.5
          );
      }
    },
    { scope: ".container-ref" }
  );

  return (
    <div
      ref={containerRef}
      className="w-full md:h-[640px] xl:h-[780px] flex flex-col relative"
    >
      {/* 標題 */}
      <div className="flex items-center w-full h-[15%] bg-white">
        <p className="pl-2 lg:pl-6 uppercase text-heading-3 md:text-heading-2 xl:text-heading-1 text-blue">
          our story
        </p>
      </div>
      {/* 描述文字和時間線的容器 */}
      <div className="flex flex-col gap-2 flex-1 relative overflow-hidden bg-blue">
        {/* 描述文字 - 會向上滑動 */}
        <div
          ref={textRef}
          className="flex justify-end xl:justify-start items-center w-full h-full p-4 md:p-6 xl:pr-10 pt-10"
        >
          <p className="w-full h-fit md:w-[60%] max-w-[800px] text-sm md:text-base xl:text-[22px] xl:leading-7 xl:ml-[40%] font-bold text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum
            passages,Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages,
          </p>
        </div>

        {/* 時間線區域 - 固定在下方 */}
        <div
          ref={timelineContainerRef}
          className="absolute left-[40%] top-0 z-30 w-[calc(30vw*5+40%)] h-full flex flex-col items-start"
        >
          {/* 背景線 */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[calc(30vw*5+40%)] h-2 bg-white"></div>

          {/* 動態延伸的線 */}
          <div
            ref={timelineBarRef}
            className="absolute top-1/2 -translate-y-1/2 left-1 w-[calc(30vw*5+40%)] h-[3px] bg-pink z-40"
          />

          {/* 使用 map 渲染所有時間點 */}
          <div className="flex w-full h-full">
            {timelineData.map((point, index) => (
              <div
                key={point.id}
                className="flex items-center gap-4 w-[30vw] h-full z-10"
              >
                <div className="w-4 h-4 rounded-full bg-pink outline outline-4 outline-white" />
                <div className="flex flex-col justify-center gap-[72px] w-full h-full">
                  <div
                    className={clsx(
                      "w-[70%] h-[30%] min-w-[175px] min-h-[75px]",
                      index % 2 === 1 && "order-2"
                    )}
                  >
                    <Image
                      src={point.image}
                      width={40}
                      height={40}
                      alt={point.title}
                      className="w-full h-full object-fill rounded-xl"
                      priority
                    />
                  </div>
                  <div
                    className={clsx(
                      "flex flex-col w-[70%] h-[30%] min-w-[175px] min-h-[75px]",
                      index % 2 === 1 && "justify-end"
                    )}
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {point.date + index}
                    </h3>
                    <p className="text-gray-200 ">{point.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" w-full md:h-[15%] bg-white" />

      {/* 女孩跟字 */}
      <div
        ref={girlImageRef}
        className="absolute bottom-2 left-10 w-[300px] h-[485px] xl:left-20 xl:w-[380px] xl:h-[620px]"
      >
        <Image
          src="/images/girl.svg"
          width={300}
          height={300}
          alt="女孩圖片"
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <div
        ref={keepGoingRef}
        className="absolute bottom-[10%] left-8 w-[250px] h-[120px] xl:left-10 xl:w-[350px] xl:h-[170px]"
      >
        <Image
          src="/images/keepGoing.svg"
          width={250}
          height={120}
          alt="繼續前進標語"
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default AboutMobile;
