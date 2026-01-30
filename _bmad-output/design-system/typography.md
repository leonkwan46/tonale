# ✍️ Typography System

**Font Family:** Sour Gummy
**Version:** 1.0
**Last Updated:** 2026-01-30

---

## The Story of Sour Gummy

Music should be fun. Learning shouldn't feel like reading a textbook. That's why we chose **Sour Gummy**—a font that's playful yet readable, friendly yet professional. It has personality without sacrificing legibility.

Imagine a student practicing late at night, tired eyes scanning the screen. Sour Gummy's soft, rounded letterforms reduce eye strain while maintaining the enthusiasm we want students to feel.

---

## 📐 Type Scale

### Size Scale

| Name | Size | Line Height | Use Case |
|------|------|-------------|----------|
| **xs** | 10px | 14px | Tiny labels, badges, legal text |
| **sm** | 12px | 16px | Captions, timestamps, metadata |
| **base** | 16px | 24px | Body text (primary reading) |
| **lg** | 20px | 28px | Subheadings, emphasized text |
| **xl** | 24px | 32px | Section headings |
| **2xl** | 28px | 36px | Large headings, lesson titles |
| **3xl** | 32px | 40px | Hero text, screen titles |
| **4xl** | 40px | 48px | Display text, onboarding |
| **5xl** | 52px | 60px | Extra large display, celebrations |

### Weight Scale

| Name | Value | Use Case |
|------|-------|----------|
| **normal** | 400 | Body text, most UI elements |
| **medium** | 500 | Emphasized text, button labels |
| **semibold** | 600 | Subheadings, important labels |
| **bold** | 700 | Headings, calls-to-action |

---

## 🎯 Usage Guidelines

### Body Text (Most Common)

```typescript
<Text style={{
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.base,      // 16px
  fontWeight: theme.fontWeight.normal,  // 400
  lineHeight: 24,
  color: theme.colors.text
}}>
  This is standard body text for lessons and descriptions.
</Text>
```

**When to Use:**
- Lesson instructions
- Question text
- Answer explanations
- Settings descriptions
- Any primary reading content

**Don't Use For:**
- Buttons (use medium weight)
- Headings (use larger sizes + bold)
- Captions (use sm size)

---

### Headings

```typescript
// H1 - Screen Titles
<Text style={{
  fontSize: theme.typography['3xl'],  // 32px
  fontWeight: theme.fontWeight.bold,  // 700
  lineHeight: 40,
  color: theme.colors.text
}}>
  Welcome to Grade 1
</Text>

// H2 - Section Headings
<Text style={{
  fontSize: theme.typography.xl,       // 24px
  fontWeight: theme.fontWeight.bold,   // 700
  lineHeight: 32,
  color: theme.colors.text
}}>
  Music Theory Basics
</Text>

// H3 - Subsection Headings
<Text style={{
  fontSize: theme.typography.lg,       // 20px
  fontWeight: theme.fontWeight.semibold,  // 600
  lineHeight: 28,
  color: theme.colors.text
}}>
  Notes on the Treble Clef
</Text>
```

**Heading Hierarchy Rules:**
1. Only one H1 per screen (screen title)
2. H2 for major sections
3. H3 for subsections
4. Never skip levels (H1 → H3 = bad)
5. Use color sparingly (usually just text color)

---

### Captions & Metadata

```typescript
<Text style={{
  fontSize: theme.typography.sm,       // 12px
  fontWeight: theme.fontWeight.normal, // 400
  color: theme.colors.textSecondary,   // Lighter color
  lineHeight: 16
}}>
  Last practiced 2 hours ago
</Text>
```

**When to Use:**
- Timestamps
- Helper text below inputs
- Badge labels
- Tab bar labels
- Footer text

---

### Button Text

```typescript
<Button>
  <Text style={{
    fontSize: theme.typography.base,     // 16px
    fontWeight: theme.fontWeight.medium, // 500
    color: '#ffffff',
    textAlign: 'center'
  }}>
    Start Lesson
  </Text>
</Button>
```

**Button Text Rules:**
- Always use `medium` weight (500) minimum
- Never smaller than `base` (16px)
- Use `bold` for primary CTAs
- Center-aligned
- High contrast with background

---

## 📱 Responsive Typography

### Device-Specific Adjustments

Tonalè uses responsive scaling based on device type:

