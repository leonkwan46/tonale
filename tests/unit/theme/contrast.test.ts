import { darkTheme, lightTheme } from '@/config/theme/theme'
import {
    compositeForegroundOnBackground,
    contrastRatio
} from '@/config/theme/tokens/contrast'

const AA_NORMAL = 4.5

describe('theme color contrast (WCAG AA normal text)', () => {
  it('light semantic text on surfaces', () => {
    const c = lightTheme.colors
    expect(contrastRatio(c.text, c.background)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.text, c.surface)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(
      contrastRatio(
        compositeForegroundOnBackground(c.textPlaceholder, c.inputBackground),
        c.inputBackground
      )
    ).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.primaryContrast, c.primary)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.errorContrast, c.error)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.accentContrast, c.accent)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.successContrast, c.success)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.warningContrast, c.warning)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.text, c.settingSection)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
  })

  it('dark semantic text on surfaces', () => {
    const c = darkTheme.colors
    expect(contrastRatio(c.text, c.background)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.text, c.surface)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(
      contrastRatio(
        compositeForegroundOnBackground(c.textPlaceholder, c.inputBackground),
        c.inputBackground
      )
    ).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.primaryContrast, c.primary)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.errorContrast, c.error)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.accentContrast, c.accent)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.successContrast, c.success)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.warningContrast, c.warning)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.text, c.settingSection)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
  })

  it('light button text on fill', () => {
    for (const [, t] of Object.entries(lightTheme.components.button)) {
      expect(contrastRatio(t.text, t.color)).toBeGreaterThanOrEqual(AA_NORMAL)
    }
  })

  it('dark button text on fill', () => {
    for (const [, t] of Object.entries(darkTheme.components.button)) {
      expect(contrastRatio(t.text, t.color)).toBeGreaterThanOrEqual(AA_NORMAL)
    }
  })
})
