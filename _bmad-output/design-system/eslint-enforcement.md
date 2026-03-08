# 🚨 ESLint Design System Enforcement

**Version:** 1.0
**Last Updated:** 2026-01-30
**Status:** Active

---

## Overview

Automated enforcement of Tonalè's design system through ESLint rules. These rules catch common violations before they reach production.

---

## 🎯 What Gets Caught

### 1. Hardcoded Hex Colours ❌
```typescript
// ❌ ESLint Error
backgroundColor: '#ffffff'
color: '#000'
borderColor: '#ff0000'

// ✅ Correct
backgroundColor: theme.colors.surface
color: theme.colors.text
borderColor: theme.colors.error
```

**Rule:** `no-restricted-syntax` (colour pattern)
**Severity:** Warning
**Fix:** Use `theme.colors.*` tokens

---

### 2. Direct Colors.ts Imports ❌
```typescript
// ❌ ESLint Error
import { Colors } from '@/config/theme/Colors'

// ✅ Correct
import { useTheme } from '@emotion/react'
const theme = useTheme()
```

**Rule:** `no-restricted-imports`
**Severity:** Error
**Fix:** Use `useTheme()` hook or styled components with theme

---

### 3. Hardcoded Font Sizes ❌
```typescript
// ❌ ESLint Warning
fontSize: 16
fontSize: 24

// ✅ Correct
fontSize: theme.typography.base
fontSize: theme.typography.xl
```

**Rule:** `no-restricted-syntax` (fontSize pattern)
**Severity:** Warning
**Fix:** Use `theme.typography.*` tokens

---

### 4. Hardcoded Font Weights ❌
```typescript
// ❌ ESLint Warning
fontWeight: 'bold'
fontWeight: '700'

// ✅ Correct
fontWeight: theme.fontWeight.bold
// Or better yet, use font family helper:
fontFamily: getSourGummyFontFamily(theme.fontWeight.bold)
```

**Rule:** `no-restricted-syntax` (fontWeight pattern)
**Severity:** Warning
**Fix:** Use `theme.fontWeight.*` or `getSourGummyFontFamily()`

---

### 5. Hardcoded Shadow Properties ❌
```typescript
// ❌ ESLint Warning
shadowOpacity: 0.1
elevation: 8

// ✅ Correct
...theme.shadows.md
```

**Rule:** `no-restricted-syntax` (shadow patterns)
**Severity:** Warning
**Fix:** Use `theme.shadows.*` (spread operator)

---

## 📋 Running ESLint

### Check All Files
```bash
npm run lint
```

### Auto-Fix Where Possible
```bash
npm run lint:fix
```

### Check Design System Only (Quiet Mode)
```bash
npm run lint:design-system
```

### Check Specific Files
```bash
npx eslint src/components/MyComponent.tsx
```

---

## 🔧 Configuration Files

### Primary Config
**File:** `/eslint.config.js`
- Main ESLint configuration
- Integrates design system rules
- Expo defaults + custom rules

### Design System Rules
**File:** `/.eslintrc-design-system.js`
- Dedicated design system enforcement
- Custom patterns for violations
- File-specific overrides

### Package Scripts
**File:** `/package.json`
```json
{
  "scripts": {
    "lint": "expo lint",
    "lint:fix": "expo lint --fix",
    "lint:design-system": "expo lint --quiet --rule 'no-restricted-imports' --rule 'no-restricted-syntax'"
  }
}
```

---

## 🎭 Rule Exceptions

### Theme Files (Rules Disabled)
ESLint rules are **disabled** in these locations:
- `**/theme.ts`
- `**/Colors.ts`
- `**/theme/*.ts`
- `**/config/theme/**/*.ts`

**Why?** These files define the design system itself.

---

### Component Exceptions (Rules Relaxed)
ESLint rules are **warnings** (not errors) in:
- `**/PianoKeyboard/**/*.{ts,tsx}`
- `**/MusicNotation/**/*.{ts,tsx}`

**Why?** These components represent real-world objects (piano keys, musical notation) that need specific colours for realism.

**Note:** Even here, violations should be documented with comments:
```typescript
backgroundColor: '#FFFFFF'  // Intentional: Piano white key
```

---

## 🔍 Understanding Violations

### Example ESLint Output

```bash
src/components/Button.tsx
  12:3  warning  Avoid hardcoded hex colours. Use theme.colors.*  no-restricted-syntax
  15:3  warning  Avoid hardcoded fontSize. Use theme.typography.*  no-restricted-syntax

✖ 2 problems (0 errors, 2 warnings)
```

### How to Fix

1. **Identify the violation** - Line 12 has hardcoded colour
2. **Check migration guide** - See `migration-guide.md`
3. **Find correct token** - Use `design-tokens.md` reference
4. **Update code** - Replace hardcoded value with theme token
5. **Verify fix** - Run `npm run lint` again

---

## 📚 Migration Quick Reference

### Common Fixes

| Violation | Fix | Token |
|-----------|-----|-------|
| `#ffffff` | `theme.colors.surface` | Colour |
| `#000` | `theme.colors.text` | Colour |
| `fontSize: 16` | `theme.typography.base` | Typography |
| `fontSize: 24` | `theme.typography.xl` | Typography |
| `elevation: 8` | `...theme.shadows.lg` | Shadow |
| `fontWeight: 'bold'` | `theme.fontWeight.bold` | Font Weight |

