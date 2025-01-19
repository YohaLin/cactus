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
  const [list, setList] = useState([
    ...membersList.map((member) => ({
      ...member,
      id: uuidv4(),
    })),
    ...membersList.map((member) => ({
      ...member,
      id: uuidv4(),
    })),
  ]);
  const containerRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    if (slideRef.current && containerRef.current) {
      Draggable.create(slideRef.current, {
        type: "x",
        inertia: true,
        onClick: function () {},
        onDrag: function () {
          const slideGroup = document.querySelector(".slideGroup");
          if (slideGroup) {
            const rect = slideGroup.getBoundingClientRect();
            if (rect.right < window.innerWidth) {
              setList((prev) => [
                ...prev,
                ...membersList.map((member) => ({
                  ...member,
                  id: uuidv4(),
                })),
              ]);
            }
          }
        },
      });
    }
    return () => {
      if (Draggable.get(slideRef.current)) {
        Draggable.get(slideRef.current).kill();
      }
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 w-screen h-screen bg-[#1f1d1d] text-sm detail-bg  overflow-hidden",
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

      <div ref={containerRef} className="w-auto h-full overflow-hidden">
        <div ref={slideRef} className="w-auto flex cursor-pointer">
          <div className="flex flex-shrink-0 gap-4 -translate-x-[calc(50vh/4*3*9+(8rem))] slideGroup">
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
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberMobile;
