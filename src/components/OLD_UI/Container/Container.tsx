interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full min-h-screen h-full sm:ml-[8rem] md:ml-[16rem] flex justify-center items-start sm:items-center">
      {children}
    </div>
  );
};
