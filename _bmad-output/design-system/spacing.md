# 📏 Spacing System

**Scale:** 7-step scale (4px base unit)
**Version:** 1.0
**Last Updated:** 2026-01-30

---

## The Philosophy of Space

White space isn't empty—it's breathing room for your brain. Good spacing makes the difference between a cramped, overwhelming interface and one that feels calm and navigable. Every pixel of space in Tonalè is intentional.

---

## 📐 Spacing Scale

| Name | Value | Visual | Use Case |
|------|-------|--------|----------|
| **xs** | 4px | `▪` | Tight spacing between related elements |
| **sm** | 8px | `▪▪` | Compact spacing, icon-text gaps |
| **md** | 16px | `▪▪▪▪` | Default spacing (most common) |
| **lg** | 24px | `▪▪▪▪▪▪` | Generous section spacing |
| **xl** | 32px | `▪▪▪▪▪▪▪▪` | Major section breaks |
| **xxl** | 40px | `▪▪▪▪▪▪▪▪▪▪` | Screen-level spacing |
| **xxxl** | 48px | `▪▪▪▪▪▪▪▪▪▪▪▪` | Hero spacing, large gutters |

### Why 4px Base Unit?

**4px divides evenly:**
- 4, 8, 12, 16, 20, 24, 28, 32, 36, 40...
- Easy mental math
- Aligns perfectly with common screen densities

**8px alternative?**
We chose 4px because it gives us finer control for compact mobile layouts while still maintaining consistency.

---

## 🎯 Usage Guidelines

### Component Internal Spacing

**Buttons:**
```typescript
<Button style={{
  paddingHorizontal: theme.spacing.lg,  // 24px
  paddingVertical: theme.spacing.md,     // 16px
  borderRadius: theme.spacing.sm,        // 8px
}}>
  <Text>Button Text</Text>
</Button>
```

**Cards:**
```typescript
<Card style={{
  padding: theme.spacing.lg,             // 24px all sides
  marginBottom: theme.spacing.md,        // 16px between cards
  borderRadius: theme.spacing.md,        // 16px rounded corners
}}>
  <Content />
</Card>
```

**Input Fields:**
```typescript
<TextInput style={{
  paddingHorizontal: theme.spacing.md,   // 16px
  paddingVertical: theme.spacing.sm,     // 8px
  marginBottom: theme.spacing.md,        // 16px from next element
}} />
```

---

### Layout Spacing

**Screen Padding (Mobile):**
```typescript
<ScreenContainer style={{
  paddingHorizontal: theme.spacing.lg,   // 24px screen edges
  paddingTop: theme.spacing.xl,          // 32px from top
  paddingBottom: theme.spacing.xxl,      // 40px for tab bar
}}>
  <Content />
</ScreenContainer>
```

**Screen Padding (Tablet):**
```typescript
<ScreenContainer style={{
  paddingHorizontal: theme.spacing.xxxl,  // 48px screen edges (more generous)
  paddingTop: theme.spacing.xxl,          // 40px from top
}}>
  <Content />
</ScreenContainer>
```

**Section Spacing:**
```typescript
<View>
  {/* Section 1 */}
  <Section style={{ marginBottom: theme.spacing.xl }}>  {/* 32px between sections */}
    <Heading>Section Title</Heading>
    <Content style={{ marginTop: theme.spacing.sm }} />  {/* 8px title-to-content */}
  </Section>

  {/* Section 2 */}
  <Section>
    <Content />
  </Section>
</View>
```

---

## 🧩 Component-Specific Patterns

### List Items

```typescript
<FlatList
  data={lessons}
  contentContainerStyle={{
    padding: theme.spacing.md,              // 16px list padding
  }}
  ItemSeparatorComponent={() => (
    <View style={{ height: theme.spacing.sm }} />  // 8px between items
  )}
  renderItem={({ item }) => (
    <ListItem style={{
      padding: theme.spacing.md,            // 16px item internal padding
      marginBottom: theme.spacing.sm,       // 8px item spacing
    }}>
      <Text>{item.title}</Text>
    </ListItem>
  )}
/>
```

### Grid Layouts

```typescript
<Grid style={{
  gap: theme.spacing.md,                    // 16px between grid items
  padding: theme.spacing.lg,                // 24px grid edges
}}>
  <GridItem />
  <GridItem />
  <GridItem />
</Grid>
```

### Modal Spacing

