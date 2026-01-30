# 🎯 Design Tokens Quick Reference

**Version:** 1.0
**Last Updated:** 2026-01-30

---

## What Are Design Tokens?

Design tokens are the DNA of your design system—named entities that store visual design values. Instead of hardcoding `#0a7ea4`, you use `theme.colors.primary`. This makes your design:
- **Consistent** (one source of truth)
- **Maintainable** (change once, update everywhere)
- **Themeable** (light/dark mode with one toggle)

---

## 🎨 Color Tokens

### Light Mode

```typescript
// Semantic colors
theme.colors.primary         // #0a7ea4  (Trustworthy teal)
theme.colors.secondary       // #687076  (Neutral grey)
theme.colors.accent          // #ff6b6b  (Energetic coral)
theme.colors.success         // #2f9e44  (Encouraging green) ✅ WCAG fixed
theme.colors.warning         // #ffd43b  (Attention yellow)
theme.colors.error           // #e03131  (Alert red) ✅ WCAG fixed

// Text colors
theme.colors.text            // #11181C  (Primary text)
theme.colors.textSecondary   // #687076  (Secondary text)

// Surface colors
theme.colors.background      // #ffffff  (Main background)
theme.colors.surface         // #f8f9fa  (Card surfaces)
theme.colors.border          // #868e96  (Dividers)

// Special purpose
theme.colors.stageCleared    // #2e7d32  ✅ WCAG fixed
theme.colors.stagePerfect    // #FFD700  (Gold)
theme.colors.flame.active    // #d84315  ✅ WCAG fixed
```

### Dark Mode

```typescript
// Semantic colors
theme.colors.primary         // #1c7ed6  ✅ WCAG fixed
theme.colors.secondary       // #9BA1A6
theme.colors.accent          // #ff8787
theme.colors.success         // #69db7c
theme.colors.warning         // #ffe066
theme.colors.error           // #ff8787

// Surface colors
theme.colors.background      // #151718  (True dark)
theme.colors.surface         // #1f2937  (Elevated surfaces)
theme.colors.border          // #4b5563  ✅ WCAG fixed
```

---

## ✍️ Typography Tokens

### Font Sizes

```typescript
theme.typography.xs          // 10px  (Tiny labels)
theme.typography.sm          // 12px  (Captions)
theme.typography.base        // 16px  (Body text)
theme.typography.lg          // 20px  (Subheadings)
theme.typography.xl          // 24px  (Headings)
theme.typography['2xl']      // 28px  (Large headings)
theme.typography['3xl']      // 32px  (Hero text)
theme.typography['4xl']      // 40px  (Display)
theme.typography['5xl']      // 52px  (Extra large)
```

### Font Weights

```typescript
theme.fontWeight.normal      // '400'  (Body text)
theme.fontWeight.medium      // '500'  (Emphasized)
theme.fontWeight.semibold    // '600'  (Subheadings)
theme.fontWeight.bold        // '700'  (Headings)
```

### Font Family

```typescript
theme.typography.fontFamily  // 'SourGummy-Regular'
```

---

## 📏 Spacing Tokens

```typescript
theme.spacing.xs             // 4px   (Tight)
theme.spacing.sm             // 8px   (Compact)
theme.spacing.md             // 16px  (Default)
theme.spacing.lg             // 24px  (Generous)
theme.spacing.xl             // 32px  (Section break)
theme.spacing.xxl            // 40px  (Major section)
theme.spacing.xxxl           // 48px  (Screen section)
```

---

## 🎨 Component Tokens

### Icon Sizes

```typescript
// [phone, tablet]
theme.components.iconSizes.xs     // [14, 16]
theme.components.iconSizes.sm     // [16, 20]
theme.components.iconSizes.md     // [18, 20]
theme.components.iconSizes.lg     // [20, 24]
theme.components.iconSizes.xl     // [36, 40]
theme.components.iconSizes['2xl'] // [48, 64]
```

### Card Button Depth Colors

