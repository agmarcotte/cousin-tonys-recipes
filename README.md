# Cousin Tony's Recipes

A Shopify app for Cousin Tony's Texas Trail Dust™ that manages recipes, connects them to spice products, and showcases them on the storefront using Online Store 2.0 and metafields.

## Features

- **Recipe Management**: Create, edit, and delete recipes with full CRUD operations
- **Rich Recipe Data**: Support for title, description, image, ingredients, instructions, cook time, servings, and tags
- **Product Integration**: Link recipes to Shopify products via metafields
- **SEO Optimized**: Automatic JSON-LD structured data for recipe schema
- **Online Store 2.0**: Theme extension blocks for displaying recipes on the storefront
- **Print & PDF Export**: Built-in print functionality and PDF export using jsPDF
- **Modern UI**: Built with Shopify Polaris for a consistent admin experience
- **Embedded App**: Seamlessly integrates into Shopify admin using App Bridge

## Tech Stack

- **Framework**: Remix 2.0
- **UI Library**: Shopify Polaris 12
- **Database**: Prisma with SQLite (production can use PostgreSQL)
- **API**: GraphQL Admin API
- **Authentication**: Shopify App Bridge & OAuth
- **PDF Export**: jsPDF

## Prerequisites

- Node.js 18 or higher
- A Shopify Partner account
- A development store

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/agmarcotte/cousin-tonys-recipes.git
   cd cousin-tonys-recipes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Configure your Shopify app:
   - Create a new app in your Shopify Partner dashboard
   - Copy the API key and API secret
   - Update `shopify.app.toml` with your app settings

5. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   SCOPES=write_products,read_products,write_metaobjects,read_metaobjects
   ```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `https://localhost:3000`

## Building for Production

```bash
npm run build
```

## Deployment

The app can be deployed to any Node.js hosting platform:

1. **Shopify Oxygen**: Use `npm run deploy`
2. **Heroku**: Configure buildpacks for Node.js
3. **Vercel/Netlify**: May require adapter changes
4. **Custom VPS**: Use PM2 or similar process manager

## Usage

### Creating Recipes

1. Navigate to the app in your Shopify admin
2. Click "Create Recipe"
3. Fill in the recipe details:
   - Title and description
   - Upload or link an image
   - Add ingredients (one per field)
   - Add step-by-step instructions
   - Set cook time and servings
   - Add tags for categorization
   - Link to a product (optional)
4. Click "Save"

### Linking Recipes to Products

- Enter the Shopify Product ID when creating/editing a recipe
- The recipe data will be synced to the product's metafields
- Access recipe data in your theme using metafields

### Displaying Recipes on Storefront

1. In your Online Store 2.0 theme editor:
2. Add the "Recipe" block to any section
3. Configure the recipe settings:
   - Enter recipe details manually, or
   - Use metafields to pull from linked products
4. The recipe will display with SEO-optimized JSON-LD data

### Exporting Recipes

- **Print**: Click "Print" button on any recipe detail page
- **PDF**: Click "Export PDF" to download a formatted PDF version

## API Endpoints

### Internal API Routes

- `GET /api/recipes/:id?shop=myshop.myshopify.com` - Fetch recipe by ID
- `GET /api/recipes?shop=myshop.myshopify.com&productId=123` - Fetch recipes by product
- `GET /api/products/search?query=spice` - Search products

### GraphQL Metafield Operations

The app automatically syncs recipe data to product metafields:
- Namespace: `custom`
- Key: `recipe_data`
- Type: `json`

## Database Schema

### Recipe Model

```prisma
model Recipe {
  id           String   @id @default(cuid())
  title        String
  description  String?
  imageUrl     String?
  cookTime     Int?     // in minutes
  servings     Int?
  ingredients  String   // JSON string array
  instructions String   // JSON string array
  tags         String?  // JSON string array
  productId    String?  // Shopify product ID
  shop         String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Theme Extension

The app includes a theme extension for Online Store 2.0:

**Location**: `extensions/recipe-display/blocks/recipe.liquid`

**Features**:
- Fully customizable recipe display
- Responsive design
- Print-friendly styles
- SEO-optimized with microdata and JSON-LD
- Accessible markup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue on GitHub.
