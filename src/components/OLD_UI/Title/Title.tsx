interface TitleProps {
  children: React.ReactNode;
  id?: string;
}

export const Title = ({ children, id }: TitleProps) => {
  return (
    <h1 className="m-2 text-center text-2xl font-medium capitalize text-gray-800" id={id}>
      {children}
    </h1>
  );
};
