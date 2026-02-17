"use client";
import { ReactNode } from "react";

interface ThemedViewProps {
  children: ReactNode;
  className?: string;
}

export function ThemedView({ children, className = "" }: ThemedViewProps) {
  return (
    <div className={`bg-black ${className}`}>
      {children}
    </div>
  );
}
