import { Tag } from "@/components/OLD_UI/Tag";

interface CategoryProps {
  category: string;
  area: string;
  hideLabel: boolean;
}

export const Category = ({ category, area, hideLabel }: CategoryProps) => {
  return (
    <>
      {!hideLabel && <h2 className="text-left font-medium text-gray-900">Category</h2>}
      <div className="flex">
        <Tag color="blue">{category}</Tag>
        <Tag color="orange">{area}</Tag>
      </div>
    </>
  );
};
