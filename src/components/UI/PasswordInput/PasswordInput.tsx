import { Input } from "@/components/UI/Input";
import { FieldError } from "react-hook-form";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

interface PasswordInputProps {
  placeholder: string;
  error?: FieldError;
  name: string;
  id: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ placeholder, error, name, id, ...rest }, ref) => {
  const [type, setType] = useState<"text" | "password">("password");

  const switchType = () => {
    setType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        {...rest}
        error={error}
      />
      <button
        type="button"
        onClick={switchType}
        className="absolute right-4 top-2 text-gray-500"
        aria-label="show password"
      >
        {type === "password" ? <BiShow size={26} /> : <BiHide size={26} />}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