```typescript
<Modal>
  <ModalContent style={{
    padding: theme.spacing.xl,              // 32px modal padding
    borderRadius: theme.spacing.lg,         // 24px rounded corners
  }}>
    <ModalHeader style={{
      marginBottom: theme.spacing.lg,       // 24px header-to-body
    }}>
      <Title>Modal Title</Title>
    </ModalHeader>

    <ModalBody style={{
      marginBottom: theme.spacing.lg,       // 24px body-to-footer
    }}>
      <Content />
    </ModalBody>

    <ModalFooter>
      <Button />
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

## 🎨 Spacing Patterns by Context

### Dense Information (Question Screen)

```typescript
<QuestionScreen>
  {/* Tight spacing for compact question display */}
  <QuestionNumber style={{ marginBottom: theme.spacing.xs }} />  {/* 4px */}
  <QuestionText style={{ marginBottom: theme.spacing.md }} />    {/* 16px */}
  <MusicNotation style={{ marginBottom: theme.spacing.lg }} />   {/* 24px */}
  <AnswerOptions style={{ gap: theme.spacing.sm }} />            {/* 8px between options */}
</QuestionScreen>
```

**Why tight spacing?**
Questions need all information visible at once. Generous spacing would require scrolling, breaking concentration.

---

### Relaxed Content (Home Screen)

```typescript
<HomeScreen>
  {/* Generous spacing for browsable content */}
  <Header style={{ marginBottom: theme.spacing.xl }} />          {/* 32px */}
  <StageProgress style={{ marginBottom: theme.spacing.xxl }} />  {/* 40px */}
  <LessonList style={{ gap: theme.spacing.lg }} />               {/* 24px */}
</HomeScreen>
```

**Why generous spacing?**
Home screen is for exploration, not completion. More space = less overwhelming = better browsing experience.

---

### Celebration Moments (Completion Modal)

```typescript
<CompletionModal>
  {/* Extra generous spacing for emotional impact */}
  <StarAnimation style={{ marginBottom: theme.spacing.xxxl }} />  {/* 48px */}
  <ScoreDisplay style={{ marginBottom: theme.spacing.xl }} />     {/* 32px */}
  <Message style={{ marginBottom: theme.spacing.xxl }} />         {/* 40px */}
  <ContinueButton />
</CompletionModal>
```

**Why extra generous?**
Celebration moments should *feel* spacious. Cramped success feels diminished.

---

## 📱 Responsive Spacing

### Device-Based Adjustments

```typescript
import { useDevice } from '@/hooks/useDevice'

const MyComponent = () => {
  const { isTablet } = useDevice()

  return (
    <View style={{
      padding: isTablet ? theme.spacing.xxxl : theme.spacing.lg,
      // Tablets get more padding (48px vs 24px)
    }}>
      <Content />
    </View>
  )
}
```

### Safe Area Spacing

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MyScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{
      paddingTop: insets.top + theme.spacing.md,      // Safe area + 16px
      paddingBottom: insets.bottom + theme.spacing.lg, // Safe area + 24px
      paddingHorizontal: theme.spacing.lg,             // 24px sides
    }}>
      <Content />
    </View>
  )
}
```

**Why add to safe area?**
Safe area keeps content out of notches/corners. Additional spacing makes content feel intentionally placed, not accidentally avoiding edges.

---

## ♿ Accessibility & Touch Targets

### Minimum Touch Target

**44x44px minimum (iOS HIG)**
**48x48px recommended (Material Design)**

```typescript
<TouchableOpacity style={{
  minWidth: 48,
  minHeight: 48,
  padding: theme.spacing.sm,  // Internal padding
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Icon size={24} />
</TouchableOpacity>
```

**Why 48px?**
- Easy to tap even with large fingers
- Reduces mis-taps
- Accessible for users with motor impairments
- Works well at arm's length (phone usage)

### Spacing Between Interactive Elements

```typescript
<View>
  <Button style={{ marginBottom: theme.spacing.sm }} />  {/* 8px minimum */}
  <Button style={{ marginBottom: theme.spacing.sm }} />
  <Button />
</View>
```

**Minimum 8px between buttons:**
- Prevents accidental taps
- Clear visual separation
- Comfortable for all hand sizes

---

## 🚫 Spacing Anti-Patterns

### ❌ Don't Hardcode Spacing

```typescript
// BAD
<View style={{ marginBottom: 16 }}>

// GOOD
<View style={{ marginBottom: theme.spacing.md }}>
```

### ❌ Don't Use Too Many Different Values

```typescript
// BAD: Spacing chaos
<View style={{ marginBottom: 7 }}>
<View style={{ marginBottom: 13 }}>
<View style={{ marginBottom: 19 }}>
<View style={{ marginBottom: 23 }}>

// GOOD: Consistent scale
<View style={{ marginBottom: theme.spacing.sm }}>    // 8px
<View style={{ marginBottom: theme.spacing.md }}>   // 16px
<View style={{ marginBottom: theme.spacing.lg }}>   // 24px
```

### ❌ Don't Ignore Negative Space

```typescript
// BAD: Everything cramped together
<Card style={{ padding: 0 }}>
  <Title>Title</Title>
  <Body>Body</Body>
  <Button>Action</Button>
</Card>

// GOOD: Elements can breathe
<Card style={{ padding: theme.spacing.lg }}>
  <Title style={{ marginBottom: theme.spacing.sm }}>Title</Title>
  <Body style={{ marginBottom: theme.spacing.md }}>Body</Body>
  <Button>Action</Button>
</Card>
```

