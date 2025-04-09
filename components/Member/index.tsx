"use client";
import { MemberDesktop } from "@/components/Member/MemberDesktop";
import MemberMobile from "@/components/Member/MemberMobile";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

{
  /* FIXME: 待重構：團隊成員 */
}
const Member = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1028px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在組件掛載之前不渲染任何內容，確保 SSR 與客戶端的一致性
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="relative text-[48px] lg:text-[120px] uppercase pl-3">
        Team Members
      </h1>
      {isDesktop && <MemberDesktop />}
      {!isDesktop && <MemberMobile />}
    </div>
  );
};

export default Member;
