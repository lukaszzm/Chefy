interface TitleProps {
  children: React.ReactNode;
  id?: string;
}

export const Title = ({ children, id }: TitleProps) => {
  return (
    <h1
      id={id}
      className="font-medium text-gray-800 text-2xl m-2 capitalize text-center"
    >
      {children}
    </h1>
  );
};
