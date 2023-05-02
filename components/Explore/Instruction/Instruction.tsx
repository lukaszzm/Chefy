interface IInstructionProps {
  instruction: string;
}

export const Instruction: React.FC<IInstructionProps> = ({ instruction }) => {
  return (
    <>
      <h2 className="text-left font-medium text-gray-900">Instruction</h2>
      <div className="flex">
        <p className="text-gray-500 text-sm text-left">{instruction}</p>
      </div>
    </>
  );
};
