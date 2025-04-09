import clsx from "clsx";
import React, { FC, ReactNode } from "react";

type Props_Container = {
  className?: string;
  children: ReactNode;
};

const Container: FC<Props_Container> = ({ className, children }) => {
  return (
    <div className={clsx("w-full relative overflow-hidden", className)}>
      {children}
    </div>
  );
};

export default Container;
