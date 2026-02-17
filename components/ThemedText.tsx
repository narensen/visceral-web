"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemedTextProps {
  children: ReactNode;
  className?: string;
  type?: "default" | "title" | "subtitle" | "link" | "defaultSemiBold";
}

export function ThemedText({ 
  children, 
  className, 
  type = "default" 
}: ThemedTextProps) {
  const baseStyles = "text-white";
  
  const typeStyles = {
    default: "text-base",
    title: "text-3xl font-bold",
    subtitle: "text-xl font-semibold",
    link: "text-blue-400 hover:underline",
    defaultSemiBold: "text-base font-semibold",
  };

  return (
    <span className={cn(baseStyles, typeStyles[type], className)}>
      {children}
    </span>
  );
}
