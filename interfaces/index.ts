export interface ApiResponse {
  isError: boolean;
  text: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Category extends Area {}

export interface Recipe {
  id: string;
  title: string;
  imageSrc: string;
  ingredients: string[];
  instructions: string;
  category: Category;
  area: Area;
}
