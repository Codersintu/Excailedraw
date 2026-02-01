"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variants:"primary" | "secondary" | "outlined";
  children: ReactNode;
  className?: string;
  appName: string;
  onClick:()=>void;
  size:"lg" | "sma"
}

export const Button = ({ children, className, appName,variants,onClick,size }: ButtonProps) => {
  return (
    <button
      className={`${className} ${size==="lg"?"px-4 py-3":"px-2 py-1"}`}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
