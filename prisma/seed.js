import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleRecipes = [
  {
    title: "Spicy Grilled Chicken",
    description: "A delicious grilled chicken recipe with Cousin Tony's Texas Trail Dust seasoning that brings authentic Texas flavors to your dinner table.",
    imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800",
    cookTime: 45,
    servings: 4,
    ingredients: JSON.stringify([
      "4 chicken breasts",
      "2 tablespoons Cousin Tony's Texas Trail Dust",
      "2 tablespoons olive oil",
      "1 teaspoon garlic powder",
      "Salt to taste",
    ]),
    instructions: JSON.stringify([
      "Preheat grill to medium-high heat",
      "Mix Cousin Tony's Texas Trail Dust with olive oil and garlic powder",
      "Rub the mixture over chicken breasts",
      "Grill for 6-8 minutes per side until internal temperature reaches 165°F",
      "Let rest for 5 minutes before serving",
    ]),
    tags: JSON.stringify(["dinner", "grilled", "chicken", "spicy"]),
    productId: null,
    shop: "test-store.myshopify.com",
  },
  {
    title: "Texas-Style BBQ Ribs",
    description: "Fall-off-the-bone ribs with our signature Texas Trail Dust rub. Perfect for summer cookouts!",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    cookTime: 180,
    servings: 6,
    ingredients: JSON.stringify([
      "2 racks of baby back ribs",
      "3 tablespoons Cousin Tony's Texas Trail Dust",
      "1/4 cup brown sugar",
      "2 tablespoons paprika",
      "1 cup BBQ sauce",
    ]),
    instructions: JSON.stringify([
      "Remove membrane from back of ribs",
      "Mix Texas Trail Dust, brown sugar, and paprika",
      "Rub mixture generously over ribs",
      "Wrap in foil and refrigerate for 2 hours",
      "Preheat oven to 275°F",
      "Bake wrapped ribs for 2.5 hours",
      "Brush with BBQ sauce and broil for 5 minutes",
      "Let rest before cutting and serving",
    ]),
    tags: JSON.stringify(["dinner", "bbq", "ribs", "texas-style"]),
    productId: null,
    shop: "test-store.myshopify.com",
  },
  {
    title: "Spiced Roasted Vegetables",
    description: "Colorful roasted vegetables with a kick from Cousin Tony's seasoning. A perfect vegetarian side dish.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
    cookTime: 35,
    servings: 4,
    ingredients: JSON.stringify([
      "2 cups bell peppers, chopped",
      "2 cups zucchini, chopped",
      "1 red onion, sliced",
      "2 tablespoons Cousin Tony's Texas Trail Dust",
      "3 tablespoons olive oil",
      "1 tablespoon balsamic vinegar",
    ]),
    instructions: JSON.stringify([
      "Preheat oven to 425°F",
      "Chop all vegetables into similar-sized pieces",
      "Toss vegetables with olive oil and Texas Trail Dust",
      "Spread on baking sheet in single layer",
      "Roast for 25-30 minutes, stirring halfway",
      "Drizzle with balsamic vinegar before serving",
    ]),
    tags: JSON.stringify(["side-dish", "vegetarian", "roasted", "healthy"]),
    productId: null,
    shop: "test-store.myshopify.com",
  },
  {
    title: "Texas Trail Dust Burger",
    description: "The ultimate burger seasoned with our famous Texas Trail Dust. Juicy, flavorful, and unforgettable!",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    cookTime: 20,
    servings: 4,
    ingredients: JSON.stringify([
      "1.5 lbs ground beef (80/20)",
      "2 tablespoons Cousin Tony's Texas Trail Dust",
      "4 hamburger buns",
      "Lettuce, tomato, onion for toppings",
      "Cheese slices (optional)",
    ]),
    instructions: JSON.stringify([
      "Mix ground beef with Texas Trail Dust gently",
      "Form into 4 equal patties",
      "Make a small indentation in the center of each patty",
      "Grill or pan-fry over medium-high heat for 4-5 minutes per side",
      "Add cheese in last minute if desired",
      "Toast buns and assemble burgers with toppings",
    ]),
    tags: JSON.stringify(["lunch", "dinner", "burger", "grilled", "quick"]),
    productId: null,
    shop: "test-store.myshopify.com",
  },
  {
    title: "Cajun Shrimp Skewers",
    description: "Quick and easy shrimp skewers with a Cajun twist using Cousin Tony's Texas Trail Dust.",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    cookTime: 15,
    servings: 4,
    ingredients: JSON.stringify([
      "1 lb large shrimp, peeled and deveined",
      "2 tablespoons Cousin Tony's Texas Trail Dust",
      "2 tablespoons melted butter",
      "1 lemon, juiced",
      "Wooden skewers (soaked in water)",
    ]),
    instructions: JSON.stringify([
      "Soak wooden skewers in water for 30 minutes",
      "Thread shrimp onto skewers",
      "Mix melted butter, Texas Trail Dust, and lemon juice",
      "Brush mixture over shrimp",
      "Grill for 2-3 minutes per side until pink and opaque",
      "Serve immediately with extra lemon wedges",
    ]),
    tags: JSON.stringify(["seafood", "quick", "grilled", "appetizer"]),
    productId: null,
    shop: "test-store.myshopify.com",
  },
];

async function seed() {
  console.log("Seeding database with sample recipes...");

  for (const recipe of sampleRecipes) {
    await prisma.recipe.create({
      data: recipe,
    });
    console.log(`Created recipe: ${recipe.title}`);
  }

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
