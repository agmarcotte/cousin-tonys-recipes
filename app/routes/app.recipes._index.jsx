import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { authenticate } from "../../shopify.server/shopify";
import { getRecipes, parseRecipe } from "../../models/recipe.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const recipes = await getRecipes(session.shop);
  
  return json({
    recipes: recipes.map(parseRecipe),
  });
};

export default function RecipesIndex() {
  const { recipes } = useLoaderData();

  const rows = recipes.map((recipe) => [
    recipe.title,
    recipe.servings ? `${recipe.servings} servings` : "-",
    recipe.cookTime ? `${recipe.cookTime} min` : "-",
    recipe.productId ? "Yes" : "No",
  ]);

  return (
    <Page
      title="Recipes"
      primaryAction={{
        content: "Create Recipe",
        url: "/app/recipes/new",
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            {recipes.length === 0 ? (
              <BlockStack gap="400">
                <Text as="p">No recipes yet. Create your first recipe!</Text>
                <Button url="/app/recipes/new" variant="primary">
                  Create Recipe
                </Button>
              </BlockStack>
            ) : (
              <DataTable
                columnContentTypes={["text", "text", "text", "text"]}
                headings={["Recipe", "Servings", "Cook Time", "Product Linked"]}
                rows={rows}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
