"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timelineData } from "@/constants/story";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const AboutMobile = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const timelineBarRef = useRef(null);

  useGSAP(
    () => {
      if (containerRef.current && textRef.current && timelineBarRef.current) {
        // 文字段落向上滑動的動畫
        gsap.to(textRef.current, {
          y: "-20%",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            end: "bottom 30%",
            scrub: true,
          },
        });

        // 時間線動畫初始設置
        gsap.set(timelineBarRef.current, {
          height: "0px", // 開始時高度為0
          top: "10px", // 調整起始位置對準第一個點
        });

        // 計算總長度：gap-20（間距為80px）* (時間點數量 - 1) + 額外的頂部和底部空間
        const timePointHeight = 176; // 每個時間點的高度（h-48）
        const gap = 80; // 對應gap-20的實際像素值
        const totalGap = gap * timelineData.length;
        const maxHeight = totalGap + timePointHeight * timelineData.length;

        // 創建滾動觸發器
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 30%",
          onUpdate: (self) => {
            const progress = self.progress;
            const height = progress * maxHeight; // 根據滾動進度調整高度

            gsap.to(timelineBarRef.current, {
              height: height,
              duration: 0.1,
            });
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col ">
      {/* 標題 */}
      <div className="flex items-center w-full h-[10%] md:h-[15%] bg-white">
        <p className="pl-2 lg:pl-6 uppercase text-heading-3 md:text-heading-2 xl:text-heading-1 text-blue">
          our story
        </p>
      </div>
      {/* 描述文字和時間線的容器 */}
      <div className="flex flex-col gap-2 flex-1 relative overflow-hidden  bg-blue">
        {/* 描述文字 - 會向上滑動 */}
        <div
          ref={textRef}
          className="flex justify-end w-full p-4 md:p-6 xl:pr-10 pt-10"
        >
          <p className="w-full max-w-[800px] text-sm font-bold text-white">
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
        <div className="relative w-full h-fit flex flex-col items-start px-4 pb-10">
          {/* 背景線 */}
          <div className="absolute top-0 left-[23px] h-full w-2 bg-white z-0"></div>

          {/* 動態延伸的線 */}
          <div
            ref={timelineBarRef}
            className="w-[3px] bg-pink absolute top-[6px] left-[25.5px] z-20"
            style={{ height: "0px", top: "10px" }}
          ></div>

          {/* 使用 map 渲染所有時間點 */}
          <div className="flex flex-col gap-10 w-full h-fit">
            {timelineData.map((point) => (
              <div
                key={point.id}
                className="flex gap-4 p-[3px] w-full h-48 z-10 -mt-2"
              >
                <div className="w-4 h-4 mt-2 rounded-full bg-pink outline outline-4 outline-white" />
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white">
                    {point.date}
                  </h3>
                  <p className="text-gray-200 ">{point.title}</p>
                  <div className="w-[180px] h-[108px] ">
                    <Image
                      src={point.image}
                      width={40}
                      height={40}
                      alt={point.title}
                      className="w-full h-full object-fill rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMobile;
