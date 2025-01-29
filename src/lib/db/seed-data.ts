import type { Area, Category, Recipe } from "@/types";

type SeedDataSchema = {
  Categories: Category[];
  Areas: Area[];
  Recipes: Recipe[];
};

export const SeedData = {
  Categories: [
    {
      id: "1",
      name: "Beef",
    },
    {
      id: "2",
      name: "Breakfast",
    },
    {
      id: "3",
      name: "Chicken",
    },
    {
      id: "4",
      name: "Dessert",
    },
    {
      id: "5",
      name: "Goat",
    },
    {
      id: "6",
      name: "Lamb",
    },
    {
      id: "7",
      name: "Miscellaneous",
    },
    {
      id: "8",
      name: "Pasta",
    },
    {
      id: "9",
      name: "Pork",
    },
    {
      id: "10",
      name: "Seafood",
    },
    {
      id: "11",
      name: "Side",
    },
    {
      id: "12",
      name: "Starter",
    },
    {
      id: "13",
      name: "Vegan",
    },
    {
      id: "14",
      name: "Vegetarian",
    },
  ],
  Areas: [
    {
      id: "1",
      name: "American",
    },
    {
      id: "2",
      name: "British",
    },
    {
      id: "3",
      name: "Canadian",
    },
    {
      id: "4",
      name: "Chinese",
    },
    {
      id: "5",
      name: "Dutch",
    },
    {
      id: "6",
      name: "Egyptian",
    },
    {
      id: "7",
      name: "French",
    },
    {
      id: "8",
      name: "Greek",
    },
    {
      id: "9",
      name: "Indian",
    },
    {
      id: "10",
      name: "Irish",
    },
    {
      id: "11",
      name: "Italian",
    },
    {
      id: "12",
      name: "Jamaican",
    },
    {
      id: "13",
      name: "Japanese",
    },
    {
      id: "14",
      name: "Kenyan",
    },
    {
      id: "15",
      name: "Malaysian",
    },
    {
      id: "16",
      name: "Mexican",
    },
    {
      id: "17",
      name: "Moroccan",
    },
    {
      id: "18",
      name: "Polish",
    },
    {
      id: "19",
      name: "Portuguese",
    },
    {
      id: "20",
      name: "Russian",
    },
    {
      id: "21",
      name: "Spanish",
    },
    {
      id: "22",
      name: "Thai",
    },
    {
      id: "23",
      name: "Tunisian",
    },
    {
      id: "24",
      name: "Turkish",
    },
    {
      id: "25",
      name: "Unknown",
    },
    {
      id: "26",
      name: "Vietnamese",
    },
  ],
  Recipes: [
    {
      id: "52772",
      imageSrc: "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
      title: "Teriyaki Chicken Casserole",
      categoryId: "3",
      areaId: "1",
      instructions:
        "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray. Combine soy sauce, water, brown sugar, ground ginger, and minced garlic in a saucepan over medium heat. In a small bowl, mix cornstarch with cold water until dissolved. Add to the saucepan. Cook until sauce thickens. Place chicken breasts in the prepared pan. Pour 1 cup of the sauce over the top. Bake for 30 minutes. Remove from oven, shred chicken, and add vegetables and cooked rice. Pour remaining sauce over the top. Stir to combine. Return to oven and bake for an additional 15 minutes.",
      ingredients: [
        "3/4 cup soy sauce",
        "3/4 cup water",
        "1/2 cup brown sugar",
        "1/2 tsp ground ginger",
        "1/2 tsp minced garlic",
        "4 tbsp cornstarch",
        "2 tbsp cold water",
        "2 boneless chicken breasts",
        "1 (12 oz) bag stir-fry vegetables",
        "3 cups cooked rice",
      ],
    },
    {
      id: "52874",
      imageSrc: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      title: "Beef Wellington",
      categoryId: "1",
      areaId: "7",
      instructions:
        "Preheat oven to 400°F. Season beef with salt and pepper. Heat oil in a skillet over high heat. Sear beef on all sides. Remove and let cool. In the same skillet, add mushrooms, shallots, and thyme. Cook until mushrooms release moisture and become dry. Let cool. Roll out puff pastry. Spread mushroom mixture over beef. Wrap beef in puff pastry, sealing edges. Brush with egg wash. Bake for 25-30 minutes until pastry is golden brown. Let rest before slicing.",
      ingredients: [
        "1 (2 lb) beef tenderloin",
        "Salt and pepper to taste",
        "2 tbsp olive oil",
        "1 cup mushrooms, finely chopped",
        "2 shallots, finely chopped",
        "1 tsp fresh thyme",
        "1 sheet puff pastry",
        "1 egg, beaten",
      ],
    },
    {
      id: "52944",
      imageSrc: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      title: "Lasagna",
      categoryId: "1", // Beef
      areaId: "11", // Italian
      instructions:
        "Preheat oven to 375°F. In a large skillet, cook ground beef and onion over medium heat until browned. Drain fat. Add garlic and cook for 1 minute. Stir in tomato sauce, tomato paste, and oregano. Simmer for 30 minutes. In a mixing bowl, combine ricotta cheese, egg, and parsley. In a 9x13-inch baking dish, spread a thin layer of meat sauce. Place a layer of noodles over sauce. Spread with 1/3 of the ricotta mixture, 1/3 of the mozzarella cheese, and 1/3 of the Parmesan cheese. Repeat layers two more times, ending with cheese. Cover with foil and bake for 45 minutes. Remove foil and bake an additional 10 minutes. Let stand before serving.",
      ingredients: [
        "1 lb ground beef",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "1 (15 oz) can tomato sauce",
        "1 (6 oz) can tomato paste",
        "1 tsp dried oregano",
        "12 lasagna noodles",
        "16 oz ricotta cheese",
        "1 egg",
        "2 tbsp fresh parsley, chopped",
        "3 cups mozzarella cheese, shredded",
        "1/2 cup Parmesan cheese, grated",
      ],
    },
    {
      id: "52819",
      imageSrc: "https://www.themealdb.com/images/media/meals/1529444113.jpg",
      title: "Pad Thai",
      categoryId: "10",
      areaId: "22",
      instructions:
        "Soak rice noodles in warm water until softened. Drain and set aside. In a small bowl, whisk together fish sauce, sugar, and lime juice. Heat oil in a wok over medium-high heat. Add garlic and cook for 30 seconds. Add shrimp and cook until pink. Push shrimp to one side. Add eggs and scramble until set. Add noodles and sauce mixture. Toss to combine. Stir in bean sprouts and green onions. Cook until heated through. Garnish with peanuts and cilantro.",
      ingredients: [
        "8 oz rice noodles",
        "2 tbsp fish sauce",
        "1 tbsp sugar",
        "1 tbsp lime juice",
        "2 tbsp vegetable oil",
        "2 cloves garlic, minced",
        "12 oz shrimp, peeled and deveined",
        "2 eggs, lightly beaten",
        "1 cup bean sprouts",
        "2 green onions, sliced",
        "1/4 cup peanuts, chopped",
        "Fresh cilantro, chopped",
      ],
    },
    {
      id: "52918",
      imageSrc: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      title: "Chicken Tikka Masala",
      categoryId: "3",
      areaId: "9",
      instructions:
        "In a bowl, combine yogurt, lemon juice, cumin, cinnamon, cayenne, black pepper, ginger, and salt. Add chicken and marinate for at least 1 hour. Preheat grill to high heat. Thread chicken onto skewers and grill until juices run clear. In a large skillet, melt butter over medium heat. Sauté garlic and jalapeño for 1 minute. Add cumin, paprika, and salt. Stir in tomato sauce and cream. Simmer until sauce thickens. Add grilled chicken and simmer for 10 minutes. Garnish with cilantro.",
      ingredients: [
        "1 cup plain yogurt",
        "1 tbsp lemon juice",
        "2 tsp ground cumin",
        "1 tsp ground cinnamon",
        "2 tsp cayenne pepper",
        "2 tsp black pepper",
        "1 tbsp minced fresh ginger",
        "1 tsp salt",
        "3 boneless chicken breasts, cubed",
        "4 long skewers",
        "1 tbsp butter",
        "2 cloves garlic, minced",
        "1 jalapeño pepper, finely chopped",
        "2 tsp ground cumin",
        "2 tsp paprika",
        "1 tsp salt",
        "1 (8 oz) can tomato sauce",
        "1 cup heavy cream",
        "Fresh cilantro, chopped",
      ],
    },
  ],
} as const satisfies SeedDataSchema;
