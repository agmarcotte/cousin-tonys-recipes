# Contributing to Cousin Tony's Recipes

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Help create a welcoming environment
- Follow best practices and coding standards

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Git
- A Shopify Partner account (for testing)
- A development store

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cousin-tonys-recipes.git
   cd cousin-tonys-recipes
   ```

3. Install dependencies:
   ```bash
   npm run setup
   ```

4. Create a `.env` file:
   ```bash
   cp .env.example .env
   # Add your Shopify credentials
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Changes

- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation if needed

### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: add recipe duplication feature"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting changes
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit for review

## Coding Standards

### JavaScript/JSX

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Destructure objects and arrays
- Use template literals for strings

```javascript
// Good
const { title, description } = recipe;
const message = `Recipe: ${title}`;

// Avoid
var title = recipe.title;
var message = "Recipe: " + title;
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

```javascript
// Good
export default function RecipeCard({ recipe }) {
  const { title, cookTime } = recipe;
  
  return (
    <Card>
      <Text>{title}</Text>
    </Card>
  );
}
```

### Naming Conventions

- **Components**: PascalCase (`RecipeCard`)
- **Functions**: camelCase (`getRecipe`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RECIPES`)
- **Files**: kebab-case for routes (`app.recipes.new.jsx`)

### File Organization

```
app/
  routes/          # Route components
  models/          # Data models
  components/      # Reusable components (if added)
  utils/           # Utility functions (if added)
  shopify.server/  # Shopify integrations
```

### Database Changes

When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Create a migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
3. Update relevant models in `app/models/`
4. Update documentation

### Documentation

- Update README.md if adding major features
- Update DEVELOPER.md for technical changes
- Update CHANGELOG.md with your changes
- Add inline comments for complex logic
- Document new APIs or endpoints

## Testing

### Manual Testing

Before submitting a PR, test:

1. **Recipe CRUD**:
   - Create a recipe
   - View the recipe
   - Edit the recipe
   - Delete the recipe

2. **Product Integration**:
   - Link recipe to product
   - Verify metafield sync
   - Test unlinking

3. **Export Features**:
   - Print recipe
   - Export to PDF
   - Verify formatting

4. **UI/UX**:
   - Check responsive design
   - Test on different browsers
   - Verify Polaris components

5. **Theme Extension**:
   - Install in dev store
   - Add recipe block to theme
   - Verify display and SEO data

### Future: Automated Tests

When test infrastructure is added:

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:e2e    # E2E tests
```

## Pull Request Guidelines

### PR Title

Use conventional commit format:
```
feat: add recipe categories
fix: correct cook time display
docs: update deployment guide
```

### PR Description

Include:
- **What**: Description of changes
- **Why**: Reason for changes
- **How**: Implementation approach
- **Testing**: How you tested
- **Screenshots**: For UI changes

### PR Checklist

Before submitting:
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Accessible markup used

## Review Process

1. **Automated Checks**: PR will be checked for conflicts
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address any comments or requests
4. **Approval**: Once approved, PR will be merged
5. **Cleanup**: Delete your branch after merge

## Common Contribution Areas

### Easy Contributions

- Fix typos in documentation
- Improve error messages
- Add code comments
- Update README examples

### Medium Contributions

- Add new recipe fields
- Improve UI/UX
- Add validation
- Enhance error handling

### Advanced Contributions

- Add recipe categories
- Implement search/filtering
- Add analytics
- Performance optimizations

## Feature Requests

To request a feature:

1. Check existing issues
2. Create a new issue
3. Use "Feature Request" template
4. Describe use case and benefits
5. Discuss with maintainers

## Bug Reports

To report a bug:

1. Check if already reported
2. Create a new issue
3. Use "Bug Report" template
4. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details

## Questions?

- Check existing documentation
- Search closed issues
- Open a discussion issue
- Ask in PR comments

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Credited in release notes
- Mentioned in documentation updates

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Resources

- [Remix Documentation](https://remix.run/docs)
- [Shopify Polaris](https://polaris.shopify.com/)
- [Shopify App Development](https://shopify.dev/docs/apps)
- [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)

## Getting Help

Need help contributing?

- Read DEVELOPER.md for architecture details
- Check EXTENSIONS.md for extension guides
- Review existing code for examples
- Open a discussion issue

## Thank You!

Every contribution, no matter how small, is valuable. Thank you for helping improve Cousin Tony's Recipes!

---

Happy Coding! 🎉👨‍🍳
