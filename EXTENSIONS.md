# Extension Guide

This guide shows you how to extend and customize Cousin Tony's Recipes app.

## Adding New Recipe Fields

### 1. Update Database Schema

Edit `prisma/schema.prisma`:

```prisma
model Recipe {
  // ... existing fields
  difficulty    String?  // Add new field: Easy, Medium, Hard
  prepTime      Int?     // Prep time in minutes
  nutritionInfo String?  // JSON string with nutrition data
}
```

### 2. Update Database

```bash
npx prisma db push
```

### 3. Update Recipe Model

Edit `app/models/recipe.server.js`:

```javascript
export function parseRecipe(recipe) {
  if (!recipe) return null;
  
  return {
    ...recipe,
    ingredients: JSON.parse(recipe.ingredients || "[]"),
    instructions: JSON.parse(recipe.instructions || "[]"),
    tags: JSON.parse(recipe.tags || "[]"),
    nutritionInfo: recipe.nutritionInfo ? JSON.parse(recipe.nutritionInfo) : null, // Add this
  };
}
```

### 4. Update Forms

Edit `app/routes/app.recipes.new.jsx` and `app.routes/app.recipes.$id.edit.jsx`:

```javascript
// Add to form state
const [formState, setFormState] = useState({
  // ... existing fields
  difficulty: "",
  prepTime: "",
});

// Add to form JSX
<TextField
  label="Difficulty Level"
  value={formState.difficulty}
  onChange={handleChange("difficulty")}
  placeholder="Easy, Medium, or Hard"
/>

<TextField
  label="Prep Time (minutes)"
  value={formState.prepTime}
  onChange={handleChange("prepTime")}
  type="number"
/>
```

### 5. Update Display

Edit `app/routes/app.recipes.$id.jsx`:

```javascript
{recipe.difficulty && (
  <Badge tone="info">Difficulty: {recipe.difficulty}</Badge>
)}
{recipe.prepTime && (
  <Badge tone="info">Prep: {recipe.prepTime} min</Badge>
)}
```

## Adding Recipe Categories

### 1. Create Category Model

Add to `prisma/schema.prisma`:

```prisma
model Category {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  shop      String
  recipes   Recipe[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([shop])
}

model Recipe {
  // ... existing fields
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
}
```

### 2. Create Category Routes

Create `app/routes/app.categories._index.jsx`:

```javascript
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const categories = await prisma.category.findMany({
    where: { shop: session.shop },
    include: { _count: { select: { recipes: true } } },
  });
  return json({ categories });
};

export default function CategoriesIndex() {
  const { categories } = useLoaderData();
  
  return (
    <Page title="Categories">
      {/* Category list UI */}
    </Page>
  );
}
```

## Adding Recipe Images Upload

### 1. Install Dependencies

```bash
npm install @shopify/shopify-app-remix-file-upload
```

### 2. Create Upload Handler

Create `app/utils/upload.server.js`:

```javascript
import { unstable_composeUploadHandlers, unstable_createMemoryUploadHandler } from "@remix-run/node";

export const uploadHandler = unstable_composeUploadHandlers(
  async ({ name, contentType, data, filename }) => {
    if (name !== "image") {
      return undefined;
    }
    
    // Upload to Shopify Files API or external service
    // Return the URL
  },
  unstable_createMemoryUploadHandler()
);
```

### 3. Update Form

```javascript
export const action = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  
  const imageUrl = formData.get("image");
  // Use imageUrl in recipe creation
};
```

## Adding Recipe Import/Export

### 1. Create Export Route

Create `app/routes/api.recipes.export.jsx`:

```javascript
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const recipes = await getRecipes(session.shop);
  
  const csv = recipes.map(r => [
    r.title,
    r.description,
    r.cookTime,
    r.servings,
  ].join(",")).join("\n");
  
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=recipes.csv",
    },
  });
};
```

### 2. Add Export Button

In `app/routes/app.recipes._index.jsx`:

```javascript
<Button url="/api/recipes/export" download>
  Export All Recipes
</Button>
```

## Adding Recipe Ratings

### 1. Create Rating Model

```prisma
model Rating {
  id        String   @id @default(cuid())
  recipeId  String
  recipe    Recipe   @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  rating    Int      // 1-5
  comment   String?
  shop      String
  createdAt DateTime @default(now())
  
  @@index([recipeId])
}

model Recipe {
  // ... existing fields
  ratings Rating[]
}
```

### 2. Add Rating Display

```javascript
const avgRating = recipe.ratings.length > 0
  ? recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length
  : 0;

<div>
  <Text>Rating: {avgRating.toFixed(1)} / 5</Text>
  <Text>({recipe.ratings.length} reviews)</Text>
</div>
```

