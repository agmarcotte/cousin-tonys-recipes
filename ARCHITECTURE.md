# Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Shopify Ecosystem                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐         ┌──────────────────┐                 │
│  │  Shopify Admin   │         │  Online Store     │                 │
│  │                  │         │                   │                 │
│  │  ┌────────────┐  │         │  ┌────────────┐  │                 │
│  │  │ Embedded   │  │         │  │  Theme     │  │                 │
│  │  │ App (UI)   │◄─┼─────────┼──┤  Extension │  │                 │
│  │  └────────────┘  │         │  │  (Recipe   │  │                 │
│  │        ▲         │         │  │   Display) │  │                 │
│  │        │         │         │  └────────────┘  │                 │
│  └────────┼─────────┘         └───────▲──────────┘                 │
│           │                            │                             │
└───────────┼────────────────────────────┼─────────────────────────────┘
            │                            │
            │ App Bridge                 │ Storefront API
            │ OAuth                      │ Metafields
            │                            │
┌───────────▼────────────────────────────▼─────────────────────────────┐
│                   Cousin Tony's Recipes App                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                      Remix Framework                          │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │                                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │  │
│  │  │  Admin UI    │  │  API Routes  │  │  Auth Routes │      │  │
│  │  │  (Polaris)   │  │              │  │              │      │  │
│  │  │              │  │              │  │              │      │  │
│  │  │ • Dashboard  │  │ • Recipes    │  │ • OAuth      │      │  │
│  │  │ • Recipe List│  │ • Products   │  │ • Callback   │      │  │
│  │  │ • Create/Edit│  │ • Search     │  │ • Webhooks   │      │  │
│  │  │ • View       │  │ • Export     │  │              │      │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │  │
│  │         │                 │                 │               │  │
│  │         └─────────────────┼─────────────────┘               │  │
│  │                           │                                 │  │
│  │  ┌────────────────────────▼──────────────────────────────┐ │  │
│  │  │            Business Logic Layer                       │ │  │
│  │  ├───────────────────────────────────────────────────────┤ │  │
│  │  │                                                        │ │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐│ │  │
│  │  │  │ Recipe Model │  │  Metafield   │  │   Shopify   ││ │  │
│  │  │  │              │  │   Helpers    │  │    Client   ││ │  │
│  │  │  │ • CRUD ops   │  │              │  │             ││ │  │
│  │  │  │ • Validation │  │ • Sync to    │  │ • GraphQL   ││ │  │
│  │  │  │ • Parsing    │  │   Products   │  │   Queries   ││ │  │
│  │  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘│ │  │
│  │  │         │                 │                 │        │ │  │
│  │  └─────────┼─────────────────┼─────────────────┼────────┘ │  │
│  │            │                 │                 │          │  │
│  └────────────┼─────────────────┼─────────────────┼──────────┘  │
│               │                 │                 │              │
│  ┌────────────▼─────────────────▼─────────────────▼──────────┐  │
│  │                   Data Layer                               │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  ┌────────────┐              ┌──────────────────────────┐ │  │
│  │  │  Prisma    │              │   Shopify Admin API      │ │  │
│  │  │   ORM      │              │                          │ │  │
│  │  │            │              │  • Product Data          │ │  │
│  │  │            │              │  • Metafields            │ │  │
│  │  └─────┬──────┘              │  • Product Search        │ │  │
│  │        │                     └──────────────────────────┘ │  │
│  │        │                                                   │  │
│  │  ┌─────▼──────┐                                           │  │
│  │  │  Database  │                                           │  │
│  │  │  (SQLite/  │                                           │  │
│  │  │ PostgreSQL)│                                           │  │
│  │  │            │                                           │  │
│  │  │ • Sessions │                                           │  │
│  │  │ • Recipes  │                                           │  │
│  │  └────────────┘                                           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│                     External Services                              │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   jsPDF      │  │  File Upload │  │   CDN        │           │
│  │  (PDF Export)│  │   Service    │  │  (Images)    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Recipe Creation Flow

```
Merchant → Admin UI → Create Recipe Form → Remix Action
  → Recipe Model → Prisma → Database
  → (Optional) Metafield Helper → GraphQL API → Shopify Product
  → Redirect to Recipe Detail → UI Update
```

### 2. Recipe Display on Storefront Flow

```
Customer → Online Store → Product Page → Theme Extension
  → Recipe Block (Liquid) → Display Recipe Data
  → (Optional) Fetch from Metafields → Render Recipe
  → JSON-LD Structured Data → SEO Enhancement
```

