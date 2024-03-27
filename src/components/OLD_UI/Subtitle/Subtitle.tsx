interface SubtitleProps {
  children: React.ReactNode;
  id?: string;
}

export const Subtitle = ({ children, id }: SubtitleProps) => {
  return (
    <h2 className="border-b-gray-400 text-left text-lg  font-medium" id={id}>
      {children}
    </h2>
  );
};