## Adding Recipe Search

### 1. Create Search Route

Create `app/routes/api.recipes.search.jsx`:

```javascript
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  
  const recipes = await prisma.recipe.findMany({
    where: {
      shop: session.shop,
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { tags: { contains: query } },
      ],
    },
  });
  
  return json({ recipes: recipes.map(parseRecipe) });
};
```

### 2. Add Search Component

```javascript
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);

const handleSearch = async () => {
  const response = await fetch(`/api/recipes/search?q=${searchQuery}`);
  const data = await response.json();
  setSearchResults(data.recipes);
};

<TextField
  label="Search Recipes"
  value={searchQuery}
  onChange={setSearchQuery}
  onBlur={handleSearch}
/>
```

## Adding Webhooks

### 1. Register Webhooks

Edit `app/shopify.server/shopify.js`:

```javascript
export const registerWebhooks = async ({ shop, accessToken }) => {
  await shopify.registerWebhooks({
    shop,
    accessToken,
    topics: {
      PRODUCTS_DELETE: {
        deliveryMethod: "http",
        callbackUrl: "/webhooks/products/delete",
      },
    },
  });
};
```

### 2. Handle Webhook

Create `app/routes/webhooks.products.delete.jsx`:

```javascript
export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);
  
  if (topic === "PRODUCTS_DELETE") {
    // Remove recipes linked to deleted product
    await prisma.recipe.updateMany({
      where: {
        shop,
        productId: payload.id.toString(),
      },
      data: {
        productId: null,
      },
    });
  }
  
  return new Response();
};
```

## Custom Theme Sections

### 1. Create Recipe List Section

Create `extensions/recipe-display/sections/recipe-list.liquid`:

```liquid
{% schema %}
{
  "name": "Recipe List",
  "settings": [
    {
      "type": "range",
      "id": "limit",
      "label": "Number of recipes",
      "min": 1,
      "max": 12,
      "default": 6
    }
  ],
  "blocks": [
    {
      "type": "recipe",
      "name": "Recipe",
      "settings": [
        {
          "type": "text",
          "id": "recipe_id",
          "label": "Recipe ID"
        }
      ]
    }
  ]
}
{% endschema %}

<div class="recipe-list">
  {% for block in section.blocks %}
    <div class="recipe-card">
      {# Recipe display logic #}
    </div>
  {% endfor %}
</div>
```

## Performance Optimization

### 1. Add Pagination

```javascript
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 20;
  
  const recipes = await prisma.recipe.findMany({
    where: { shop: session.shop },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { createdAt: "desc" },
  });
  
  const total = await prisma.recipe.count({
    where: { shop: session.shop },
  });
  
  return json({
    recipes: recipes.map(parseRecipe),
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  });
};
```

### 2. Add Caching

```javascript
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

export const getRecipe = async (id, shop) => {
  const cacheKey = `recipe:${shop}:${id}`;
  const cached = cache.get(cacheKey);
  
  if (cached) return cached;
  
  const recipe = await prisma.recipe.findFirst({
    where: { id, shop },
  });
  
  cache.set(cacheKey, recipe);
  return recipe;
};
```

## Testing Extensions

### 1. Create Test Helpers

Create `app/test/helpers.js`:

```javascript
export const createTestRecipe = async (overrides = {}) => {
  return await prisma.recipe.create({
    data: {
      title: "Test Recipe",
      shop: "test-shop.myshopify.com",
      ingredients: JSON.stringify(["ingredient 1"]),
      instructions: JSON.stringify(["step 1"]),
      tags: JSON.stringify([]),
      ...overrides,
    },
  });
};
```

### 2. Write Tests

```javascript
import { createTestRecipe } from "./helpers";

describe("Recipe CRUD", () => {
  it("creates a recipe", async () => {
    const recipe = await createTestRecipe({
      title: "My Test Recipe",
    });
    
    expect(recipe.title).toBe("My Test Recipe");
  });
});
```

## Best Practices

1. **Always validate input**: Use Zod or similar for schema validation
2. **Handle errors gracefully**: Use try-catch and show user-friendly messages
3. **Keep code DRY**: Extract reusable components and utilities
4. **Document changes**: Update CHANGELOG.md and DEVELOPER.md
5. **Test thoroughly**: Test in development store before production
6. **Follow Shopify guidelines**: Adhere to app review requirements

## Need More Help?

- Check the [Shopify Remix docs](https://shopify.dev/docs/api/shopify-app-remix)
- Review [Polaris components](https://polaris.shopify.com/components)
- See [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)
