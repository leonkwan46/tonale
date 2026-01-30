# 🎨 Tonalè Color System

**Version:** 1.0 (WCAG-Compliant)
**Last Updated:** 2026-01-30

---

## Philosophy: Colors Tell Stories

Colors aren't just decoration—they're emotional storytellers. Every hue in Tonalè was chosen to evoke specific feelings and guide user behavior. This document explains not just *what* our colors are, but *why* they exist and *when* to use them.

---

## 🌈 Complete Color Palette

### Light Mode

#### Core Brand Colors

| Color Name | Hex | Preview | Semantic Meaning | When to Use |
|------------|-----|---------|------------------|-------------|
| **Primary** | `#0a7ea4` | ![#0a7ea4](https://via.placeholder.com/60x30/0a7ea4/0a7ea4.png) | Trust, Focus, Calm | Primary buttons, links, active states |
| **Secondary** | `#687076` | ![#687076](https://via.placeholder.com/60x30/687076/687076.png) | Neutral, Supportive | Secondary text, icons, disabled states |
| **Accent** | `#ff6b6b` | ![#ff6b6b](https://via.placeholder.com/60x30/ff6b6b/ff6b6b.png) | Energy, Attention, Passion | Accent buttons, highlights, calls-to-action |

#### Semantic State Colors

| Color Name | Hex | Preview | Meaning | Usage Example |
|------------|-----|---------|---------|---------------|
| **Success** | `#2f9e44` | ![#2f9e44](https://via.placeholder.com/60x30/2f9e44/2f9e44.png) | Correct, Achievement, Progress | Correct answer feedback, completion badges |
| **Warning** | `#ffd43b` | ![#ffd43b](https://via.placeholder.com/60x30/ffd43b/ffd43b.png) | Caution, Attention, Review | Warnings, hints, needs attention |
| **Error** | `#e03131` | ![#e03131](https://via.placeholder.com/60x30/e03131/e03131.png) | Incorrect, Alert, Critical | Wrong answers, errors, critical messages |

#### Surface Colors

| Color Name | Hex | Preview | Purpose |
|------------|-----|---------|---------|
| **Text** | `#11181C` | ![#11181C](https://via.placeholder.com/60x30/11181C/11181C.png) | Primary text |
| **Text Secondary** | `#687076` | ![#687076](https://via.placeholder.com/60x30/687076/687076.png) | Supporting text, captions |
| **Background** | `#ffffff` | ![#ffffff](https://via.placeholder.com/60x30/ffffff/000000.png) | Main background |
| **Surface** | `#f8f9fa` | ![#f8f9fa](https://via.placeholder.com/60x30/f8f9fa/f8f9fa.png) | Cards, elevated surfaces |
| **Border** | `#868e96` | ![#868e96](https://via.placeholder.com/60x30/868e96/868e96.png) | Dividers, outlines |

#### Special Purpose Colors

| Color Name | Hex | Purpose | Usage |
|------------|-----|---------|-------|
| **Stage Cleared** | `#2e7d32` | ![#2e7d32](https://via.placeholder.com/60x30/2e7d32/2e7d32.png) | Stage completion badge |
| **Stage Perfect** | `#FFD700` | ![#FFD700](https://via.placeholder.com/60x30/FFD700/FFD700.png) | Perfect score celebration |
| **Flame Active** | `#d84315` | ![#d84315](https://via.placeholder.com/60x30/d84315/d84315.png) | Active practice streak |
| **Flame Upcoming** | `#FF8C42` | ![#FF8C42](https://via.placeholder.com/60x30/FF8C42/FF8C42.png) | Streak in progress |
| **Flame Empty** | `#FFA07A` | ![#FFA07A](https://via.placeholder.com/60x30/FFA07A/FFA07A.png) | Streak placeholder |

---

### Dark Mode

#### Core Brand Colors

| Color Name | Hex | Preview | Changes from Light |
|------------|-----|---------|-------------------|
| **Primary** | `#1c7ed6` | ![#1c7ed6](https://via.placeholder.com/60x30/1c7ed6/1c7ed6.png) | Slightly darker for contrast |
| **Secondary** | `#9BA1A6` | ![#9BA1A6](https://via.placeholder.com/60x30/9BA1A6/9BA1A6.png) | Lighter for dark backgrounds |
| **Accent** | `#ff8787` | ![#ff8787](https://via.placeholder.com/60x30/ff8787/ff8787.png) | Softer, less intense |

#### Semantic State Colors

| Color Name | Hex | Preview | Notes |
|------------|-----|---------|-------|
| **Success** | `#69db7c` | ![#69db7c](https://via.placeholder.com/60x30/69db7c/69db7c.png) | Brighter for dark backgrounds |
| **Warning** | `#ffe066` | ![#ffe066](https://via.placeholder.com/60x30/ffe066/ffe066.png) | Slightly lighter |
| **Error** | `#ff8787` | ![#ff8787](https://via.placeholder.com/60x30/ff8787/ff8787.png) | Softer red, less alarming |

#### Surface Colors

| Color Name | Hex | Preview | Purpose |
|------------|-----|---------|---------|
| **Text** | `#ECEDEE` | ![#ECEDEE](https://via.placeholder.com/60x30/ECEDEE/ECEDEE.png) | Primary text (light on dark) |
| **Text Secondary** | `#9BA1A6` | ![#9BA1A6](https://via.placeholder.com/60x30/9BA1A6/9BA1A6.png) | Supporting text |
| **Background** | `#151718` | ![#151718](https://via.placeholder.com/60x30/151718/151718.png) | Main background (true dark) |
| **Surface** | `#1f2937` | ![#1f2937](https://via.placeholder.com/60x30/1f2937/1f2937.png) | Cards, elevated surfaces |
| **Border** | `#4b5563` | ![#4b5563](https://via.placeholder.com/60x30/4b5563/4b5563.png) | Dividers (lighter for visibility) |

---

## 🎯 Semantic Color Usage

### Success States

**Emotional Goal:** Celebration, Encouragement, Achievement

**Light Mode:** `#2f9e44` (Deep, rich green)
**Dark Mode:** `#69db7c` (Bright, cheerful green)

**Usage Guidelines:**
```typescript
// ✅ Correct Usage
<Button backgroundColor={theme.colors.success}>Continue</Button>
<Badge color={theme.colors.success}>Lesson Complete!</Badge>
<Icon name="check" color={theme.colors.success} />

// ❌ Don't Use For
<Text color={theme.colors.success}>Body text</Text>  // Too vibrant
<Background color={theme.colors.success} />  // Overwhelming
```

**Real-World Example:**
> When a student gets 10/10 on a lesson, the completion modal shows a big green checkmark. That green says: "You did it! You should feel proud!" It's not just information—it's emotional validation.

---

### Error States

**Emotional Goal:** Clear feedback without shame

**Light Mode:** `#e03131` (Warm, assertive red)
**Dark Mode:** `#ff8787` (Softer, encouraging red)

**Usage Guidelines:**
```typescript
// ✅ Correct Usage
<Button backgroundColor={theme.colors.error}>Try Again</Button>
<Text color={theme.colors.error}>Incorrect. The answer is C major.</Text>
<Icon name="x" color={theme.colors.error} />

// ❌ Don't Use For
<Background color={theme.colors.error} />  // Too alarming
<Header color={theme.colors.error} />  // Communicates danger, not hierarchy
```

**Psychological Note:**
Red can trigger anxiety. We use it sparingly and always pair it with:
1. Helpful feedback ("The correct answer is...")
2. Clear next steps ("Try again" button)
3. Encouraging tone (never punitive)

---

### Warning States

**Emotional Goal:** Attention without alarm

**Light Mode:** `#ffd43b` (Warm yellow)
**Dark Mode:** `#ffe066` (Soft yellow)

**Usage Guidelines:**
```typescript
// ✅ Correct Usage
<Banner backgroundColor={theme.colors.warning}>Hint: Check the key signature</Banner>
<Badge color={theme.colors.warning}>Review Recommended</Badge>

// ❌ Don't Use For
<PrimaryButton backgroundColor={theme.colors.warning} />  // Poor contrast with white text
<Text color={theme.colors.warning}>Large body text</Text>  // Hard to read
```

**When to Choose Warning vs. Error:**
- **Warning:** Preventative, helpful ("You might want to review this")
- **Error:** Reactive, corrective ("This answer is incorrect")

---

### Primary Actions

**Emotional Goal:** Trust, confidence, focus

**Light Mode:** `#0a7ea4` (Ocean teal)
**Dark Mode:** `#1c7ed6` (Bright teal-blue)

**Usage Guidelines:**
```typescript
// ✅ Correct Usage
<Button variant="primary">Start Lesson</Button>
<Link color={theme.colors.primary}>Learn more</Link>
<TabBar activeColor={theme.colors.primary} />

// ❌ Don't Use For
<Background color={theme.colors.primary} />  // Overwhelming
<Error message with primary color />  // Wrong semantic meaning
```

**Brand Story:**
Teal represents calm focus—like a student in flow state, completely absorbed in learning. It's trustworthy (like deep water) but approachable (not stark like navy).

---

## 🎨 Component-Specific Color Patterns

### Button Color Logic

```typescript
type ButtonVariant = 'primary' | 'success' | 'error' | 'warning' | 'secondary'

// Button text color logic
const getButtonTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return '#ffffff'  // White on teal: 4.63:1 ✅
    case 'success':
      return '#ffffff'  // White on dark green: 4.79:1 ✅
    case 'error':
      return '#ffffff'  // White on dark red: 5.12:1 ✅
    case 'warning':
      return '#000000'  // Black on yellow: 14.73:1 ✅
    case 'secondary':
      return theme.colors.text  // Matches current theme
  }
}
```

### Badge Color System

**Achievement Badges:**
```typescript
const badgeColors = {
  cleared: theme.colors.stageCleared,    // Green
  perfect: theme.colors.stagePerfect,    // Gold
  inProgress: theme.colors.warning,      // Yellow
  locked: theme.colors.secondary,        // Grey
}
```

**Usage Example:**
```tsx
<Badge
  color={badgeColors.perfect}
  icon="star"
  text="Perfect Score!"
/>
```

---

## 🔄 Theme Switching

### How Dark Mode Works

Tonalè automatically switches based on system preference:

```typescript
// In AppThemeProvider
const colorScheme = useColorScheme()  // 'light' | 'dark'
const theme = colorScheme === 'dark' ? darkTheme : lightTheme
```

### Color Adjustments in Dark Mode

| Adjustment Type | Light → Dark | Reason |
|----------------|--------------|--------|
| **Primary Blue** | Darker → Brighter | Needs more luminance against dark background |
| **Error Red** | Intense → Softer | Less jarring for night use |
| **Surface** | Near-white → Near-black | Eye comfort, OLED efficiency |
| **Borders** | Medium → Lighter | Visibility on dark backgrounds |
| **Text** | Dark → Light | Inverted for readability |

---

## 📐 Gradient Usage

### Home Screen Gradients

```typescript
// Light mode: Sky gradient (uplifting morning vibe)
homeScreen.gradient.light: ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713']

// Dark mode: Twilight gradient (calm evening vibe)
homeScreen.gradient.dark: ['#2E3237', '#1E252B', '#1A1E22', '#331009']
```

**When to Use Gradients:**
- Large hero sections (home screen)
- Celebration modals (lesson complete)
- Premium features (B2B upsells)

**When NOT to Use:**
- Body text areas (reduces readability)
- Interactive elements (complicates hover states)
- Small UI components (adds visual noise)

---

## ♿ Accessibility Color Matrix

### Text on Background Combinations

| Text Color | Background | Ratio | WCAG | Use Case |
|-----------|------------|-------|------|----------|
| `#11181C` | `#ffffff` | 17.93:1 | AAA ✅ | Body text (light mode) |
| `#ECEDEE` | `#151718` | 15.34:1 | AAA ✅ | Body text (dark mode) |
| `#687076` | `#ffffff` | 5.04:1 | AA ✅ | Secondary text (light) |
| `#9BA1A6` | `#151718` | 6.89:1 | AA ✅ | Secondary text (dark) |

### Button Combinations

| Button BG | Text Color | Ratio | WCAG | Notes |
|-----------|------------|-------|------|-------|
| `#2f9e44` | `#ffffff` | 4.79:1 | AA ✅ | Success button (fixed!) |
| `#e03131` | `#ffffff` | 5.12:1 | AA ✅ | Error button (fixed!) |
| `#ffd43b` | `#000000` | 14.73:1 | AAA ✅ | Warning button |
| `#1c7ed6` | `#ffffff` | 4.82:1 | AA ✅ | Primary button dark mode (fixed!) |

See [wcag-accessibility.md](./wcag-accessibility.md) for complete audit.

---

## 🛠️ Implementation Guide

### Using Colors in Components

```typescript
import { useTheme } from '@emotion/react'

const MyComponent = () => {
  const theme = useTheme()

  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <Text style={{ color: theme.colors.text }}>
        Primary text
      </Text>
      <Text style={{ color: theme.colors.textSecondary }}>
        Secondary caption
      </Text>
      <Button backgroundColor={theme.colors.primary}>
        Call to Action
      </Button>
    </View>
  )
}
```

### Adding New Colors

**Step 1:** Add to `Colors.ts`
```typescript
export const Colors = {
  light: {
    // ... existing colors ...
    newFeature: '#hexcode',
  },
  dark: {
    // ... existing colors ...
    newFeature: '#hexcode',  // Dark mode variant
  }
}
```

**Step 2:** Add to theme
```typescript
// theme.ts
export const lightTheme = {
  colors: {
    // ... existing colors ...
    newFeature: Colors.light.newFeature,
  }
}
```

**Step 3:** Test accessibility
```bash
node _bmad-output/planning-artifacts/wcag-color-analysis.js
```

**Step 4:** Document in this file
Add new color to appropriate section with:
- Semantic meaning
- Usage guidelines
- Emotional intent
- Real-world example

---

## 🎭 Color Psychology

### Why These Colors?

**Teal Primary (`#0a7ea4`):**
> *Imagine diving into clear ocean water—that's the feeling we want. Focused, calm, trustworthy. Music theory can be intimidating; teal says "You're safe here, take your time."*

**Coral Accent (`#ff6b6b`):**
> *Think of a vibrant sunset or a musician's passionate performance. Coral is warm without being aggressive, exciting without being alarming. It says "Let's go!" not "Danger!"*

**Gold Perfect (`#FFD700`):**
> *When you see gold, you think Olympics, trophies, excellence. That's exactly how students should feel getting a perfect score—like champions.*

**Deep Green Success (`#2f9e44`):**
> *Fresh grass, growing plants, thriving life. Green naturally means "correct" to most humans. We chose a deep, rich green that feels earned, not cheap.*

**Warm Red Error (`#e03131`):**
> *Red alerts us, but it shouldn't shame us. This red is warm (orange undertones) rather than cold. It's a friendly coach saying "Not quite, try again" rather than a stern teacher scolding.*

---

## 🚫 Anti-Patterns (What NOT to Do)

### ❌ Don't Mix Semantic Meanings

```typescript
// BAD: Using success color for deletion
<Button
  backgroundColor={theme.colors.success}
  onPress={deleteAccount}
>
  Delete Account
</Button>

// GOOD: Use error color for destructive actions
<Button
  backgroundColor={theme.colors.error}
  onPress={deleteAccount}
>
  Delete Account
</Button>
```

### ❌ Don't Ignore Theme Context

```typescript
// BAD: Hardcoded color (breaks dark mode)
<Text style={{ color: '#11181C' }}>Text</Text>

// GOOD: Use theme
<Text style={{ color: theme.colors.text }}>Text</Text>
```

### ❌ Don't Use Too Many Colors

```typescript
// BAD: Rainbow explosion
<Card>
  <Title color="#ff0000">Title</Title>
  <Subtitle color="#00ff00">Subtitle</Subtitle>
  <Body color="#0000ff">Body</Body>
  <Footer color="#ff00ff">Footer</Footer>
</Card>

// GOOD: Semantic hierarchy
<Card>
  <Title color={theme.colors.text}>Title</Title>
  <Subtitle color={theme.colors.textSecondary}>Subtitle</Subtitle>
  <Body color={theme.colors.text}>Body</Body>
  <Footer color={theme.colors.textSecondary}>Footer</Footer>
</Card>
```

### ❌ Don't Assume Contrast

```typescript
// BAD: Untested color combination
<Button backgroundColor="#abc123" textColor="#def456" />

// GOOD: Test first, then use
// 1. Run WCAG analyzer
// 2. Verify 4.5:1+ ratio
// 3. Add to theme with documentation
```

---

## 📝 Color Naming Conventions

### Semantic Names (Preferred)
```typescript
theme.colors.primary      // ✅ Describes purpose
theme.colors.success      // ✅ Describes meaning
theme.colors.textSecondary  // ✅ Describes usage
```

### Color Names (Avoid)
```typescript
theme.colors.teal         // ❌ Describes appearance (implementation detail)
theme.colors.lightGreen   // ❌ Not semantic
theme.colors.red500       // ❌ Too abstract
```

**Why semantic naming?**
If you decide to change primary from teal to blue, semantic names don't need updating. Color names would require find-and-replace across the entire codebase.

---

## 🔮 Future Color System

### Planned Enhancements (Post-Launch)

**Phase 1: B2B Teacher Dashboard**
- Teacher-specific color variants
- School branding customization
- Professional palette (more muted)

**Phase 2: Personalization**
- User-selectable accent colors
- High contrast mode
- Color blind-friendly palettes

**Phase 3: Advanced**
- Seasonal themes (winter, summer)
- Achievement-based unlockable themes
- Cultural color preferences (Asia vs. Western)

---

## 📞 Questions?

**Color Choice Questions:**
- "Can I add a new color?" → Add to Colors.ts, test WCAG, document here
- "Which color for XYZ?" → Refer to semantic usage section
- "Why is this color failing WCAG?" → Check [wcag-accessibility.md](./wcag-accessibility.md)

**Technical Questions:**
- How to use theme? → See implementation guide above
- Where are colors defined? → `/src/config/theme/Colors.ts`
- How to test contrast? → Run `node wcag-color-analysis.js`

---

## 💖 Final Thoughts

Colors aren't just pixels—they're how we make students *feel*. Every time someone opens Tonalè and sees that calm teal, we're saying "You're safe here, learning is good." Every green checkmark is a high-five. Every gold badge is a celebration.

Choose colors with empathy. Test them with rigor. Use them with intention.

— Sally, UX Designer 🎨

---

**Last Updated:** 2026-01-30
**Version:** 1.0 (Post-WCAG Fixes)
**Next Review:** After user feedback collection
