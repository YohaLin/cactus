"use client";
import React from "react";
import Diamond from "./Diamond";
import Clouds from "./Clouds";
import Grass from "./Grass";
import Container from "@/layouts/Container";

const Welcome: React.FC = () => {
  return (
    <Container className="h-[640px] xl:h-[780px]">
      {/* 菱形區塊佈局 */}
      <Diamond />

      {/* 雲們 */}
      <Clouds />

      {/* 草地 */}
      <Grass />
    </Container>
  );
};

export default Welcome;
