"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { MemberType, membersList } from "@/constants/members";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(Draggable);

const MemberMobile = () => {
  const [isDetailShowed, setIsDetailShowed] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberType | null>(null);
  const [list] = useState([
    ...membersList.map((member) => ({
      ...member,
      id: uuidv4(),
    })),
  ]);
  const containerRef = useRef(null);
  const slideRef = useRef(null);
  const slideGroupRef = useRef(null);

  // 修正：為 requestAnimationFrame 正確設置 animationId 的類型
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocityX = useRef(0);
  const lastTime = useRef(0);
  const animationId = useRef<number | null>(null);

  // 邊界參考
  const minX = useRef<number>(0);
  const maxX = useRef<number>(0);

  // 根據容器和滑動區域大小計算邊界
  const calculateBounds = () => {
    if (!containerRef.current || !slideGroupRef.current) return;

    const container = containerRef.current as HTMLElement;
    const slideGroup = slideGroupRef.current as HTMLElement;

    const containerWidth = container.offsetWidth;
    const slideGroupWidth = slideGroup.offsetWidth;

    // 最大右側位置（應為負數或零）
    maxX.current = 0;

    // 最小左側位置（應為負數且等於超出的寬度）
    // 我們添加一個小緩衝區（20px）以確保最後一個項目完全可見
    minX.current = Math.min(0, containerWidth - slideGroupWidth - 20);
  };

  // 自定義慣性處理器（帶邊界限制）
  const applyInertia = () => {
    if (!slideRef.current) return;

    // 衰減係數（較小的值 = 更強的慣性）
    const decay = 0.75;
    // 速度閾值，低於此值停止動畫
    const stopThreshold = 0.5;

    const slide = slideRef.current as HTMLElement;
    const currentX = gsap.getProperty(slide, "x") as number;

    // 應用速度，計算新位置（帶邊界）
    let newX = currentX + velocityX.current;

    // 應用邊界 - 這是我們在邊緣停止的地方
    if (newX > maxX.current) {
      newX = maxX.current;
      velocityX.current = 0; // 碰到邊緣時停止
    } else if (newX < minX.current) {
      newX = minX.current;
      velocityX.current = 0; // 碰到邊緣時停止
    }

    // 設置新位置
    gsap.set(slide, { x: newX });

    // 減小速度（模擬摩擦）
    velocityX.current *= decay;

    // 如果速度足夠小，停止動畫
    if (Math.abs(velocityX.current) < stopThreshold) {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
      return;
    }

    // 繼續動畫循環
    animationId.current = requestAnimationFrame(applyInertia);
  };

  useEffect(() => {
    if (slideRef.current && containerRef.current && slideGroupRef.current) {
      const slide = slideRef.current;

      // 計算初始邊界
      calculateBounds();

      // 創建可拖動對象並設置邊界
      Draggable.create(slide, {
        type: "x",
        // 添加邊界到可拖動對象
        bounds: {
          minX: minX.current,
          maxX: maxX.current,
        },
        edgeResistance: 0.65, // 在接近邊緣時添加阻力
        onClick: function () {},
        onDragStart: function () {
          // 拖動開始時重新計算邊界
          calculateBounds();

          // 更新可拖動對象的邊界
          this.applyBounds({
            minX: minX.current,
            maxX: maxX.current,
          });

          // 開始拖動時停止慣性動畫
          if (animationId.current !== null) {
            cancelAnimationFrame(animationId.current);
            animationId.current = null;
          }

          isDragging.current = true;
          velocityX.current = 0;
          lastX.current = gsap.getProperty(slide, "x") as number;
          lastTime.current = performance.now();
        },
        onDrag: function () {
          // 計算拖動速度
          const currentTime = performance.now();
          const currentX = gsap.getProperty(slide, "x") as number;
          const deltaTime = currentTime - lastTime.current;

          if (deltaTime > 0) {
            // 計算速度（像素/毫秒）
            const newVelocity = (currentX - lastX.current) / deltaTime;
            // 平滑速度變化，避免突然移動
            velocityX.current = velocityX.current * 0.7 + newVelocity * 20;
          }

          lastX.current = currentX;
          lastTime.current = currentTime;
        },
        onDragEnd: function () {
          isDragging.current = false;

          // 開始慣性動畫
          if (
            animationId.current === null &&
            Math.abs(velocityX.current) > 0.1
          ) {
            animationId.current = requestAnimationFrame(applyInertia);
          }
        },
      });

      // 添加窗口調整大小事件監聽器以重新計算邊界
      window.addEventListener("resize", calculateBounds);
    }

    return () => {
      window.removeEventListener("resize", calculateBounds);

      if (Draggable.get(slideRef.current)) {
        Draggable.get(slideRef.current).kill();
      }

      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 w-screen h-screen bg-[#1f1d1d] text-sm detail-bg overflow-hidden",
          {
            "opacity-100 z-20": isDetailShowed,
            "opacity-0 -z-20": !isDetailShowed,
          }
        )}
      >
        <div
          className={clsx(
            "flex flex-col gap-6 items-end p-10 transform transition-all duration-100 delay-200"
          )}
        >
          <button
            className={clsx(
              "w-fit h-fit p-1 border-2 text-white rounded-full flex items-center justify-center"
            )}
            onClick={() => setIsDetailShowed(false)}
          >
            <XMarkIcon className="size-10" />
          </button>
          <p
            className={clsx(
              "whitespace-pre-line leading-6 w-full text-white transition-all duration-500",
              {
                "blur-none": isDetailShowed,
                "blur-md": !isDetailShowed,
              }
            )}
          >
            {currentMember?.description}
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-screen h-full overflow-hidden"
      >
        <div
          ref={slideRef}
          className="w-auto flex cursor-pointer will-change-transform px-2"
          style={{ touchAction: "none" }}
        >
          <div
            ref={slideGroupRef}
            className="flex flex-shrink-0 gap-4 slideGroup"
          >
            {list?.map((member) => (
              <Image
                key={member.id}
                src={member.avatar || ""}
                width={300}
                height={400}
                alt="avatar"
                className="h-[50vh] w-auto aspect-[3/4] object-cover rounded-3xl"
                onClick={() => {
                  setCurrentMember(() => member);
                  setIsDetailShowed((prev) => !prev);
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberMobile;
