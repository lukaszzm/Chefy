import React from "react";

interface ICheckBoxProps {
  id: string;
  text: string;
  isCheckedByDefault?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, ICheckBoxProps>(
  ({ id, text, isCheckedByDefault, ...rest }, ref) => {
    return (
      <li className="m-1">
        <input
          ref={ref}
          id={id}
          name={id}
          value={id}
          type="checkbox"
          defaultChecked={isCheckedByDefault}
          className={`hidden peer`}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`inline-flex p-1 px-2 text-gray-500 text-sm font-medium bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary peer-checked:hover:border-primary-hover text-center  hover:bg-gray-200 transition duration-150  ease-in-out`}
        >
          {text}
        </label>
      </li>
    );
  }
);

Checkbox.displayName = "Checkbox";
