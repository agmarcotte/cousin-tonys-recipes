import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  InlineStack,
  Button,
  Badge,
  Thumbnail,
  List,
} from "@shopify/polaris";
import { authenticate } from "../../shopify.server/shopify";
import { getRecipe, deleteRecipe, parseRecipe } from "../../models/recipe.server";

export const loader = async ({ params, request }) => {
  const { session } = await authenticate.admin(request);
  const recipe = await getRecipe(params.id, session.shop);
  
  if (!recipe) {
    throw new Response("Recipe not found", { status: 404 });
  }
  
  return json({
    recipe: parseRecipe(recipe),
  });
};

export const action = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  if (formData.get("_action") === "delete") {
    await deleteRecipe(params.id, session.shop);
    return redirect("/app/recipes");
  }
  
  return json({ success: true });
};

export default function RecipeDetail() {
  const { recipe } = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      const formData = new FormData();
      formData.append("_action", "delete");
      submit(formData, { method: "post" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    // Import jsPDF dynamically
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    let yPos = 20;
    
    // Title
    doc.setFontSize(20);
    doc.text(recipe.title, 20, yPos);
    yPos += 15;
    
    // Description
    if (recipe.description) {
      doc.setFontSize(12);
      const splitDesc = doc.splitTextToSize(recipe.description, 170);
      doc.text(splitDesc, 20, yPos);
      yPos += splitDesc.length * 7 + 10;
    }
    
    // Cook Time and Servings
    doc.setFontSize(10);
    if (recipe.cookTime) {
      doc.text(`Cook Time: ${recipe.cookTime} minutes`, 20, yPos);
      yPos += 7;
    }
    if (recipe.servings) {
      doc.text(`Servings: ${recipe.servings}`, 20, yPos);
      yPos += 10;
    }
    
    // Ingredients
    doc.setFontSize(14);
    doc.text("Ingredients:", 20, yPos);
    yPos += 7;
    doc.setFontSize(10);
    recipe.ingredients.forEach((ingredient) => {
      doc.text(`• ${ingredient}`, 25, yPos);
      yPos += 7;
    });
    yPos += 5;
    
    // Instructions
    doc.setFontSize(14);
    doc.text("Instructions:", 20, yPos);
    yPos += 7;
    doc.setFontSize(10);
    recipe.instructions.forEach((instruction, index) => {
      const splitInst = doc.splitTextToSize(`${index + 1}. ${instruction}`, 165);
      doc.text(splitInst, 25, yPos);
      yPos += splitInst.length * 7 + 3;
    });
    
    doc.save(`${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  };

  return (
    <Page
      title={recipe.title}
      backAction={{ onAction: () => navigate("/app/recipes") }}
      secondaryActions={[
        {
          content: "Edit",
          onAction: () => navigate(`/app/recipes/${recipe.id}/edit`),
        },
        {
          content: "Print",
          onAction: handlePrint,
        },
        {
          content: "Export PDF",
          onAction: handleExportPDF,
        },
        {
          content: "Delete",
          onAction: handleDelete,
          destructive: true,
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            {recipe.imageUrl && (
              <Card>
                <Thumbnail
                  source={recipe.imageUrl}
                  alt={recipe.title}
                  size="large"
                />
              </Card>
            )}

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Details
                </Text>
                {recipe.description && (
                  <Text as="p">{recipe.description}</Text>
                )}
                <InlineStack gap="400">
                  {recipe.cookTime && (
                    <Badge tone="info">Cook Time: {recipe.cookTime} min</Badge>
                  )}
                  {recipe.servings && (
                    <Badge tone="info">Servings: {recipe.servings}</Badge>
                  )}
                </InlineStack>
                {recipe.tags.length > 0 && (
                  <InlineStack gap="200">
                    {recipe.tags.map((tag, index) => (
                      <Badge key={index}>{tag}</Badge>
                    ))}
                  </InlineStack>
                )}
                {recipe.productId && (
                  <Text as="p" tone="subdued">
                    Linked to Product ID: {recipe.productId}
                  </Text>
                )}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Ingredients
                </Text>
                <List>
                  {recipe.ingredients.map((ingredient, index) => (
                    <List.Item key={index}>{ingredient}</List.Item>
                  ))}
                </List>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Instructions
                </Text>
                <List type="number">
                  {recipe.instructions.map((instruction, index) => (
                    <List.Item key={index}>{instruction}</List.Item>
                  ))}
                </List>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  SEO Data (JSON-LD)
                </Text>
                <div style={{ 
                  background: "#f6f6f7", 
                  padding: "12px", 
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  overflow: "auto"
                }}>
                  <pre>{JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "name": recipe.title,
                    "description": recipe.description,
                    "image": recipe.imageUrl,
                    "cookTime": recipe.cookTime ? `PT${recipe.cookTime}M` : undefined,
                    "recipeYield": recipe.servings,
                    "recipeIngredient": recipe.ingredients,
                    "recipeInstructions": recipe.instructions.map((step, index) => ({
                      "@type": "HowToStep",
                      "position": index + 1,
                      "text": step
                    })),
                    "keywords": recipe.tags.join(", ")
                  }, null, 2)}</pre>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
