# UI Mockups & Screens

This document describes the user interface screens and components of Cousin Tony's Recipes app.

## Admin Interface

### 1. Dashboard (Home Screen)

```
┌─────────────────────────────────────────────────────────┐
│  Cousin Tony's Recipes                                  │
├─────────────────────────────────────────────────────────┤
│  [Home] [Recipes]                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Welcome to Cousin Tony's Recipe Manager                │
│  ────────────────────────────────────────               │
│                                                          │
│  Manage your recipes and connect them to your spice     │
│  products. Create beautiful recipe cards that showcase  │
│  your products and help customers discover new ways to  │
│  use Cousin Tony's Texas Trail Dust™.                   │
│                                                          │
│  [View Recipes]  [Create Recipe]                        │
│                                                          │
│  ─────────────────────────────────────────              │
│  Quick Stats                                             │
│  ─────────────────────────────────────────              │
│  Total Recipes: 5                                        │
│  Shop: test-store.myshopify.com                         │
│                                                          │
│  ─────────────────────────────────────────              │
│  Features                                                │
│  ─────────────────────────────────────────              │
│  • Create and manage recipes with images               │
│  • Link recipes to your Shopify products               │
│  • SEO-optimized with JSON-LD structured data          │
│  • Print and PDF export support                         │
│  • Display recipes on your Online Store 2.0 theme      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2. Recipe List Screen

```
┌─────────────────────────────────────────────────────────┐
│  Recipes                                  [Create Recipe]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Recipe         Servings    Cook Time  Product Linked││
│  ├────────────────────────────────────────────────────┤│
│  │ Spicy Grilled  4 servings  45 min    No            ││
│  │ Chicken                                             ││
│  ├────────────────────────────────────────────────────┤│
│  │ Texas-Style    6 servings  180 min   No            ││
│  │ BBQ Ribs                                            ││
│  ├────────────────────────────────────────────────────┤│
│  │ Spiced Roasted 4 servings  35 min    No            ││
│  │ Vegetables                                          ││
│  ├────────────────────────────────────────────────────┤│
│  │ Texas Trail    4 servings  20 min    No            ││
│  │ Dust Burger                                         ││
│  ├────────────────────────────────────────────────────┤│
│  │ Cajun Shrimp   4 servings  15 min    No            ││
│  │ Skewers                                             ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 3. Create/Edit Recipe Screen

```
┌─────────────────────────────────────────────────────────┐
│  < Back  Create Recipe                            [Save] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Recipe Details                                      ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ Title *                                             ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ Spicy Grilled Chicken                           │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ Description                                         ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ A delicious grilled chicken recipe...           │││
│  │ │                                                  │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ Image URL                                           ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ https://example.com/image.jpg                   │││
│  │ └─────────────────────────────────────────────────┘││
│  │                                                     ││
│  │ [Image Preview]                                     ││
│  │                                                     ││
│  │ Cook Time (minutes)    Servings                    ││
│  │ ┌──────────────┐      ┌──────────────┐            ││
│  │ │ 45           │      │ 4            │            ││
│  │ └──────────────┘      └──────────────┘            ││
│  │                                                     ││
│  │ Product ID (Shopify)                               ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │                                                  │││
│  │ └─────────────────────────────────────────────────┘││
│  │ Link this recipe to a Shopify product             ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Ingredients               [Add Ingredient]         ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ ┌────────────────────────────────────┐ [Remove]    ││
│  │ │ 4 chicken breasts                  │            ││
│  │ └────────────────────────────────────┘            ││
│  │                                                     ││
│  │ ┌────────────────────────────────────┐ [Remove]    ││
│  │ │ 2 tbsp Cousin Tony's Texas Trail   │            ││
│  │ └────────────────────────────────────┘            ││
│  │                                                     ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Instructions                [Add Step]             ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ ┌────────────────────────────────────┐ [Remove]    ││
│  │ │ Preheat grill to medium-high heat  │            ││
│  │ │                                     │            ││
│  │ └────────────────────────────────────┘            ││
│  │                                                     ││
│  │ ┌────────────────────────────────────┐ [Remove]    ││
│  │ │ Mix seasoning with olive oil       │            ││
│  │ │                                     │            ││
│  │ └────────────────────────────────────┘            ││
│  │                                                     ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Tags                                                ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ ┌─────────────────────────────────────────────────┐││
│  │ │ dinner, grilled, chicken, spicy                 │││
│  │ └─────────────────────────────────────────────────┘││
│  │ Comma-separated tags                               ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4. Recipe Detail Screen

```
┌─────────────────────────────────────────────────────────┐
│  < Back  Spicy Grilled Chicken                          │
│  [Edit] [Print] [Export PDF] [Delete]                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ [Recipe Image]                                      ││
│  │ ┌────────────────────────────────────────────────┐ ││
│  │ │                                                 │ ││
│  │ │         Grilled Chicken Image                  │ ││
│  │ │                                                 │ ││
│  │ └────────────────────────────────────────────────┘ ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Details                                             ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ A delicious grilled chicken recipe with Cousin     ││
│  │ Tony's Texas Trail Dust seasoning that brings      ││
│  │ authentic Texas flavors to your dinner table.      ││
│  │                                                     ││
│  │ [Cook Time: 45 min] [Servings: 4]                 ││
│  │                                                     ││
│  │ [dinner] [grilled] [chicken] [spicy]               ││
│  │                                                     ││
│  │ Linked to Product ID: 123456789                    ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Ingredients                                         ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ • 4 chicken breasts                                ││
│  │ • 2 tablespoons Cousin Tony's Texas Trail Dust    ││
│  │ • 2 tablespoons olive oil                          ││
│  │ • 1 teaspoon garlic powder                         ││
│  │ • Salt to taste                                    ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ Instructions                                        ││
│  ├────────────────────────────────────────────────────┤│
│  │                                                     ││
│  │ 1. Preheat grill to medium-high heat               ││
│  │ 2. Mix Cousin Tony's Texas Trail Dust with olive  ││
│  │    oil and garlic powder                           ││
│  │ 3. Rub the mixture over chicken breasts            ││
│  │ 4. Grill for 6-8 minutes per side until internal  ││
│  │    temperature reaches 165°F                       ││
│  │ 5. Let rest for 5 minutes before serving           ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │ SEO Data (JSON-LD)                                 ││
│  ├────────────────────────────────────────────────────┤│
│  │ {                                                   ││
│  │   "@context": "https://schema.org/",              ││
│  │   "@type": "Recipe",                              ││
│  │   "name": "Spicy Grilled Chicken",                ││
│  │   "description": "A delicious grilled...",        ││
│  │   "cookTime": "PT45M",                            ││
│  │   "recipeYield": 4,                               ││
│  │   "recipeIngredient": [...],                      ││
│  │   "recipeInstructions": [...]                     ││
│  │ }                                                   ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Storefront Interface (Theme Extension)

