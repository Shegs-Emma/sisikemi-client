"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  numberOnly?: boolean;
  benefits?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, numberOnly, benefits, value, name, onChange, ...props },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState<string>(
      (value as string) || ""
    );

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const formatNumber = (value: string) => {
      // Remove any non-numeric characters except for the period (.)
      const cleanedValue = value.replace(/[^\d.]/g, "");

      // Format the number with commas
      const parts = cleanedValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let formattedValue = e.target.value;

      if (numberOnly) {
        formattedValue = formatNumber(formattedValue);
        setInputValue(formattedValue);
      } else {
        setInputValue(e.target.value);
      }

      // Pass the formatted value to the parent component if onChange is provided
      if (onChange) {
        const event = {
          ...e,
          target: { ...e.target, value: formattedValue, name: name },
        };
        onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
    };

    // Sync internal state with value prop changes (for controlled components)
    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value as string);
      }
    }, [value]);

    return (
      <div className="relative flex items-center w-full">
        <input
          ref={ref}
          type={isPasswordVisible ? "text" : type}
          value={inputValue}
          name={name}
          onChange={handleChange}
          className={cn(
            "input-base-class",
            className // Merge additional class names
          )}
          {...props} // Pass other input props
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2"
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
