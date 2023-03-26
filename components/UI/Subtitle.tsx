interface ISubtitleProps {
  children: React.ReactNode;
}

export const Subtitle: React.FC<ISubtitleProps> = ({ children }) => {
  return (
    <h2 className="text-left font-medium border-b-gray-400  text-lg">
      {children}
    </h2>
  );
};
