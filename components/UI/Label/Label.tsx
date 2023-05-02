interface ILabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label: React.FC<ILabelProps> = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="px-2 font-medium text-gray-700">
      {children}
    </label>
  );
};
