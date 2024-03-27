interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label className="px-2 font-medium text-gray-700" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
