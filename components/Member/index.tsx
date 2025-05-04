"use client";
import { MemberDesktop } from "@/components/Member/MemberDesktop";
import MemberMobile from "@/components/Member/MemberMobile";
import Container from "@/layouts/Container";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

{
  /* FIXME: 待重構：團隊成員 */
}
const Member = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在組件掛載之前不渲染任何內容，確保 SSR 與客戶端的一致性
  if (!mounted) {
    return null;
  }

  return (
    <Container className="h-full overflow-hidden member">
      <p className="relative pl-2 lg:pl-6 uppercase text-heading-3 md:text-heading-2 xl:text-heading-1 text-blue ">
        Team Members
      </p>
      {isDesktop && <MemberDesktop />}
      {!isDesktop && <MemberMobile />}
    </Container>
  );
};

export default Member;
