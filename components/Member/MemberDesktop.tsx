"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import clsx from "clsx";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { membersList } from "@/constants/members";

export const MemberDesktop = () => {
  const [currentId, setCurrentId] = useState(1);
  const [direction, setDirection] = useState<"previous" | "next" | null>(null);
  const [isDetailShowed, setIsDetailShowed] = useState(false);
  const isFirstRender = useRef(true);

  const previousMemberId = () => {
    return currentMember?.previousId || 1;
  };

  const nextMemberId = () => {
    return currentMember?.nextId || 1;
  };

  const handlePrevious = () => {
    // 第一次渲染不產生動畫
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const newId = previousMemberId();
    setDirection("previous");
    setCurrentId(newId);
  };

  const currentMember = $findMember(currentId);
  const previousOneMember = $findMember(previousMemberId());
  const previousTwoMember = $findMember(previousOneMember?.previousId || 0);
  const nextOneMember = $findMember(nextMemberId());
  const nextTwoMember = $findMember(nextOneMember?.nextId || 0);
  const nextThreeMember = $findMember(nextTwoMember?.nextId || 0);
  const nextFourMember = $findMember(nextThreeMember?.nextId || 0);

  const handleNext = () => {
    // 第一次渲染不產生動畫
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const newId = nextMemberId();
    setDirection("next");
    setCurrentId(newId);
  };

  useEffect(() => {
    // 點擊上一位
    if (direction === "previous") {
      gsap.fromTo(
        ".currentMember",
        { x: "5%" },
        {
          x: "0",
          duration: 0.5,
          ease: "back.out",
        }
      );

      gsap.fromTo(
        ".slide",
        { x: "100%" },
        {
          x: "0%",
          duration: 1,
          ease: "circ.out",
        }
      );

      gsap.fromTo(
        ".nextOneMember",
        { clipPath: "inset(0 0 0 0)", x: "0" },
        {
          clipPath: "inset(0 100% 0 0)",
          x: "-10%",
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".mask",
        { x: "100%" },
        {
          x: "-100%",
          duration: 1,
          ease: "power2.out",
        }
      );
    }

    // 點擊下一位
    if (direction === "next") {
      gsap.fromTo(
        ".currentMember",
        { x: "-5%" },
        {
          x: "0",
          duration: 0.5,
          ease: "back.out",
        }
      );

      gsap.fromTo(
        ".slide",
        { x: "-100%" },
        {
          x: "0%",
          duration: 1,
          ease: "circ.out",
        }
      );

      gsap.fromTo(
        ".previousOneMember",
        { clipPath: "inset(0 0 0 0)", x: "0" },
        {
          clipPath: "inset(0 0 0 100%)",
          x: "10%",
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".mask",
        { x: "-100%" },
        {
          x: "100%",
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [currentId, direction]);

  return (
    <>
      {/* 詳細資訊 */}
      <div
        className={clsx(
          "absolute z-10 left-0 w-full h-[calc(100vh-9rem)] bg-white opacity-60"
        )}
      />
      <div
        className={clsx(
          "absolute z-20 left-0 w-full h-[calc(100vh-9rem)] bg-white text-xl detail-bg transform transition-all duration-300",
          {
            "opacity-1": isDetailShowed,
            "opacity-0": !isDetailShowed,
          }
        )}
      >
        <div
          className={clsx(
            "flex flex-col gap-2 w-[50%] pt-20 pl-[calc(100vw/6)] pr-20 detail transform transition-all duration-100 delay-200",
            {
              "opacity-1": isDetailShowed,
              "opacity-0": !isDetailShowed,
            }
          )}
        >
          <p className="whitespace-pre-line leading-10">
            {currentMember?.description}
          </p>
        </div>
      </div>

      {/* 幻燈片，圖片尺寸 4/3 */}
      <div className="relative grid grid-cols-6 gap-x-3 w-full h-[calc(100vw/3/3*4)] justify-between text-black text-[60px] overflow-hidden">
        {/* 左邊幻燈片的假圖 */}
        <Image
          src={nextFourMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 -left-[16.666%] mt-40 w-1/6 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={currentMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 left-[calc(50%+6px)] mt-40 w-[calc(100%/6-10px)] aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        {/* 右邊幻燈片的假圖 */}
        <Image
          src={currentMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 left-[calc(66.666%-6px)] mt-40 w-1/6 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={previousTwoMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 -right-[calc(16.666%+6px)] mt-40 w-[calc(100%/6-10px)] aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />

        {/* 左邊幻燈片 */}
        <Image
          src={nextThreeMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={nextTwoMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={nextOneMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />

        {/* 選中的幻燈片 */}
        <div className="relative flex col-span-2">
          <div
            className="absolute z-30 w-full h-[calc(100vw/3/3*4)] overflow-hidden group cursor-pointer rounded-3xl"
            onClick={() => setIsDetailShowed((prev) => !prev)}
          >
            <div className="absolute top-0 left-0 z-20 w-full h-full overflow-hidden">
              {direction === "next" && (
                <Image
                  src={previousOneMember?.avatar || ""}
                  width={300}
                  height={400}
                  alt="avatar"
                  className={clsx(
                    "w-full h-full aspect-[3/4] object-cover rounded-3xl previousOneMember",
                    isFirstRender.current && "hidden"
                  )}
                />
              )}
              {direction === "previous" && (
                <Image
                  src={nextOneMember?.avatar || ""}
                  width={300}
                  height={400}
                  alt="avatar"
                  className={clsx(
                    "w-full h-full aspect-[3/4] object-cover rounded-3xl nextOneMember",
                    isFirstRender.current && "hidden"
                  )}
                />
              )}
              <div
                className={clsx(
                  "absolute top-0 z-10 w-full h-full bg-blue mask",
                  isFirstRender.current && "hidden"
                )}
              ></div>
            </div>
            <Image
              src={currentMember?.avatar || ""}
              width={300}
              height={400}
              alt="avatar"
              className="w-full h-full aspect-[3/4] object-cover rounded-3xl transition-all group-hover:scale-105 currentMemberRef z-20"
            />
            <div className="absolute z-20 bottom-0 flex flex-col gap-1 pl-6 pb-6 w-full h-fit text-white">
              <div className="text-7xl font-bold">{currentMember?.name}</div>
              <div className="text-3xl">{currentMember?.title}</div>
            </div>
          </div>
          <button
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 -left-40 p-2 border-8 border-blue text-white rounded-full flex items-center justify-center transition-all duration-300",
              {
                "translate-x-40 z-10": isDetailShowed,
                "translate-x-0 z-30": !isDetailShowed,
              }
            )}
            onClick={handlePrevious}
          >
            <ArrowLeftIcon className="size-24 stroke-blue" />
          </button>
          <button
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 -right-40 p-2 border-8 border-blue text-white rounded-full flex items-center justify-center transition-all duration-300",
              {
                "-translate-x-40 z-10": isDetailShowed,
                "translate-x-0 z-30": !isDetailShowed,
              }
            )}
            onClick={handleNext}
          >
            <ArrowRightIcon className="size-24 stroke-blue" />
          </button>
        </div>

        {/* 右邊幻燈片 */}
        <Image
          src={previousOneMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className="-z-10 w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
        />
      </div>
    </>
  );
};

const $findMember = (memberId: number) =>
  membersList.find((member) => member.id === memberId);
