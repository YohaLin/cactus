"use client";
import { MemberDesktop } from "@/components/MemberDesktop";
import MemberMobile from "@/components/MemberMobile";
import Welcome from "@/components/Welcome";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const Home = () => {
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
    <div className="w-full">
      {/* Welcome Section */}
      <Welcome />
      {/* FIXME: 待重構：團隊成員 */}
      <div className="w-full h-full overflow-hidden">
        <h1 className="relative text-[48px] lg:text-[120px] uppercase pl-3">
          Team Members
        </h1>
        {isDesktop && <MemberDesktop />}
        {!isDesktop && <MemberMobile />}
      </div>
    </div>
  );
};

export default Home;
