# 🚀 Design System Quick Reference

**Print this and keep it handy!**

---

## ⚡ Common Patterns

### Import Theme
```typescript
import { useTheme } from '@emotion/react'
const theme = useTheme()
```

---

## 🎨 Colours

```typescript
// Text
theme.colors.text           // Primary text
theme.colors.textSecondary  // Secondary text

// Backgrounds
theme.colors.background     // Main background
theme.colors.surface        // Cards, modals

// Semantic
theme.colors.primary        // CTA buttons
theme.colors.success        // Correct answers
theme.colors.error          // Errors
theme.colors.warning        // Warnings

// Borders
theme.colors.border         // Dividers
```

---

## ✍️ Typography

```typescript
// Sizes
theme.typography.xs         // 10px - Badges
theme.typography.sm         // 12px - Captions
theme.typography.base       // 16px - Body
theme.typography.lg         // 20px - Subheadings
theme.typography.xl         // 24px - Headings
theme.typography['2xl']     // 28px - Large headings

// Weights
theme.fontWeight.normal     // 400
theme.fontWeight.medium     // 500
theme.fontWeight.semibold   // 600
theme.fontWeight.bold       // 700

// Font Family
getSourGummyFontFamily('400')  // Normal
getSourGummyFontFamily('700')  // Bold
```

---

## 📏 Spacing

```typescript
theme.spacing.xs      // 4px  - Tight
theme.spacing.sm      // 8px  - Compact
theme.spacing.md      // 16px - Default
theme.spacing.lg      // 24px - Generous
theme.spacing.xl      // 32px - Sections
theme.spacing.xxl     // 40px - Major
theme.spacing.xxxl    // 48px - Screen
```

---

## 🔲 Border Radius

```typescript
theme.borderRadius.xs       // 4px
theme.borderRadius.sm       // 8px
theme.borderRadius.md       // 12px
theme.borderRadius.lg       // 16px
theme.borderRadius.xl       // 20px
theme.borderRadius['2xl']   // 24px
```

---

## 🌑 Shadows

```typescript
...theme.shadows.none    // No shadow
...theme.shadows.xs      // Subtle
...theme.shadows.sm      // Light
...theme.shadows.md      // Medium
...theme.shadows.lg      // Prominent
...theme.shadows.xl      // Maximum
```

**Note:** Use spread operator `...` to apply all shadow properties

---

## 🔄 Responsive Scaling

```typescript
import { scale } from 'react-native-size-matters'

// Scale theme values for responsiveness
padding: scale(theme.spacing.md)
fontSize: scale(theme.typography.base)
```

---

## ✅ ESLint Check

```bash
# Before committing
npm run lint

# Auto-fix
npm run lint:fix
```

---

## ❌ Don't Do This

```typescript
// Never hardcode
backgroundColor: '#ffffff'  // ❌
fontSize: 16               // ❌
padding: 20                // ❌
elevation: 8               // ❌
```

---

## ✅ Do This Instead

```typescript
// Use theme tokens
backgroundColor: theme.colors.surface    // ✅
fontSize: theme.typography.base          // ✅
padding: theme.spacing.lg                // ✅
...theme.shadows.lg                      // ✅
```

---

## 📖 Full Documentation

- **Migration Guide:** `migration-guide.md`
- **Design Tokens:** `design-tokens.md`
- **ESLint Rules:** `eslint-enforcement.md`
- **Overview:** `README.md`

---

**Location:** `_bmad-output/design-system/`
**Version:** 2.0
**Updated:** 2026-01-30
