import { Tag } from "@/components/UI/Tag";

interface ICategoryProps {
  category: string;
  area: string;
  hideLabel: boolean;
}

export const Category: React.FC<ICategoryProps> = ({
  category,
  area,
  hideLabel,
}) => {
  return (
    <>
      {!hideLabel && (
        <h2 className="text-left font-medium text-gray-900">Category</h2>
      )}
      <div className="flex">
        <Tag color="blue">{category}</Tag>
        <Tag color="orange">{area}</Tag>
      </div>
    </>
  );
};