### 3. Recipe Export Flow

```
Merchant → Recipe Detail → Export PDF Button
  → jsPDF Library → Generate PDF → Browser Download
```

### 4. Product Linking Flow

```
Merchant → Recipe Edit → Enter Product ID
  → Metafield Helper → GraphQL Mutation
  → Update Product Metafield → Sync Complete
```

## Technology Stack

### Frontend
- **Framework**: Remix 2.0
- **UI Library**: Shopify Polaris 12
- **Embedding**: App Bridge 3.7
- **PDF Export**: jsPDF 2.5

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Remix (server-side)
- **API**: GraphQL (Shopify Admin API)
- **ORM**: Prisma 5.0

### Database
- **Development**: SQLite
- **Production**: PostgreSQL (recommended)

### Authentication
- **Method**: OAuth 2.0
- **Session**: Database-backed (Prisma)

### Theme Extension
- **Type**: Online Store 2.0
- **Language**: Liquid
- **Structure**: Blocks and Sections

## Security Architecture

```
┌─────────────────────────────────────────────┐
│          Security Layers                    │
├─────────────────────────────────────────────┤
│                                             │
│  1. OAuth 2.0 Authentication                │
│     ↓                                       │
│  2. Session Validation                      │
│     ↓                                       │
│  3. Shop-based Data Isolation               │
│     ↓                                       │
│  4. HMAC Verification (Webhooks)            │
│     ↓                                       │
│  5. Input Validation & Sanitization         │
│     ↓                                       │
│  6. Rate Limiting (Future)                  │
│                                             │
└─────────────────────────────────────────────┘
```

## Deployment Architecture

### Production Setup

```
┌────────────────────────────────────────────────────────┐
│                     Load Balancer                      │
│                    (Optional)                          │
└────────────────────┬───────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼────────┐    ┌────────▼────────┐
│   App Instance  │    │   App Instance  │
│    (Node.js)    │    │    (Node.js)    │
└────────┬────────┘    └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
            ┌────────▼────────┐
            │   PostgreSQL    │
            │    Database     │
            └─────────────────┘
```

## Performance Considerations

### Optimizations Implemented
- Database indexing on shop and productId
- JSON data storage for arrays
- Lazy loading of images
- Optimistic UI updates

### Future Optimizations
- Redis caching layer
- CDN for static assets
- Connection pooling
- Query optimization
- Background job processing

## Scalability

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add caching layer

### Horizontal Scaling
- Deploy multiple instances
- Use load balancer
- Shared session storage (Redis)
- Database read replicas

## Monitoring & Observability

### Key Metrics
- Response time
- Error rate
- Database query performance
- API call success rate
- User engagement

### Tools (Recommended)
- Sentry (Error tracking)
- New Relic (APM)
- DataDog (Infrastructure)
- LogRocket (Session replay)

## Extension Points

The architecture is designed to be extensible:

1. **New Recipe Fields**: Add to Prisma schema and UI
2. **Additional Features**: Create new routes and models
3. **Theme Customization**: Modify Liquid templates
4. **API Integration**: Add new API routes
5. **Webhooks**: Handle Shopify events

## Development Workflow

```
Local Development → Git Commit → Push to GitHub
    ↓                                    ↓
Run Tests                         CI/CD Pipeline
    ↓                                    ↓
Code Review                       Deploy to Staging
    ↓                                    ↓
Merge to Main                     Test in Dev Store
    ↓                                    ↓
Tag Release                       Deploy to Production
    ↓                                    ↓
App Store Update               Monitor & Support
```

## API Design

### REST-ful Routes
- `GET /app/recipes` - List recipes
- `GET /app/recipes/new` - New recipe form
- `POST /app/recipes/new` - Create recipe
- `GET /app/recipes/:id` - View recipe
- `GET /app/recipes/:id/edit` - Edit form
- `POST /app/recipes/:id/edit` - Update recipe
- `POST /app/recipes/:id` - Delete recipe (via form action)

### API Endpoints
- `GET /api/recipes/:id` - Fetch recipe data
- `GET /api/recipes` - List recipes (with filters)
- `GET /api/products/search` - Search products

### GraphQL (Shopify Admin API)
- Product queries
- Metafield mutations
- Product search

This architecture provides a solid foundation for a scalable, maintainable, and feature-rich Shopify recipe management application.
