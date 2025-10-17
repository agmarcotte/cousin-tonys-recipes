import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server/shopify";
import { getRecipes } from "../models/recipe.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const recipes = await getRecipes(session.shop);
  
  return json({
    recipeCount: recipes.length,
    shop: session.shop,
  });
};

export default function Index() {
  const { recipeCount, shop } = useLoaderData();

  return (
    <Page title="Cousin Tony's Recipes">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2">
                  Welcome to Cousin Tony's Recipe Manager
                </Text>
                <Text as="p">
                  Manage your recipes and connect them to your spice products. 
                  Create beautiful recipe cards that showcase your products and 
                  help customers discover new ways to use Cousin Tony's Texas Trail Dust™.
                </Text>
                <InlineStack gap="400">
                  <Button url="/app/recipes" variant="primary">
                    View Recipes
                  </Button>
                  <Button url="/app/recipes/new">
                    Create Recipe
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Quick Stats
                </Text>
                <Text as="p">
                  Total Recipes: {recipeCount}
                </Text>
                <Text as="p" tone="subdued">
                  Shop: {shop}
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Features
                </Text>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>Create and manage recipes with images, ingredients, and instructions</li>
                  <li>Link recipes to your Shopify products</li>
                  <li>SEO-optimized with JSON-LD structured data</li>
                  <li>Print and PDF export support</li>
                  <li>Display recipes on your Online Store 2.0 theme</li>
                </ul>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
