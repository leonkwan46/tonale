# Tonalè Planning Artifacts

**Last Updated:** 2026-01-29

---

## Overview

This directory contains comprehensive planning and architectural documentation for Tonalè, the ABRSM music theory exam preparation platform.

---

## Quick Navigation

### 🚀 Getting Ready to Launch?
Start here: **[B2C Launch Checklist](./b2c-launch-checklist-2026-01-29.md)**

### 🎨 Want to Improve User Experience?
Read: **[UX Audit Report](../design-system/ux-audit-report-2026-01-30.md)**

### 📁 Where Does This Code Go?
Read: **[Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md)**

### ❓ Have Technical Questions?
Read: **[Technical Concerns Decision Log](./technical-concerns-decision-log-2026-01-29.md)**

### 🏗️ Understanding Architecture?
Read: **[Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md)**

### 📊 Market Research & Strategy?
See: **[Research Directory](./research/)**

### 🎨 Design System & Styling?
See: **[Design System](../design-system/)**

---

## Document Index

### Architecture & Technical

| Document | Purpose | Audience | Status |
|----------|---------|----------|--------|
| [Architecture Assessment B2C v1](./architecture-assessment-b2c-v1-2026-01-29.md) | Comprehensive architecture review for B2C v1.0 launch | Developers, Architects | ✅ Complete |
| [B2C Launch Checklist](./b2c-launch-checklist-2026-01-29.md) | Step-by-step pre-launch checklist with must-fix items | Developers, QA | ✅ Active |
| [Technical Concerns Decision Log](./technical-concerns-decision-log-2026-01-29.md) | Answers to "what if" scenarios (offline, errors, scale, etc.) | Developers, Product | ✅ Active |
| [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md) | Complete folder structure guide - where everything lives and where to add new code | Developers | ✅ Active |

### Market Research & Strategy

| Document | Purpose | Audience | Status |
|----------|---------|----------|--------|
| [Market Research](./research/market-music-theory-edtech-research-2026-01-29.md) | Comprehensive market analysis for UK/Ireland/Malaysia/Singapore | Business, Product | ✅ Complete |
| [B2B Pitch](./research/tonale-b2b-pitch-2026-01-29.md) | Sales pitch for music teachers and schools | Sales, Business Dev | ✅ Complete |
| [B2B Presentation Deck Outline](./research/tonale-b2b-presentation-deck-outline.md) | 22-slide presentation structure with speaker notes | Sales, Marketing | ✅ Complete |
| [B2B Social Media Posts](./research/tonale-b2b-social-media-posts.md) | 14 social media posts for LinkedIn/Facebook/Twitter/Instagram | Marketing | ✅ Complete |
| [One-Pager Pitch](./research/tonale-one-pager-pitch.md) | Print-ready one-page pitch document | Sales, Marketing | ✅ Complete |

---

## Key Decisions Summary

### B2C v1.0 Launch

**✅ Must Fix Before Launch (3 items):**
1. Install Sentry error monitoring (30 min)
2. Update Firestore security rules (5 min)
3. Verify loading states (30 min)

**🟡 Optional Nice-to-Have:**
- Offline persistence (deferred)
- Firebase Analytics (add Week 2)
- Rate limiting (add if costs spike)

**❌ Deferred to B2B Phase:**
- State management refactor (Context is fine for B2C)
- Service layer abstraction
- Multi-tenancy data model
- Feature-based organization

**Verdict:** Architecture is ready for B2C launch after completing 3 must-fix items.

---

### Market Strategy

**Target Markets:**
- UK & Ireland (ABRSM heartland)
- Malaysia & Singapore (high-growth Asia Pacific)

**Pricing:**
- **B2C:** £3.99 one-time or £2.39/month
- **B2B Teachers:** £15.99/month (up to 25 students)
- **B2B Schools:** £159/year per 50-student tier

**Key Differentiators:**
- All-in-one ABRSM Grades 1-3 platform
- Teacher dashboard (competitors lack this)
- Mobile-first design (where students practice)
- Real-time progress tracking

---

## Usage Guide

### For Developers

**Starting Development:**
1. Read [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md) (Understand folder structure)
2. Review [Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md) (Executive Summary)
3. Check [B2C Launch Checklist](./b2c-launch-checklist-2026-01-29.md) (Must-Fix Items)
4. Complete 3 must-fix items
5. Run functional testing checklist
6. Deploy!

**Adding New Code:**
- "Where do I add a new screen?" → [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md) §"Adding a New Feature"
- "Where do question generators live?" → [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md) §"Theory"
- "How do I organize components?" → [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md) §"Decision Tree"

**Technical Questions:**
- "What if user loses connection?" → [Technical Concerns Decision Log](./technical-concerns-decision-log-2026-01-29.md) §1
- "What about rate limiting?" → [Technical Concerns Decision Log](./technical-concerns-decision-log-2026-01-29.md) §4
- "How do we scale?" → [Technical Concerns Decision Log](./technical-concerns-decision-log-2026-01-29.md) §5

**Post-Launch:**
- Week 2: Add Firebase Analytics
- Before B2B: Add automated tests (2-3 weeks)

