import React from "react";

interface CheckBoxProps {
  id: string;
  text: string;
  isCheckedByDefault?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ id, text, isCheckedByDefault, ...rest }, ref) => {
    return (
      <li className="m-1">
        <input
          className={`peer hidden`}
          defaultChecked={isCheckedByDefault}
          id={id}
          name={id}
          ref={ref}
          type="checkbox"
          value={id}
          {...rest}
        />
        <label
          className={`peer-checked:hover:border-primary-hover inline-flex cursor-pointer rounded-lg border-2 border-gray-200 bg-gray-100 p-1 px-2 text-center text-sm font-medium text-gray-500 transition duration-150  ease-in-out hover:bg-gray-200 peer-checked:border-primary  peer-checked:text-primary`}
          htmlFor={id}
        >
          {text}
        </label>
      </li>
    );
  }
);

Checkbox.displayName = "Checkbox";
