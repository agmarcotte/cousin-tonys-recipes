/**
 * Helper functions to sync recipes with Shopify product metafields
 */

const RECIPE_METAFIELD_NAMESPACE = "custom";
const RECIPE_METAFIELD_KEY = "recipe_data";

export async function syncRecipeToProduct(admin, productId, recipeData) {
  const mutation = `
    mutation SetProductMetafield($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          metafields(first: 10) {
            edges {
              node {
                id
                namespace
                key
                value
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      id: `gid://shopify/Product/${productId}`,
      metafields: [
        {
          namespace: RECIPE_METAFIELD_NAMESPACE,
          key: RECIPE_METAFIELD_KEY,
          value: JSON.stringify({
            recipeId: recipeData.id,
            title: recipeData.title,
            description: recipeData.description,
            imageUrl: recipeData.imageUrl,
            cookTime: recipeData.cookTime,
            servings: recipeData.servings,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            tags: recipeData.tags,
          }),
          type: "json",
        },
      ],
    },
  };

  const response = await admin.graphql(mutation, { variables });
  const result = await response.json();
  
  if (result.data?.productUpdate?.userErrors?.length > 0) {
    throw new Error(result.data.productUpdate.userErrors[0].message);
  }
  
  return result.data?.productUpdate?.product;
}

export async function getRecipeFromProduct(admin, productId) {
  const query = `
    query GetProductMetafield($id: ID!) {
      product(id: $id) {
        id
        metafield(namespace: "${RECIPE_METAFIELD_NAMESPACE}", key: "${RECIPE_METAFIELD_KEY}") {
          value
        }
      }
    }
  `;

  const variables = {
    id: `gid://shopify/Product/${productId}`,
  };

  const response = await admin.graphql(query, { variables });
  const result = await response.json();
  
  const metafieldValue = result.data?.product?.metafield?.value;
  
  return metafieldValue ? JSON.parse(metafieldValue) : null;
}

export async function removeRecipeFromProduct(admin, productId) {
  const mutation = `
    mutation DeleteProductMetafield($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      id: `gid://shopify/Product/${productId}`,
      metafields: [
        {
          namespace: RECIPE_METAFIELD_NAMESPACE,
          key: RECIPE_METAFIELD_KEY,
          value: null,
        },
      ],
    },
  };

  const response = await admin.graphql(mutation, { variables });
  const result = await response.json();
  
  return result.data?.productUpdate?.product;
}
