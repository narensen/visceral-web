"use client";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-neutral-400 text-sm mb-2 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-neutral-900 border ${
            error ? "border-negative" : "border-neutral-800"
          } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-700 transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="text-negative text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
