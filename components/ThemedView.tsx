"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemedViewProps {
  children: ReactNode;
  className?: string;
}

export function ThemedView({ children, className }: ThemedViewProps) {
  return (
    <div className={cn("bg-black", className)}>
      {children}
    </div>
  );
}
