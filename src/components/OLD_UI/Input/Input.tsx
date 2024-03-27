import React from "react";

import classNames from "classnames";
import type { FieldError } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  error?: FieldError;
  name: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, name, id, ...rest }, ref) => {
    const inputStyles = classNames("w-full p-2 bg-gray-100 rounded border focus:outline-none", {
      "border-red-500": error,
      "border-gray-200": !error,
    });

    return (
      <>
        <input className={inputStyles} id={id} name={name} placeholder={placeholder} ref={ref} type={type} {...rest} />
        {error && <p className="px-1 text-xs text-red-500">{error.message}</p>}
      </>
    );
  }
);

Input.displayName = "Input";
