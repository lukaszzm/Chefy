interface InstructionProps {
  instruction: string;
}

export const Instruction = ({ instruction }: InstructionProps) => {
  return (
    <>
      <h2 className="text-left font-medium text-gray-900">Instruction</h2>
      <div className="flex">
        <p className="text-gray-500 text-sm text-left">{instruction}</p>
      </div>
    </>
  );
};
