interface IContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<IContainerProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen h-full sm:ml-[8rem] md:ml-[16rem] flex justify-center items-start sm:items-center">
      {children}
    </div>
  );
};
