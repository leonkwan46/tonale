# 🎨 Tonalè Design System

**Version:** 1.0
**Last Updated:** 2026-01-30
**Maintained By:** Design Team

---

## Welcome to Tonalè's Design Language

This is where creativity meets consistency. Every color, every spacing value, every typographic choice in Tonalè has been thoughtfully crafted to create an experience that feels both playful and professional—just like learning music should be.

---

## 📚 Documentation Index

### Core Design Foundations

| Document | What's Inside | When to Use |
|----------|---------------|-------------|
| **[UX Audit Report](./ux-audit-report-2026-01-30.md)** | Comprehensive app UX review, user journey analysis, priority fixes | Understanding user pain points and improving experience |
| **[UX Priority Fixes](./ux-priority-fixes.md)** | Top 5 actionable UX improvements with implementation guide | Ready to improve UX? Start here |
| **[UX Content Audit](./ux-content-audit-2026-01-30.md)** | Complete text/microcopy review, clarity issues, style guide | Writing clear, concise app copy |
| **[Colors](./colors.md)** | Complete color palette, usage guidelines, semantic meanings | Choosing colors for new features |
| **[WCAG Accessibility](./wcag-accessibility.md)** | Accessibility audit, contrast ratios, compliance guidelines | Ensuring inclusive design |
| **[Typography](./typography.md)** | Font families, sizes, weights, line heights | Text styling decisions |
| **[Spacing](./spacing.md)** | Spacing scale, layout principles, padding/margin guidelines | Component layout and positioning |
| **[Components](./components.md)** | Component design patterns, states, variations | Building UI components |
| **[Design Tokens](./design-tokens.md)** | Technical reference for all design values | Development implementation |

---

## 🎯 Quick Reference

### Brand Colors (Light Mode)
```
Primary:   #0a7ea4  (Trustworthy teal)
Secondary: #687076  (Neutral grey)
Accent:    #ff6b6b  (Energetic coral)
Success:   #2f9e44  (Encouraging green - WCAG fixed!)
Warning:   #ffd43b  (Attention yellow)
Error:     #e03131  (Alert red - WCAG fixed!)
```

### Spacing Scale
```
xs:   4px   (Tight spacing)
sm:   8px   (Compact spacing)
md:   16px  (Default spacing)
lg:   24px  (Generous spacing)
xl:   32px  (Section spacing)
xxl:  40px  (Major sections)
xxxl: 48px  (Screen sections)
```

### Typography Scale
```
xs:  10px  (Tiny labels)
sm:  12px  (Captions)
base: 16px (Body text)
lg:  20px  (Subheadings)
xl:  24px  (Headings)
2xl: 28px  (Large headings)
3xl: 32px  (Hero text)
4xl: 40px  (Display text)
5xl: 52px  (Extra large display)
```

---

## 🌟 Design Principles

### 1. **Playful but Professional**
Music learning should be fun, but students and parents need to trust the quality. We balance whimsy with credibility through:
- Clean, structured layouts
- Playful 3D button effects
- Serious typography (Sour Gummy - fun but readable)
- Encouraging color palette

### 2. **Mobile-First, Always**
Students practice on their phones, not desktops. Every design decision prioritizes:
- Touch-friendly targets (minimum 44x44px)
- Readable text at arm's length
- One-handed navigation where possible
- Performance over decoration

### 3. **Inclusive by Design**
Music is for everyone. Our design system ensures:
- WCAG AA minimum for all text (AAA preferred)
- Color isn't the only information carrier
- Clear visual hierarchy
- Support for both light and dark modes

### 4. **Progressive Disclosure**
Music theory is complex. We reveal complexity gradually:
- Simple initial states
- Details on demand
- Clear navigation paths
- Consistent patterns reduce cognitive load

---

## 🎨 The Story Behind Our Colors

### Why Teal? (`#0a7ea4`)
Picture a calm ocean—trustworthy, deep, focused. That's our primary color. Music theory can feel overwhelming; teal grounds students with a sense of stability and confidence.

### Why Coral? (`#ff6b6b`)
Energy! Passion! The joy of hitting that perfect note. Coral brings warmth and enthusiasm without the aggression of pure red. It's encouraging, not alarming.

### Why Gold? (`#FFD700`)
When you nail that final test with 100%, you deserve to feel like you've won an Olympic medal. Gold isn't just a color—it's celebration materialized.

---

## 🔄 Theme Modes

Tonalè supports both **light** and **dark** modes, carefully balanced for:

**Light Mode:**
- High contrast for daytime practice
- Energetic, encouraging feel
- Optimized for bright environments

