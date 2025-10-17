# Developer Documentation

## Architecture

This Shopify app is built using the Remix framework with the following architecture:

### Application Structure

```
cousin-tonys-recipes/
├── app/                          # Remix application code
│   ├── db.server.js             # Prisma database client
│   ├── models/                  # Data models
│   │   └── recipe.server.js     # Recipe model with CRUD operations
│   ├── routes/                  # Remix routes
│   │   ├── app.*.jsx           # Admin app routes
│   │   ├── api.*.jsx           # API routes
│   │   └── auth.$.jsx          # Authentication routes
│   ├── shopify.server/          # Shopify integrations
│   │   ├── shopify.js          # Shopify app configuration
│   │   └── metafields.js       # Metafield helpers
│   └── root.jsx                # Root layout
├── extensions/                  # Theme extensions
│   └── recipe-display/         # Recipe display extension
│       └── blocks/
│           └── recipe.liquid   # Recipe block for Online Store 2.0
├── prisma/                     # Database schema
│   └── schema.prisma
└── package.json
```

### Data Flow

1. **Admin App**: Merchants access the app through Shopify admin
2. **Remix Routes**: Handle all requests and render Polaris UI
3. **Prisma ORM**: Manages database operations
4. **GraphQL API**: Syncs recipe data to product metafields
5. **Theme Extension**: Displays recipes on the storefront

## Database Schema

### Recipe Model

The Recipe model stores all recipe information:

```javascript
{
  id: "cuid",              // Unique identifier
  title: "string",         // Recipe name
  description: "string",   // Recipe description
  imageUrl: "string",      // Image URL
  cookTime: "number",      // Cook time in minutes
  servings: "number",      // Number of servings
  ingredients: "string",   // JSON array of ingredients
  instructions: "string",  // JSON array of instructions
  tags: "string",          // JSON array of tags
  productId: "string",     // Shopify product ID
  shop: "string",          // Shopify shop domain
  createdAt: "datetime",
  updatedAt: "datetime"
}
```

## API Routes

### Admin Routes

- `GET /app` - Dashboard
- `GET /app/recipes` - List all recipes
- `GET /app/recipes/new` - Create new recipe form
- `GET /app/recipes/:id` - View recipe details
- `GET /app/recipes/:id/edit` - Edit recipe form
- `POST /app/recipes/new` - Create recipe
- `POST /app/recipes/:id/edit` - Update recipe
- `POST /app/recipes/:id` - Delete recipe

### API Routes

- `GET /api/recipes/:id?shop=domain` - Fetch recipe by ID
- `GET /api/recipes?shop=domain&productId=123` - Fetch recipes by product
- `GET /api/products/search?query=term` - Search products

## GraphQL Integration

### Metafield Structure

Recipes are synced to product metafields:

```graphql
{
  namespace: "custom"
  key: "recipe_data"
  type: "json"
  value: {
    recipeId: String
    title: String
    description: String
    imageUrl: String
    cookTime: Number
    servings: Number
    ingredients: Array<String>
    instructions: Array<String>
    tags: Array<String>
  }
}
```

### GraphQL Operations

**Set Product Metafield**:
```graphql
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
  }
}
```

**Get Product Metafield**:
```graphql
query GetProductMetafield($id: ID!) {
  product(id: $id) {
    id
    metafield(namespace: "custom", key: "recipe_data") {
      value
    }
  }
}
```

## Component Structure

### Polaris Components Used

- `Page` - Page wrapper with title and actions
- `Layout` - Grid layout system
- `Card` - Content containers
- `FormLayout` - Form structure
- `TextField` - Text inputs
- `Button` - Action buttons
- `DataTable` - Tabular data
- `Badge` - Status indicators
- `Thumbnail` - Image display
- `BlockStack` / `InlineStack` - Layout primitives

## Theme Extension

### Recipe Block

The recipe block (`recipe.liquid`) provides:

- Fully customizable recipe display
- SEO-optimized markup with microdata
- JSON-LD structured data
- Responsive design
- Print-friendly styles

### Using the Extension

1. Install the app in your development store
2. Navigate to your theme editor
3. Add a new section or edit an existing one
4. Add the "Recipe" block
5. Configure recipe settings

### Customization

The recipe block can be customized by:
- Editing the Liquid template
- Modifying the CSS styles
- Adjusting the schema settings

## PDF Export

The PDF export feature uses jsPDF library to generate PDFs:

```javascript
import { jsPDF } from "jspdf";

const doc = new jsPDF();
// Add recipe content
doc.save("recipe.pdf");
```

Features:
- Title and description
- Cook time and servings
- Ingredients list
- Step-by-step instructions
- Automatic text wrapping

## SEO Optimization

### JSON-LD Structured Data

The app generates JSON-LD structured data following schema.org Recipe specification:

```json
{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": "Recipe Title",
  "description": "Recipe description",
  "image": "https://...",
  "cookTime": "PT30M",
  "recipeYield": "4 servings",
  "recipeIngredient": [...],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "position": 1,
      "text": "Step 1 text"
    }
  ],
  "keywords": "tag1, tag2"
}
```

### Benefits

- Enhanced search results with recipe cards
- Rich snippets in Google
- Better discoverability
- Improved SEO rankings

## Authentication Flow

1. User installs app from Shopify App Store
2. App requests OAuth permissions
3. Shopify redirects to auth callback
4. App stores session in database
5. User accesses embedded app via App Bridge

## Security

- OAuth 2.0 authentication
- Session-based authorization
- HMAC verification for webhooks
- Environment variables for secrets
- Input validation and sanitization

## Performance Considerations

- Database indexing on shop and productId
- Lazy loading of images
- Optimistic UI updates
- Caching strategies (can be implemented)
- Pagination for large datasets

## Testing

### Manual Testing Checklist

- [ ] Create a recipe
- [ ] Edit a recipe
- [ ] Delete a recipe
- [ ] Link recipe to product
- [ ] View recipe on storefront
- [ ] Print recipe
- [ ] Export to PDF
- [ ] Test SEO structured data
- [ ] Verify metafield sync

### Future Test Implementation

Consider adding:
- Unit tests with Jest
- Integration tests with Playwright
- API tests with Supertest
- E2E tests for critical flows

## Deployment Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Update OAuth redirect URLs
- [ ] Test in development store
- [ ] Submit app for review
- [ ] Monitor error logs
- [ ] Set up analytics

## Troubleshooting

### Common Issues

**Database Connection Error**:
- Run `npx prisma generate`
- Run `npx prisma db push`

**Authentication Fails**:
- Verify API keys in `.env`
- Check OAuth redirect URLs
- Ensure scopes match in `shopify.app.toml`

**Theme Extension Not Appearing**:
- Deploy extension with `npm run deploy`
- Refresh theme editor
- Check extension is enabled in app settings

## Future Enhancements

Potential features to add:
- Recipe categories and filtering
- Recipe ratings and reviews
- Bulk import/export
- Recipe duplication
- Multi-language support
- Advanced image management
- Recipe analytics
- Social sharing buttons
- Nutritional information
- Recipe collections
