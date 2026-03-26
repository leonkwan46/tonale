const NAMED_COLORS: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  transparent: '#000000'
}

const parseHexChannel = (s: string): number => parseInt(s, 16) / 255

export const hexToRgb01 = (hex: string): [number, number, number] => {
  let h = hex.trim().toLowerCase()
  if (h.startsWith('#')) h = h.slice(1)
  if (NAMED_COLORS[h]) return hexToRgb01(NAMED_COLORS[h])
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  if (h.length === 8) h = h.slice(0, 6)
  if (h.length !== 6) {
    throw new Error(`Unsupported color for contrast: ${hex}`)
  }
  return [
    parseHexChannel(h.slice(0, 2)),
    parseHexChannel(h.slice(2, 4)),
    parseHexChannel(h.slice(4, 6))
  ]
}

const luminance = ([r, g, b]: [number, number, number]): number => {
  const lin = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
}

const rgb01To255 = ([r, g, b]: [number, number, number]): [number, number, number] =>
  [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]

const channelToHex = (n: number): string =>
  Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')

export const compositeForegroundOnBackground = (
  foreground: string,
  backgroundHex: string
): string => {
  const m = foreground
    .trim()
    .match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/)
  if (!m) return foreground

  const fr = parseInt(m[1], 10)
  const fg = parseInt(m[2], 10)
  const fb = parseInt(m[3], 10)
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  const [br, bg, bb] = rgb01To255(hexToRgb01(backgroundHex))
  const outR = fr * a + br * (1 - a)
  const outG = fg * a + bg * (1 - a)
  const outB = fb * a + bb * (1 - a)
  return `#${channelToHex(outR)}${channelToHex(outG)}${channelToHex(outB)}`
}

export const contrastRatio = (fg: string, bg: string): number => {
  const l1 = luminance(hexToRgb01(fg))
  const l2 = luminance(hexToRgb01(bg))
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export const assertContrastInDev = (
  fg: string,
  bg: string,
  minRatio: number,
  label: string
): void => {
  if (typeof __DEV__ === 'undefined' || !__DEV__) return
  try {
    const r = contrastRatio(fg, bg)
    if (r < minRatio) {
      console.warn(
        `[a11y] ${label}: contrast ${r.toFixed(2)}:1 < ${minRatio}:1 (${fg} on ${bg})`
      )
    }
  } catch {}
}