```typescript
theme.colors.cardButton.depth.completed   // #2a8a3a
theme.colors.cardButton.depth.locked      // #0a3a4a
theme.colors.cardButton.depth.default     // #156382
```

### Button Colors

```typescript
theme.colors.choiceButton.blue       // Primary blue
theme.colors.choiceButton.red        // Coral red
theme.colors.choiceButton.green      // Success green
theme.colors.choiceButton.yellow     // Warning yellow
theme.colors.choiceButton.grey       // Neutral grey
```

---

## 💡 Usage Examples

### Basic Component

```typescript
import { useTheme } from '@emotion/react'

const MyButton = ({ children }) => {
  const theme = useTheme()

  return (
    <TouchableOpacity style={{
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.spacing.sm,
    }}>
      <Text style={{
        color: '#ffffff',
        fontSize: theme.typography.base,
        fontWeight: theme.fontWeight.medium,
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
```

### Responsive Sizing

```typescript
const ResponsiveIcon = () => {
  const theme = useTheme()
  const { isTablet } = useDevice()

  const iconSize = theme.components.iconSizes.md[isTablet ? 1 : 0]

  return <Icon name="music" size={iconSize} />
}
```

---

## 🔄 Accessing Tokens

### Method 1: useTheme Hook (Recommended)

```typescript
import { useTheme } from '@emotion/react'

const Component = () => {
  const theme = useTheme()
  // Use theme.colors.primary, theme.spacing.md, etc.
}
```

### Method 2: Emotion Styled

```typescript
import styled from '@emotion/native'

const StyledView = styled.View`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
`
```

### Method 3: Direct Import (Not Recommended)

```typescript
import { lightTheme } from '@/config/theme/theme'
// Only use for non-component code
```

---

## 🎯 Token Naming Convention

### Pattern: `category.semantic-name`

```typescript
// ✅ Good (semantic)
theme.colors.primary
theme.colors.success
theme.spacing.md

// ❌ Bad (presentational)
theme.colors.blue
theme.colors.green
theme.spacing.16px
```

**Why semantic?**
If you change primary from blue to purple, `theme.colors.primary` still makes sense. `theme.colors.blue` would be confusing.

---

## 📖 Documentation Links

**Full Guides:**
- [Colors System](./colors.md) - Complete color palette + usage
- [Typography System](./typography.md) - Font sizes, weights, patterns
- [Spacing System](./spacing.md) - Layout and component spacing
- [WCAG Accessibility](./wcag-accessibility.md) - Accessibility compliance

**Implementation:**
- Source: `/src/config/theme/`
- Colors: `/src/config/theme/Colors.ts`
- Theme: `/src/config/theme/theme.ts`

---

## 🔮 Extending Tokens

### Adding New Colors

```typescript
// 1. Add to Colors.ts
export const Colors = {
  light: {
    // ...
    myNewColor: '#hexcode',
  }
}

// 2. Add to theme.ts
export const lightTheme = {
  colors: {
    // ...
    myNewColor: Colors.light.myNewColor,
  }
}

// 3. Use in components
theme.colors.myNewColor
```

### Adding New Spacing

```typescript
// 1. Add to theme.ts
export const sharedConstants = {
  spacing: {
    // ...
    '4xl': 64,
  }
}

// 2. Use in components
theme.spacing['4xl']
```

---

## ⚠️ Important Rules

1. **Never hardcode values** - Always use tokens
2. **Use semantic names** - Describe purpose, not appearance
3. **Test accessibility** - Check WCAG compliance for color combinations
4. **Document additions** - Update this file + category docs

---

**Quick Navigation:**
- **[Design System Home](./README.md)** - Overview
- **[Colors Guide](./colors.md)** - Color usage patterns
- **[Typography Guide](./typography.md)** - Text styling
- **[Spacing Guide](./spacing.md)** - Layout spacing
- **[WCAG Compliance](./wcag-accessibility.md)** - Accessibility audit

---

**Last Updated:** 2026-01-30
**Version:** 1.0
