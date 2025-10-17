# Quick Start Guide

Get up and running with Cousin Tony's Recipes in under 10 minutes!

## Step 1: Prerequisites

Make sure you have:
- ✅ Node.js 18+ installed
- ✅ A Shopify Partner account
- ✅ A development store

## Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/agmarcotte/cousin-tonys-recipes.git
cd cousin-tonys-recipes

# Run setup (installs dependencies and sets up database)
npm run setup
```

## Step 3: Configure Shopify App

1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Create a new app or use existing app
3. Get your API credentials
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Add your credentials to `.env`:
   ```
   SHOPIFY_API_KEY=your_api_key_here
   SHOPIFY_API_SECRET=your_api_secret_here
   ```

## Step 4: Update Configuration

Edit `shopify.app.toml`:
```toml
client_id = "your_api_key"
dev_store_url = "your-store.myshopify.com"
```

## Step 5: Start Development Server

```bash
npm run dev
```

The Shopify CLI will:
- Start the development server
- Generate a tunnel URL
- Open the app in your browser

## Step 6: Install App

1. Follow the OAuth flow to install the app
2. Grant the requested permissions
3. You'll be redirected to the app dashboard

## Step 7: Create Your First Recipe

1. Click "Create Recipe"
2. Fill in recipe details:
   - Title: "My First Recipe"
   - Add some ingredients
   - Add cooking instructions
   - Set cook time and servings
3. Click "Save"

## Step 8: Link to a Product

1. Go to Products in Shopify admin
2. Find or create a product
3. Copy the Product ID from the URL
4. Edit your recipe
5. Paste the Product ID
6. Save the recipe

## Step 9: Add Recipe to Storefront

1. Go to Online Store > Themes
2. Click "Customize"
3. Add a new section or edit existing
4. Add the "Recipe" block
5. Configure with your recipe details
6. Save and preview

## Optional: Seed Sample Data

Want to test with sample recipes?

```bash
npm run seed
```

This creates 5 sample recipes in your database.

## Next Steps

- ✅ Explore the recipe management interface
- ✅ Test print and PDF export
- ✅ Customize the theme extension
- ✅ Connect more recipes to products
- ✅ Check SEO structured data

## Troubleshooting

### "Module not found" error
```bash
npm install
npx prisma generate
```

### "Database not found" error
```bash
npx prisma db push
```

### OAuth redirect error
- Check your `shopify.app.toml` has correct URLs
- Verify API keys in `.env`
- Make sure redirect URLs match in Partner Dashboard

### App won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run setup
```

## Need Help?

- 📖 Check [README.md](./README.md) for full documentation
- 👨‍💻 Read [DEVELOPER.md](./DEVELOPER.md) for technical details
- 🐛 Open an issue on GitHub

## What's Next?

Now that you have the app running, you can:

1. **Customize the UI**: Edit the Polaris components in `app/routes/`
2. **Extend functionality**: Add new fields or features
3. **Style the theme**: Modify `extensions/recipe-display/blocks/recipe.liquid`
4. **Deploy to production**: Follow deployment guide in README

Happy cooking! 🍳👨‍🍳
