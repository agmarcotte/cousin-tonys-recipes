import { json } from "@remix-run/node";
import prisma from "../../db.server";
import { parseRecipe } from "../../models/recipe.server";

export const loader = async ({ request, params }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const productId = url.searchParams.get("productId");

  if (!shop) {
    return json({ error: "Shop parameter is required" }, { status: 400 });
  }

  let recipes;
  
  if (params.id) {
    // Fetch single recipe
    const recipe = await prisma.recipe.findFirst({
      where: { id: params.id, shop },
    });
    
    if (!recipe) {
      return json({ error: "Recipe not found" }, { status: 404 });
    }
    
    return json({ recipe: parseRecipe(recipe) });
  } else if (productId) {
    // Fetch recipes by product ID
    recipes = await prisma.recipe.findMany({
      where: { shop, productId },
      orderBy: { createdAt: "desc" },
    });
  } else {
    // Fetch all recipes for the shop
    recipes = await prisma.recipe.findMany({
      where: { shop },
      orderBy: { createdAt: "desc" },
    });
  }
  
  return json({
    recipes: recipes.map(parseRecipe),
  });
};
