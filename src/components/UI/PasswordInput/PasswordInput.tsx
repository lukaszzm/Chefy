import React, { useState } from "react";

import type { FieldError } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";

import { Input } from "@/components/UI/Input/Input";

interface PasswordInputProps {
  placeholder: string;
  error?: FieldError;
  name: string;
  id: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, error, name, id, ...rest }, ref) => {
    const [type, setType] = useState<"text" | "password">("password");

    const switchType = () => {
      setType((prevType) => (prevType === "text" ? "password" : "text"));
    };

    return (
      <div className="relative">
        <Input id={id} name={name} placeholder={placeholder} ref={ref} type={type} {...rest} error={error} />
        <button
          aria-label="show password"
          className="absolute right-4 top-2 text-gray-500"
          type="button"
          onClick={switchType}
        >
          {type === "password" ? <BiShow size={26} /> : <BiHide size={26} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
