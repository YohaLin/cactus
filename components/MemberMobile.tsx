"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";
import Image from "next/image";
import { membersList } from "@/constants/members";

gsap.registerPlugin(Draggable);

const MemberMobile = () => {
  const containerRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    // 確保元素已掛載後初始化 Draggable
    if (slideRef.current && containerRef.current) {
      Draggable.create(slideRef.current, {
        type: "x",
        inertia: false,
        // FIXME: 點擊顯示詳細資訊 Modal
        onClick: function () {
          console.log("clicked");
        },
        onDragEnd: function () {
          // alert("drag ended");
        },
        // FIXME: 如果是照片的最右邊超過螢幕最右邊 20px 時，就接上一組圖片
        // FIXME: 如果是照片的最左邊超過螢幕最左邊 20px 時，就接上一組圖片
        onDrag: function () {
          // const lastOne = document.querySelector(
          //   `.image-${membersList.length}`
          // );
          // if (lastOne) {
          //   // 取得圖片的邊界資訊
          //   const rect = lastOne.getBoundingClientRect();
          //   // 檢查圖片右側是否超過螢幕右邊 20px 的位置
          //   if (rect.right === window.innerWidth) {
          //     alert("123");
          //   }
          //   console.log("rect.right: ", rect.right);
          //   console.log("window.innerWidth: ", window.innerWidth);
          // }
        },
      });
    }

    // FIXME: 加上清理函式
    return () => {};
  }, []);


  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden border">
      <div ref={slideRef} className="flex border">
        {/* FIXME: 照片用三張就好？ */}
        {membersList?.map((member) => (
          <Image
            key={member.id}
            src={member.avatar || ""}
            width={300}
            height={400}
            alt="avatar"
            className={clsx(
              "h-[50vh] w-auto aspect-[3/4] object-cover rounded-3xl",
              `image-${member.id}`
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberMobile;
