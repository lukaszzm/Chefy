interface ITitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<ITitleProps> = ({ children }) => {
  return (
    <h1 className="font-medium text-gray-800 text-2xl m-2 capitalize text-center">
      {children}
    </h1>
  );
};
