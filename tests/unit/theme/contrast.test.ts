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
        compositeForegroundOnBackground(
          lightTheme.components.input.placeholder,
          lightTheme.components.input.background
        ),
        lightTheme.components.input.background
      )
    ).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.primaryContrast, c.primary)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.errorContrast, c.error)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.successContrast, c.success)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.warningContrast, c.warning)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(
      contrastRatio(c.text, lightTheme.components.settings.sectionBackground)
    ).toBeGreaterThanOrEqual(
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
        compositeForegroundOnBackground(
          darkTheme.components.input.placeholder,
          darkTheme.components.input.background
        ),
        darkTheme.components.input.background
      )
    ).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.primaryContrast, c.primary)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.errorContrast, c.error)).toBeGreaterThanOrEqual(AA_NORMAL)
    expect(contrastRatio(c.successContrast, c.success)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(contrastRatio(c.warningContrast, c.warning)).toBeGreaterThanOrEqual(
      AA_NORMAL
    )
    expect(
      contrastRatio(c.text, darkTheme.components.settings.sectionBackground)
    ).toBeGreaterThanOrEqual(
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
