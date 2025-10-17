import { useState, useCallback, useEffect } from "react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import { authenticate } from "../../shopify.server/shopify";
import { getRecipe, updateRecipe, parseRecipe } from "../../models/recipe.server";

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
  
  const recipeData = {
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    cookTime: formData.get("cookTime") ? parseInt(formData.get("cookTime")) : null,
    servings: formData.get("servings") ? parseInt(formData.get("servings")) : null,
    ingredients: JSON.parse(formData.get("ingredients") || "[]"),
    instructions: JSON.parse(formData.get("instructions") || "[]"),
    tags: JSON.parse(formData.get("tags") || "[]"),
    productId: formData.get("productId") || null,
  };

  await updateRecipe(params.id, session.shop, recipeData);
  
  return redirect(`/app/recipes/${params.id}`);
};

export default function EditRecipe() {
  const { recipe } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    title: recipe.title || "",
    description: recipe.description || "",
    imageUrl: recipe.imageUrl || "",
    cookTime: recipe.cookTime?.toString() || "",
    servings: recipe.servings?.toString() || "",
    productId: recipe.productId || "",
  });
  
  const [ingredients, setIngredients] = useState(recipe.ingredients.length > 0 ? recipe.ingredients : [""]);
  const [instructions, setInstructions] = useState(recipe.instructions.length > 0 ? recipe.instructions : [""]);
  const [tags, setTags] = useState(recipe.tags.join(", "));

  const handleChange = useCallback((field) => (value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addIngredient = useCallback(() => {
    setIngredients([...ingredients, ""]);
  }, [ingredients]);

  const updateIngredient = useCallback((index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }, [ingredients]);

  const removeIngredient = useCallback((index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }, [ingredients]);

  const addInstruction = useCallback(() => {
    setInstructions([...instructions, ""]);
  }, [instructions]);

  const updateInstruction = useCallback((index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  }, [instructions]);

  const removeInstruction = useCallback((index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  }, [instructions]);

  const handleSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("imageUrl", formState.imageUrl);
    formData.append("cookTime", formState.cookTime);
    formData.append("servings", formState.servings);
    formData.append("productId", formState.productId);
    formData.append("ingredients", JSON.stringify(ingredients.filter(i => i.trim())));
    formData.append("instructions", JSON.stringify(instructions.filter(i => i.trim())));
    formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim()).filter(t => t)));
    
    submit(formData, { method: "post" });
  }, [formState, ingredients, instructions, tags, submit]);

  return (
    <Page
      title="Edit Recipe"
      backAction={{ onAction: () => navigate(`/app/recipes/${recipe.id}`) }}
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Recipe Details
                </Text>
                <FormLayout>
                  <TextField
                    label="Title"
                    value={formState.title}
                    onChange={handleChange("title")}
                    autoComplete="off"
                    requiredIndicator
                  />
                  <TextField
                    label="Description"
                    value={formState.description}
                    onChange={handleChange("description")}
                    multiline={3}
                    autoComplete="off"
                  />
                  <TextField
                    label="Image URL"
                    value={formState.imageUrl}
                    onChange={handleChange("imageUrl")}
                    autoComplete="off"
                  />
                  {formState.imageUrl && (
                    <Thumbnail
                      source={formState.imageUrl}
                      alt={formState.title}
                      size="large"
                    />
                  )}
                  <InlineStack gap="400">
                    <TextField
                      label="Cook Time (minutes)"
                      value={formState.cookTime}
                      onChange={handleChange("cookTime")}
                      type="number"
                      autoComplete="off"
                    />
                    <TextField
                      label="Servings"
                      value={formState.servings}
                      onChange={handleChange("servings")}
                      type="number"
                      autoComplete="off"
                    />
                  </InlineStack>
                  <TextField
                    label="Product ID (Shopify)"
                    value={formState.productId}
                    onChange={handleChange("productId")}
                    autoComplete="off"
                    helpText="Link this recipe to a Shopify product"
                  />
                </FormLayout>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="h2">
                    Ingredients
                  </Text>
                  <Button onClick={addIngredient}>Add Ingredient</Button>
                </InlineStack>
                {ingredients.map((ingredient, index) => (
                  <InlineStack gap="200" key={index}>
                    <div style={{ flex: 1 }}>
                      <TextField
                        label={`Ingredient ${index + 1}`}
                        labelHidden
                        value={ingredient}
                        onChange={(value) => updateIngredient(index, value)}
                        autoComplete="off"
                        placeholder="e.g., 2 cups flour"
                      />
                    </div>
                    {ingredients.length > 1 && (
                      <Button onClick={() => removeIngredient(index)} tone="critical">
                        Remove
                      </Button>
                    )}
                  </InlineStack>
                ))}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="h2">
                    Instructions
                  </Text>
                  <Button onClick={addInstruction}>Add Step</Button>
                </InlineStack>
                {instructions.map((instruction, index) => (
                  <InlineStack gap="200" key={index}>
                    <div style={{ flex: 1 }}>
                      <TextField
                        label={`Step ${index + 1}`}
                        labelHidden
                        value={instruction}
                        onChange={(value) => updateInstruction(index, value)}
                        multiline={2}
                        autoComplete="off"
                        placeholder={`Step ${index + 1}`}
                      />
                    </div>
                    {instructions.length > 1 && (
                      <Button onClick={() => removeInstruction(index)} tone="critical">
                        Remove
                      </Button>
                    )}
                  </InlineStack>
                ))}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Tags
                </Text>
                <TextField
                  label="Tags"
                  labelHidden
                  value={tags}
                  onChange={setTags}
                  autoComplete="off"
                  placeholder="e.g., dinner, vegetarian, quick"
                  helpText="Comma-separated tags"
                />
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
