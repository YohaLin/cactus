"use client";
import React from "react";
import Diamond from "./Diamond";
import Clouds from "./Clouds";
import Grass from "./Grass";

const Welcome: React.FC = () => {
  return (
    <div className="w-full h-[640px] xl:h-[780px] relative overflow-hidden">
      {/* 菱形區塊佈局 */}
      <Diamond />

      {/* 雲們 */}
      <Clouds />

      {/* 草地 */}
      <Grass />
    </div>
  );
};

export default Welcome;