---

### For Business/Sales

**Preparing Pitch:**
1. Read [B2B Pitch](./research/tonale-b2b-pitch-2026-01-29.md)
2. Use [Presentation Deck Outline](./research/tonale-b2b-presentation-deck-outline.md)
3. Print [One-Pager Pitch](./research/tonale-one-pager-pitch.md)
4. Post [Social Media Content](./research/tonale-b2b-social-media-posts.md)

**Market Context:**
- £5.4B market by 2030 (14.8% CAGR)
- Asia Pacific growing at 17.1%
- Students save £11-19 vs workbooks
- Teachers save 2-3 hours/week

---

### For Product/Strategy

**Understanding Product:**
- [Market Research](./research/market-music-theory-edtech-research-2026-01-29.md) - Customer insights, competitive analysis
- [Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md) - Technical capabilities and limitations

**Making Decisions:**
- "Should we add offline support?" → [Technical Concerns](./technical-concerns-decision-log-2026-01-29.md) §1 (Decision: No, monitor first)
- "When to refactor state management?" → [Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md) §2.1 (Decision: B2B phase)

**Planning B2B:**
- [Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md) §"Future Architecture Considerations (B2B Phase)"
- [B2B Pitch](./research/tonale-b2b-pitch-2026-01-29.md) - Features needed for teachers

---

## Document Lifecycle

### Active Documents
These documents are actively used and should be kept up-to-date:

- **B2C Launch Checklist** - Update checkboxes as tasks complete
- **Technical Concerns Decision Log** - Add new decisions as they're made

### Reference Documents
These documents provide context but don't need frequent updates:

- **Architecture Assessment** - Review when planning B2B
- **Market Research** - Annual refresh (next: 2027-01-29)

### Marketing Collateral
These documents are finalized but may need customization:

- **B2B Pitch** - Customize for specific schools
- **Presentation Deck** - Adapt for different audiences
- **One-Pager** - Personalize for recipients
- **Social Media Posts** - Schedule and post

---

## Version History

| Date | Document | Version | Change |
|------|----------|---------|--------|
| 2026-01-30 | UX Content Audit | 1.0 | Complete text/microcopy review with style guide |
| 2026-01-30 | UX Audit Report | 1.0 | Comprehensive app UX review with priority fixes |
| 2026-01-30 | Design System | 1.0 | Complete design documentation (6 docs) |
| 2026-01-30 | WCAG Analysis Script | 1.0 | Color accessibility audit tool |
| 2026-01-29 | Architecture Assessment | 1.0 | Initial comprehensive assessment |
| 2026-01-29 | B2C Launch Checklist | 1.0 | Pre-launch checklist created |
| 2026-01-29 | Technical Concerns | 1.0 | Decision log for technical concerns |
| 2026-01-29 | Codebase Structure Guide | 1.0 | Complete folder structure documentation |
| 2026-01-29 | Market Research | 1.0 | Comprehensive market analysis |
| 2026-01-29 | B2B Pitch | 1.0 | Sales pitch document |
| 2026-01-29 | Presentation Deck | 1.0 | 22-slide presentation outline |
| 2026-01-29 | Social Media Posts | 1.0 | 14 posts across platforms |
| 2026-01-29 | One-Pager Pitch | 1.0 | Print-ready pitch |

---

## Next Steps by Role

### Developer
- [ ] Complete [B2C Launch Checklist](./b2c-launch-checklist-2026-01-29.md)
- [ ] Deploy to production
- [ ] Week 2: Add Firebase Analytics

### Business/Sales
- [ ] Review [B2B Pitch](./research/tonale-b2b-pitch-2026-01-29.md)
- [ ] Customize [One-Pager](./research/tonale-one-pager-pitch.md)
- [ ] Reach out to music schools

### Product
- [ ] Monitor Sentry for user issues
- [ ] Analyze Firebase Analytics (post-launch)
- [ ] Plan B2B features based on feedback

---

## Contributing

When adding new documents to this directory:

1. **Use descriptive filenames:** `purpose-description-date.md`
2. **Add to this index:** Update the relevant table above
3. **Link related documents:** Cross-reference in "See Also" sections
4. **Set status:** Active, Complete, Archived, Deprecated
5. **Version documents:** Include date in metadata

---

## Questions?

If you're unsure which document to read:

- **Launching soon?** → [B2C Launch Checklist](./b2c-launch-checklist-2026-01-29.md)
- **Where does code go?** → [Codebase Structure Guide](./codebase-structure-guide-2026-01-29.md)
- **Technical decision?** → [Technical Concerns](./technical-concerns-decision-log-2026-01-29.md)
- **Architecture question?** → [Architecture Assessment](./architecture-assessment-b2c-v1-2026-01-29.md)
- **Market/pricing?** → [Market Research](./research/market-music-theory-edtech-research-2026-01-29.md)
- **Pitching to teachers?** → [B2B Pitch](./research/tonale-b2b-pitch-2026-01-29.md)

---

**Document Maintained By:** Leon Kwan
**Last Review:** 2026-01-29
**Next Review:** After B2C launch