**Dark Mode:**
- Eye comfort for evening practice sessions
- OLED-friendly (saves battery on modern devices)
- Sophisticated, focused atmosphere

All colors are tested for accessibility in **both** modes. See [WCAG Accessibility](./wcag-accessibility.md) for details.

---

## 🛠️ Using This Design System

### For Designers
1. **Start here** - Read this README to understand our principles
2. **Reference [Colors](./colors.md)** when choosing colors for mockups
3. **Check [WCAG](./wcag-accessibility.md)** before finalizing designs
4. **Follow [Components](./components.md)** for consistent patterns

### For Developers
1. **Use [Design Tokens](./design-tokens.md)** as your source of truth
2. Import from `/src/config/theme/` - never hardcode values
3. **Check [WCAG](./wcag-accessibility.md)** when implementing new color combinations
4. Reference [Typography](./typography.md) and [Spacing](./spacing.md) for implementation details

### For Product Managers
1. **Understand our [Design Principles](#-design-principles)** to make informed decisions
2. Reference this system when writing feature specs
3. Use consistent terminology from our component library

---

## 📝 Making Changes

### Adding New Colors
1. Test contrast ratios using [wcag-accessibility.md](./wcag-accessibility.md) guidelines
2. Add to both light and dark themes in `/src/config/theme/Colors.ts`
3. Document semantic meaning in [colors.md](./colors.md)
4. Update this README if it's a brand/primary color

### Adding New Components
1. Design following existing patterns in [components.md](./components.md)
2. Use established spacing from [spacing.md](./spacing.md)
3. Apply typography scale from [typography.md](./typography.md)
4. Test accessibility (focus states, contrast, screen readers)
5. Document the new component pattern

### Updating Spacing/Typography
1. Update `/src/config/theme/theme.ts`
2. Document reasoning in respective doc ([spacing.md](./spacing.md) or [typography.md](./typography.md))
3. Verify no regressions in existing components
4. Update this README's quick reference

---

## 📊 System Health

### Current Status

| Aspect | Status | Notes |
|--------|--------|-------|
| **Color Accessibility** | 🟡 69% WCAG AA | Improvements documented in [WCAG](./wcag-accessibility.md) |
| **Component Library** | ✅ Complete | Core components documented |
| **Typography System** | ✅ Stable | SourGummy font family fully integrated |
| **Spacing System** | ✅ Stable | 7-step scale covers all use cases |
| **Dark Mode** | ✅ 77% Compliant | Better than light mode! |
| **Documentation** | ✅ Complete | Living document, updated regularly |

---

## 🎯 Roadmap

### Immediate (This Sprint)
- [ ] Apply WCAG color fixes from accessibility audit
- [ ] Verify all changes in light + dark mode
- [ ] Update Figma design library (if applicable)

### Short Term (Next 2 Sprints)
- [ ] Create color blindness simulation tests
- [ ] Document animation principles
- [ ] Add component state documentation (hover, active, disabled)

### Long Term (After B2C Launch)
- [ ] Expand for B2B teacher dashboard theme
- [ ] Create branded marketing color palette
- [ ] Develop illustration style guide
- [ ] Icon system documentation

---

## 🤝 Contributing

Have ideas for improving our design system? Here's how to contribute:

1. **Propose Changes**: Create a document describing your proposal and why
2. **Get Feedback**: Discuss with design + dev teams
3. **Update Docs**: Update relevant documentation files
4. **Implement**: Make changes in `/src/config/theme/`
5. **Validate**: Test across light/dark modes, various screen sizes
6. **Ship It**: Merge and celebrate! 🎉

---

## 📞 Questions?

- **Design Questions**: Ask Sally (UX Designer) via `/bmad-agent-bmm-ux-designer`
- **Technical Questions**: Refer to [Codebase Structure Guide](../planning-artifacts/codebase-structure-guide-2026-01-29.md)
- **Accessibility Questions**: See [WCAG Accessibility](./wcag-accessibility.md)

---

## 🎼 A Note from Sally

*Design systems aren't about restricting creativity—they're about channeling it effectively. Every constraint in this system exists to help you build faster, more accessible, more beautiful experiences for students who just want to learn music theory without friction.*

*When in doubt, remember: We're not building for ourselves. We're building for a tired 12-year-old practicing scales at 8pm, or a teacher juggling 25 students. Design with empathy, always.*

— Sally, UX Designer 🎨

---

**Version History:**

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-01-30 | Added UX Content Audit - comprehensive text/microcopy review |
| 1.0 | 2026-01-30 | Initial design system documentation created |