```typescript
import { useDevice } from '@/hooks/useDevice'

const MyComponent = () => {
  const { isTablet, scale } = useDevice()

  return (
    <Text style={{
      fontSize: isTablet ? 20 : 16,  // Larger on tablets
      // OR use scale function:
      fontSize: scale(16)  // Automatically adjusts based on device
    }}>
      Responsive text
    </Text>
  )
}
```

### Icon Size Scaling

Icons scale with text for visual harmony:

```typescript
export const iconSizes = {
  // [phone, tablet]
  xs: [14, 16],
  sm: [16, 20],
  md: [18, 20],
  lg: [20, 24],
  xl: [36, 40],
  '2xl': [48, 64]
}
```

**Usage:**
```typescript
<Icon
  name="music-note"
  size={theme.components.iconSizes.md[device.isTablet ? 1 : 0]}
/>
```

---

## ♿ Accessibility Considerations

### Minimum Font Sizes

**Never go below these:**
- Body text: 16px minimum (WCAG Level AA)
- Captions: 12px minimum
- Touch targets with text: 14px minimum

**Why?**
- Users with presbyopia (age-related vision loss)
- Low-light reading conditions
- Students practicing at arm's length

### Line Height Rules

```typescript
const calculateLineHeight = (fontSize: number) => {
  // Golden ratio: 1.5x font size
  return fontSize * 1.5
}

// Examples:
// 16px → 24px line height
// 20px → 30px line height
// 24px → 36px line height
```

**Why 1.5x?**
- Improves readability
- Reduces eye strain
- Works for all reading speeds
- WCAG recommended minimum

### Text Color Contrast

Always pair typography with accessible colors:

```typescript
// ✅ Good
<Text style={{
  fontSize: 16,
  color: theme.colors.text,          // 17.93:1 contrast
  backgroundColor: theme.colors.background
}}>

// ❌ Bad
<Text style={{
  fontSize: 16,
  color: theme.colors.secondary,  // Might fail on some backgrounds
  backgroundColor: theme.colors.surface
}}>
```

See [wcag-accessibility.md](./wcag-accessibility.md) for contrast ratios.

---

## 🎨 Typography Patterns

### Lesson Content

```typescript
<View>
  {/* Lesson Number */}
  <Text style={{
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium
  }}>
    LESSON 1
  </Text>

  {/* Lesson Title */}
  <Text style={{
    fontSize: theme.typography['2xl'],
    color: theme.colors.text,
    fontWeight: theme.fontWeight.bold,
    marginTop: 4
  }}>
    Notes on the Treble Clef
  </Text>

  {/* Lesson Description */}
  <Text style={{
    fontSize: theme.typography.base,
    color: theme.colors.text,
    lineHeight: 24,
    marginTop: 12
  }}>
    Learn to identify notes on the treble clef staff.
  </Text>

  {/* Metadata */}
  <Text style={{
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginTop: 8
  }}>
    10 questions · 5 minutes
  </Text>
</View>
```

### Question Display

```typescript
<View>
  {/* Question Number */}
  <Text style={{
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.semibold
  }}>
    QUESTION 3 OF 10
  </Text>

  {/* Question Text */}
  <Text style={{
    fontSize: theme.typography.lg,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    lineHeight: 28,
    marginTop: 8
  }}>
    What note is shown on this staff?
  </Text>
</View>
```

### Badge/Tag Text

```typescript
<Badge>
  <Text style={{
    fontSize: theme.typography.xs,      // 10px
    fontWeight: theme.fontWeight.bold,  // 700
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }}>
    NEW
  </Text>
</Badge>
```

---

## 🚫 Typography Anti-Patterns

### ❌ Don't Mix Too Many Sizes

```typescript
// BAD: Size chaos
<View>
  <Text style={{ fontSize: 28 }}>Title</Text>
  <Text style={{ fontSize: 22 }}>Subtitle</Text>
  <Text style={{ fontSize: 17 }}>Body</Text>
  <Text style={{ fontSize: 13 }}>Caption</Text>
</View>

// GOOD: Clear hierarchy
<View>
  <Text style={{ fontSize: theme.typography['2xl'] }}>Title</Text>
  <Text style={{ fontSize: theme.typography.base }}>Body</Text>
  <Text style={{ fontSize: theme.typography.sm }}>Caption</Text>
</View>
```

### ❌ Don't Hardcode Font Sizes