### Full Migration Guide
See `/_bmad-output/design-system/migration-guide.md`

---

## 🚦 Severity Levels

### Error (Blocks Build)
- Direct imports of `Colors.ts`

**Action:** Must fix immediately

---

### Warning (Doesn't Block)
- Hardcoded colours
- Hardcoded font sizes
- Hardcoded shadows
- Hardcoded font weights

**Action:** Should fix before merging

---

### Off (No Check)
- Inside theme definition files
- Documented exceptions

**Action:** None needed

---

## 🔄 CI/CD Integration

### Pre-Commit Hook (Recommended)

Install Husky:
```bash
npm install --save-dev husky
npx husky init
```

Add to `.husky/pre-commit`:
```bash
#!/bin/sh
npm run lint
```

### GitHub Actions

Add to `.github/workflows/lint.yml`:
```yaml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
```

---

## 📊 Monitoring Compliance

### Check Current Status
```bash
# Get violation count
npm run lint | grep "warning" | wc -l

# Get detailed report
npm run lint > lint-report.txt
```

### Track Over Time
```bash
# Create baseline
npm run lint --format json > eslint-baseline.json

# Compare after changes
npm run lint --format json > eslint-current.json
```

---

## 🎓 Best Practices

### For Developers

1. **Run lint before committing**
   ```bash
   npm run lint
   ```

2. **Fix violations immediately**
   - Don't accumulate technical debt
   - Use migration guide for quick fixes

3. **Use IDE integration**
   - VS Code: ESLint extension
   - WebStorm: Built-in ESLint support

4. **Document exceptions**
   ```typescript
   // Intentional: Piano key colour for realism
   backgroundColor: '#FFFFFF'
   ```

---

### For Code Reviewers

1. **Check for new violations**
   - Run `npm run lint` on PR branch
   - Compare violation count with main

2. **Question exceptions**
   - Are they documented?
   - Are they truly necessary?

3. **Suggest alternatives**
   - Point to migration guide
   - Provide specific token recommendations

---

## 🛠️ Customising Rules

### Adding New Patterns

Edit `.eslintrc-design-system.js`:

```javascript
'no-restricted-syntax': [
  'warn',
  {
    selector: 'Property[key.name="myProperty"]',
    message: 'Custom message here'
  }
]
```

### Changing Severity

```javascript
'no-restricted-syntax': 'error'  // Block builds
'no-restricted-syntax': 'warn'   // Warn only
'no-restricted-syntax': 'off'    // Disable
```

### Adding Exceptions

```javascript
{
  files: ['**/MyComponent/**/*.tsx'],
  rules: {
    'no-restricted-syntax': 'off'
  }
}
```

---

## 🐛 Troubleshooting

### ESLint Not Running?

**Check:**
1. Is ESLint installed? `npm list eslint`
2. Is config file valid? Check for syntax errors
3. Are file patterns correct? Check `files: ['**/*.ts', '**/*.tsx']`

---

### Too Many False Positives?

**Solutions:**
1. Add file-specific overrides
2. Adjust regex patterns in rules
3. Lower severity to `warn` instead of `error`

---

### Rules Not Catching Violations?

**Check:**
1. Selector patterns in `no-restricted-syntax`
2. File is included in ESLint scope
3. Rule isn't disabled in overrides

---

## 📞 Support

### Questions?
- Check [migration-guide.md](./migration-guide.md) for fixes
- See [design-tokens.md](./design-tokens.md) for token reference
- Review this doc for rule explanations

### Report Issues
- ESLint false positives → Update `.eslintrc-design-system.js`
- Missing patterns → Add to `no-restricted-syntax`
- Documentation gaps → Update this file

---

## 📈 Success Metrics

### Goal: Zero Violations
Track progress toward 100% compliance:

```bash
# Current violations
npm run lint 2>&1 | grep "problems" | tail -1
```

### Example Output
```
✖ 0 problems (0 errors, 0 warnings)  # ✅ Perfect!
✖ 5 problems (1 error, 4 warnings)   # ⚠️ Needs work
```

---

## 🎯 Quick Start Guide

### New Developers

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Test ESLint**
   ```bash
   npm run lint
   ```

3. **Fix violations**
   ```bash
   npm run lint:fix  # Auto-fix
   # Then manually fix remaining issues
   ```

4. **Learn patterns**
   - Read `migration-guide.md`
   - Check `design-tokens.md`
   - Review this doc

---

## 🎉 Conclusion

ESLint enforcement ensures design system compliance automatically. With these rules:

✅ **Catches violations early** - Before code review
✅ **Provides clear guidance** - Helpful error messages
✅ **Maintains consistency** - Across entire codebase
✅ **Reduces technical debt** - Prevents accumulation
✅ **Improves code quality** - Industry best practices

**Keep calm and lint on!** 🚀

---

**Version:** 1.0
**Maintained By:** Architecture Team
**Last Review:** 2026-01-30
**Next Review:** After 1 month of usage
