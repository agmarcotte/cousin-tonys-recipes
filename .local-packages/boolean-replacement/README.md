# Boolean Replacement Package

This is a drop-in replacement for the deprecated `boolean@3.2.0` npm package.

## Why This Exists

The original `boolean` package (https://www.npmjs.com/package/boolean) was deprecated in 2022 with no suggested replacement. Since it's a transitive dependency through `@shopify/cli` → `global-agent` → `boolean`, we cannot directly remove it from our dependency tree.

This local package provides the same API as the original package, allowing us to:
1. Eliminate deprecation warnings during `npm install`
2. Maintain compatibility with dependencies that require the `boolean` package
3. Have control over the implementation for security and maintenance

## API

This package exports two functions with the same behavior as the original:

### `boolean(value)`

Converts various values to boolean. Returns `true` for:
- Boolean `true`
- String: `'true'`, `'t'`, `'yes'`, `'y'`, `'on'`, `'1'` (case-insensitive, trimmed)
- Number: `1`

All other values return `false`.

### `isBooleanable(value)`

Checks if a value can be considered boolean-like. Returns `true` for:
- All values that `boolean()` considers true
- Boolean `false`
- String: `'false'`, `'f'`, `'no'`, `'n'`, `'off'`, `'0'` (case-insensitive, trimmed)
- Number: `0`

All other values return `false`.

## Usage

This package is used via npm overrides in the root `package.json`:

```json
{
  "overrides": {
    "boolean": "file:/path/to/.local-packages/boolean-replacement"
  }
}
```

npm will automatically replace all instances of the `boolean` package in the dependency tree with this local version.

## License

MIT - Same as the original package