```typescript
// BAD
<Text style={{ fontSize: 16 }}>Text</Text>

// GOOD
<Text style={{ fontSize: theme.typography.base }}>Text</Text>
```

**Why?**
- Hardcoded values break when scale changes
- Can't adjust globally for accessibility
- Inconsistent spacing across app

### ❌ Don't Use Too Many Weights

```typescript
// BAD: Weight soup
<Text style={{ fontWeight: '300' }}>Light</Text>
<Text style={{ fontWeight: '400' }}>Normal</Text>
<Text style={{ fontWeight: '500' }}>Medium</Text>
<Text style={{ fontWeight: '600' }}>Semibold</Text>
<Text style={{ fontWeight: '700' }}>Bold</Text>
<Text style={{ fontWeight: '800' }}>Extra Bold</Text>

// GOOD: Stick to system
<Text style={{ fontWeight: theme.fontWeight.normal }}>Normal</Text>
<Text style={{ fontWeight: theme.fontWeight.medium }}>Medium</Text>
<Text style={{ fontWeight: theme.fontWeight.bold }}>Bold</Text>
```

### ❌ Don't Ignore Line Height

```typescript
// BAD: Cramped text
<Text style={{
  fontSize: 16,
  // No line height = default (usually 1.0 = 16px)
}}>
  Long paragraph of text that's hard to read because lines are too close together.
</Text>

// GOOD: Comfortable spacing
<Text style={{
  fontSize: 16,
  lineHeight: 24  // 1.5x font size
}}>
  Long paragraph of text that's easy to read with proper line spacing.
</Text>
```

---

## 🛠️ Implementation Reference

### Complete Typography Object

```typescript
// From theme.ts
export const typography = {
  xs: 10,
  sm: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
  '5xl': 52,
  fontFamily: 'SourGummy-Regular'
}

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const
}
```

### Usage in Components

```typescript
import { useTheme } from '@emotion/react'

const MyComponent = () => {
  const theme = useTheme()

  return (
    <Text style={{
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.base,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors.text
    }}>
      Body text
    </Text>
  )
}
```

### Text Component Abstraction

Consider creating reusable text components:

```typescript
// components/Typography/Body.tsx
export const Body = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <Text style={{
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.base,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors.text,
      lineHeight: 24,
      ...props.style
    }} {...props}>
      {children}
    </Text>
  )
}

// Usage
<Body>This is body text with defaults already applied</Body>
```

---

## 📊 Typography Testing Checklist

Before shipping:

- [ ] All text readable at arm's length on phone
- [ ] Headings clearly distinguish from body text
- [ ] No text smaller than 12px
- [ ] Line heights minimum 1.5x font size
- [ ] Button text minimum 16px
- [ ] Contrast ratios pass WCAG AA (4.5:1+)
- [ ] Text scales properly on tablets
- [ ] Works in both light and dark mode
- [ ] No orphans (single words on new lines)
- [ ] Text truncation handles gracefully

---

## 🔮 Future Typography Enhancements

### Planned (Post-Launch)

**Dynamic Type Support (iOS):**
```typescript
// Support iOS accessibility text sizing
import { useAccessibilityInfo } from 'react-native'

const { boldTextEnabled, fontSize } = useAccessibilityInfo()
```

**Variable Font Weights:**
- Currently: 400, 500, 600, 700
- Future: Full variable font with 100-900 range

**Advanced Typography:**
- Ligatures for musical symbols
- Custom kerning for tight spaces
- OpenType features

---

## 📚 Resources

**Font Files:**
- Location: `/assets/fonts/sourGummy/`
- Configured in: `app.json` under `expo.fonts`

**Helper Functions:**
- Font family getter: `/src/utils/fontHelper.ts`
- Device scaling: `/src/hooks/useDevice.ts`

**Design Tokens:**
- Typography scale: `/src/config/theme/theme.ts`
- Usage guide: [design-tokens.md](./design-tokens.md)

---

## 💬 Final Thoughts

Typography is the voice of your interface. Sour Gummy speaks with enthusiasm and warmth—just like we want students to feel about learning music. Every size, every weight, every line height decision is an opportunity to make reading easier, learning clearer, and the experience more delightful.

Choose sizes intentionally. Weight text thoughtfully. Space lines generously.

— Sally, UX Designer ✍️

---

**Last Updated:** 2026-01-30
**Version:** 1.0
**Next Review:** After user testing feedback
