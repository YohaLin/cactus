"use client";

import Container from "@/layouts/Container";
import AboutMobile from "./AboutMobile";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AboutTablet from "./AboutTablet";

const Story = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在組件掛載之前不渲染任何內容，確保 SSR 與客戶端的一致性
  if (!mounted) {
    return null;
  }

  return (
    <Container className="h-fit md:h-[6000px] overflow-hidden container-ref">
      {isMobile && <AboutMobile />}
      {!isMobile && <AboutTablet />}
    </Container>
  );
};

export default Story;