### Recipe Block on Product Page

```
┌─────────────────────────────────────────────────────────┐
│                  Product Page                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Product Details and Images]                           │
│  [Add to Cart Button]                                   │
│                                                          │
│  ─────────────────────────────────────────              │
│                                                          │
│  Recipe: Spicy Grilled Chicken                          │
│  ═══════════════════════════                            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐│
│  │                                                     ││
│  │              [Recipe Image]                        ││
│  │                                                     ││
│  └────────────────────────────────────────────────────┘│
│                                                          │
│  A delicious grilled chicken recipe with Cousin Tony's │
│  Texas Trail Dust seasoning that brings authentic      │
│  Texas flavors to your dinner table.                   │
│                                                          │
│  Cook Time: 45 minutes          Servings: 4            │
│                                                          │
│  Ingredients                                             │
│  ────────────                                           │
│  • 4 chicken breasts                                    │
│  • 2 tablespoons Cousin Tony's Texas Trail Dust        │
│  • 2 tablespoons olive oil                              │
│  • 1 teaspoon garlic powder                             │
│  • Salt to taste                                        │
│                                                          │
│  Instructions                                            │
│  ────────────                                           │
│  1. Preheat grill to medium-high heat                  │
│  2. Mix Cousin Tony's Texas Trail Dust with olive oil  │
│     and garlic powder                                   │
│  3. Rub the mixture over chicken breasts                │
│  4. Grill for 6-8 minutes per side until internal      │
│     temperature reaches 165°F                           │
│  5. Let rest for 5 minutes before serving               │
│                                                          │
│  [dinner] [grilled] [chicken] [spicy]                   │
│                                                          │
│  [Print Recipe]                                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Mobile Responsive Views

### Mobile Recipe List

```
┌──────────────────────┐
│  Recipes [+]         │
├──────────────────────┤
│                      │
│ ┌──────────────────┐│
│ │ Spicy Grilled    ││
│ │ Chicken          ││
│ │                  ││
│ │ 4 servings       ││
│ │ 45 min           ││
│ └──────────────────┘│
│                      │
│ ┌──────────────────┐│
│ │ Texas-Style      ││
│ │ BBQ Ribs         ││
│ │                  ││
│ │ 6 servings       ││
│ │ 180 min          ││
│ └──────────────────┘│
│                      │
│ ┌──────────────────┐│
│ │ Spiced Roasted   ││
│ │ Vegetables       ││
│ │                  ││
│ │ 4 servings       ││
│ │ 35 min           ││
│ └──────────────────┘│
│                      │
└──────────────────────┘
```

## Component Library (Polaris)

### Used Components

1. **Page** - Page wrapper with header and actions
2. **Layout** - Responsive grid system
3. **Card** - Content containers with sections
4. **FormLayout** - Structured form layout
5. **TextField** - Single and multi-line inputs
6. **Button** - Primary and secondary actions
7. **DataTable** - Tabular data display
8. **Badge** - Status and metadata indicators
9. **Thumbnail** - Image previews
10. **BlockStack** - Vertical layout
11. **InlineStack** - Horizontal layout
12. **Text** - Typography component
13. **List** - Ordered and unordered lists

## Color Scheme

Following Shopify Polaris design system:
- Primary: #008060 (Shopify Green)
- Success: #008060
- Warning: #FFC453
- Critical: #D72C0D
- Background: #F6F6F7
- Surface: #FFFFFF
- Text: #202223

## Accessibility Features

- Semantic HTML markup
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- Color contrast compliance
- Responsive text sizing

## Print Styles

When printing a recipe:
- Hide navigation and buttons
- Optimize for paper format
- Clear typography
- Black and white friendly
- Page break considerations

## PDF Export Layout

Generated PDFs include:
- Recipe title (large heading)
- Description (if available)
- Metadata (cook time, servings)
- Ingredients list (bulleted)
- Instructions (numbered)
- Clean, professional layout
- Adequate margins

This UI design provides a clean, intuitive experience for both merchants managing recipes and customers viewing them on the storefront.
