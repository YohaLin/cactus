"use client";
import React from "react";
import Grass from "./Grass";
import Container from "@/layouts/Container";

const Footer: React.FC = () => {
  return (
    <Container className="h-[256px] lg:h-[320px] xl:h-[400px] lg:-mt-16">
      {/* 草地 */}
      <Grass />
    </Container>
  );
};

export default Footer;
