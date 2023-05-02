interface SubtitleProps {
  children: React.ReactNode;
  id?: string;
}

export const Subtitle = ({ children, id }: SubtitleProps) => {
  return (
    <h2 id={id} className="text-left font-medium border-b-gray-400  text-lg">
      {children}
    </h2>
  );
};
