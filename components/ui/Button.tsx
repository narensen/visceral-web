"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variantStyles = {
    primary: "bg-white text-black hover:bg-neutral-200",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border-2 border-neutral-800 text-white hover:border-neutral-700",
    ghost: "text-neutral-400 hover:text-white hover:bg-neutral-900",
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
