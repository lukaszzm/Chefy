interface ITitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<ITitleProps> = (props) => {
  const { children, className } = props;

  return (
    <h1
      className={`${className} font-semibold text-gray-800 text-2xl capitalize m-2`}
    >
      {children}
    </h1>
  );
};
