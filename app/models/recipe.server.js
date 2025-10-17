import prisma from "../db.server";

export async function getRecipes(shop) {
  return await prisma.recipe.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
  });
}

export async function getRecipe(id, shop) {
  return await prisma.recipe.findFirst({
    where: { id, shop },
  });
}

export async function createRecipe(data) {
  return await prisma.recipe.create({
    data: {
      ...data,
      ingredients: JSON.stringify(data.ingredients || []),
      instructions: JSON.stringify(data.instructions || []),
      tags: JSON.stringify(data.tags || []),
    },
  });
}

export async function updateRecipe(id, shop, data) {
  return await prisma.recipe.update({
    where: { id },
    data: {
      ...data,
      ingredients: data.ingredients ? JSON.stringify(data.ingredients) : undefined,
      instructions: data.instructions ? JSON.stringify(data.instructions) : undefined,
      tags: data.tags ? JSON.stringify(data.tags) : undefined,
    },
  });
}

export async function deleteRecipe(id, shop) {
  return await prisma.recipe.delete({
    where: { id },
  });
}

export function parseRecipe(recipe) {
  if (!recipe) return null;
  
  return {
    ...recipe,
    ingredients: JSON.parse(recipe.ingredients || "[]"),
    instructions: JSON.parse(recipe.instructions || "[]"),
    tags: JSON.parse(recipe.tags || "[]"),
  };
}