### ❌ Don't Over-Space

```typescript
// BAD: Too much space breaks relationships
<Form>
  <Label style={{ marginBottom: theme.spacing.xxxl }}>Email</Label>  {/* 48px - too far! */}
  <Input />
</Form>

// GOOD: Related elements stay close
<Form>
  <Label style={{ marginBottom: theme.spacing.xs }}>Email</Label>  {/* 4px - clearly related */}
  <Input />
</Form>
```

---

## 📏 Proximity Principle

**Elements that are related should be close. Elements that are unrelated should be far.**

```typescript
// Name and email are related (same person)
<PersonInfo>
  <Name style={{ marginBottom: theme.spacing.xs }} />   {/* 4px - very related */}
  <Email style={{ marginBottom: theme.spacing.xl }} />  {/* 32px - end of person section */}
</PersonInfo>

// Next person section
<PersonInfo>
  <Name />
  <Email />
</PersonInfo>
```

**Visual grouping through spacing:**
- `xs` (4px): Strongly related (label + input)
- `sm` (8px): Related (list items)
- `md` (16px): Loosely related (section items)
- `lg` (24px): Different concepts (sections)
- `xl+` (32px+): Major breaks (screen sections)

---

## 🎨 Spacing in Practice

### Example: Lesson Card

```typescript
<LessonCard style={{
  padding: theme.spacing.lg,              // 24px card padding
  marginBottom: theme.spacing.md,         // 16px between cards
  borderRadius: theme.spacing.md,         // 16px rounded corners
}}>
  {/* Card Header */}
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,       // 16px header-to-content
    gap: theme.spacing.sm,                // 8px icon-to-text
  }}>
    <Icon name="music" />
    <LessonNumber>Lesson 1</LessonNumber>
  </View>

  {/* Card Content */}
  <LessonTitle style={{
    marginBottom: theme.spacing.xs,       // 4px title-to-description
  }}>
    Notes on the Treble Clef
  </LessonTitle>

  <LessonDescription style={{
    marginBottom: theme.spacing.md,       // 16px description-to-metadata
  }}>
    Learn to identify notes on the staff.
  </LessonDescription>

  {/* Card Footer */}
  <View style={{
    flexDirection: 'row',
    gap: theme.spacing.lg,                // 24px between metadata items
  }}>
    <Duration>5 min</Duration>
    <QuestionCount>10 questions</QuestionCount>
  </View>
</LessonCard>
```

**Spacing decisions explained:**
- **24px card padding**: Generous but not wasteful
- **16px between cards**: Clear separation without gaps
- **16px header-to-content**: Major section break
- **4px title-to-description**: Strongly related text
- **8px icon-to-text**: Comfortable but compact

---

## 🛠️ Implementation Reference

### Spacing Object

```typescript
// From theme.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48
}
```

### Usage in Components

```typescript
import { useTheme } from '@emotion/react'

const MyComponent = () => {
  const theme = useTheme()

  return (
    <View style={{
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    }}>
      <Content />
    </View>
  )
}
```

### Creating Spacer Components

```typescript
// Vertical spacer
export const VSpacer = ({ size = 'md' }) => {
  const theme = useTheme()
  return <View style={{ height: theme.spacing[size] }} />
}

// Horizontal spacer
export const HSpacer = ({ size = 'md' }) => {
  const theme = useTheme()
  return <View style={{ width: theme.spacing[size] }} />
}

// Usage
<View>
  <Text>First item</Text>
  <VSpacer size="lg" />
  <Text>Second item</Text>
</View>
```

---

## 🔮 Future Spacing Enhancements

### Planned (Post-Launch)

**Responsive spacing scale:**
```typescript
// Automatically adjust based on screen size
const spacing = useResponsiveSpacing({
  phone: theme.spacing.md,
  tablet: theme.spacing.lg,
})
```

**Content-aware spacing:**
```typescript
// Adjust spacing based on content density
const spacing = useAdaptiveSpacing({
  contentDensity: 'high',  // Tighter spacing
  contentDensity: 'low',   // More generous
})
```

---

## 📚 Resources

**Design Tokens:**
- Full reference: [design-tokens.md](./design-tokens.md)
- Implementation: `/src/config/theme/theme.ts`

**Related Docs:**
- Typography: [typography.md](./typography.md)
- Colors: [colors.md](./colors.md)
- Components: [components.md](./components.md) (coming soon)

---

## 💭 Final Thoughts

Spacing is invisible design. Users don't consciously notice good spacing—they just feel more comfortable, less stressed, more focused. Bad spacing screams "amateur." Good spacing whispers "professional."

Every pixel of space is a gift to your user's attention. Use it wisely.

— Sally, UX Designer 📏

---

**Last Updated:** 2026-01-30
**Version:** 1.0
**Next Review:** After user testing feedback
