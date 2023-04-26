import { Tag } from "@/components/ui/Tag/Tag";

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
        <p className="text-left font-medium text-gray-900">Category</p>
      )}
      <div className="flex">
        <Tag color="blue">{category}</Tag>
        <Tag color="orange">{area}</Tag>
      </div>
    </>
  );
};
