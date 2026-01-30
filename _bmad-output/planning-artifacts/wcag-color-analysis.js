// WCAG Color Contrast Analyzer for Tonalè
// Calculates contrast ratios and checks WCAG compliance

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function checkWCAG(ratio, isLargeText = false) {
  const aa_normal = 4.5;
  const aa_large = 3.0;
  const aaa_normal = 7.0;
  const aaa_large = 4.5;

  if (isLargeText) {
    if (ratio >= aaa_large) return 'AAA ✅✅✅';
    if (ratio >= aa_large) return 'AA ✅';
    return 'FAIL ❌';
  } else {
    if (ratio >= aaa_normal) return 'AAA ✅✅✅';
    if (ratio >= aa_normal) return 'AA ✅';
    return 'FAIL ❌';
  }
}

// Light Mode Colors
const lightMode = {
  text: '#11181C',
  background: '#ffffff',
  primary: '#0a7ea4',
  secondary: '#687076',
  accent: '#ff6b6b',
  success: '#51cf66',
  warning: '#ffd43b',
  error: '#ff6b6b',
  surface: '#f8f9fa',
  border: '#868e96',
  textSecondary: '#687076',
  icon: '#687076',
  stageCleared: '#4CAF50',
  stagePerfect: '#FFD700',
  revisionIconText: '#000',
  revisionIconBg: '#F58970',
  flameActive: '#FF6B35',
  cardCompleted: '#2a8a3a',
  cardLocked: '#0a3a4a',
  buttonDepth: '#156382'
};

// Dark Mode Colors
const darkMode = {
  text: '#ECEDEE',
  background: '#151718',
  primary: '#4dabf7',
  secondary: '#9BA1A6',
  accent: '#ff8787',
  success: '#69db7c',
  warning: '#ffe066',
  error: '#ff8787',
  surface: '#1f2937',
  border: '#374151',
  textSecondary: '#9BA1A6',
  icon: '#9BA1A6',
  stageCleared: '#2E7D32',
  stagePerfect: '#B8860B',
  revisionIconText: '#ECEDEE',
  revisionIconBg: '#F58970',
  flameActive: '#FF6B35',
  cardCompleted: '#2a8a3a',
  cardLocked: '#0a3a4a',
  buttonDepth: '#156382'
};

console.log('\n🎨 TONALÈ WCAG COLOR ACCESSIBILITY AUDIT\n');
console.log('=' .repeat(80));

// LIGHT MODE ANALYSIS
console.log('\n📱 LIGHT MODE ANALYSIS\n');
console.log('-'.repeat(80));

const lightTests = [
  { name: 'Body text on background', fg: lightMode.text, bg: lightMode.background, size: 'normal' },
  { name: 'Secondary text on background', fg: lightMode.textSecondary, bg: lightMode.background, size: 'normal' },
  { name: 'Primary button text', fg: '#ffffff', bg: lightMode.primary, size: 'normal' },
  { name: 'Success button text', fg: '#ffffff', bg: lightMode.success, size: 'normal' },
  { name: 'Warning button text', fg: '#000000', bg: lightMode.warning, size: 'normal' },
  { name: 'Error button text', fg: '#ffffff', bg: lightMode.error, size: 'normal' },
  { name: 'Icon on background', fg: lightMode.icon, bg: lightMode.background, size: 'large' },
  { name: 'Stage cleared badge', fg: '#ffffff', bg: lightMode.stageCleared, size: 'large' },
  { name: 'Stage perfect badge text', fg: '#000000', bg: lightMode.stagePerfect, size: 'large' },
  { name: 'Revision icon text', fg: lightMode.revisionIconText, bg: lightMode.revisionIconBg, size: 'large' },
  { name: 'Text on surface', fg: lightMode.text, bg: lightMode.surface, size: 'normal' },
  { name: 'Border on background', fg: lightMode.border, bg: lightMode.background, size: 'large' },
  { name: 'Flame active on surface', fg: lightMode.flameActive, bg: lightMode.surface, size: 'large' },
];

lightTests.forEach(test => {
  const ratio = getContrastRatio(test.fg, test.bg);
  if (ratio === null) {
    console.log(`${test.name.padEnd(35)} | ERROR: Invalid color`);
    return;
  }
  const wcag = checkWCAG(ratio, test.size === 'large');
  console.log(`${test.name.padEnd(35)} | ${ratio.toFixed(2)}:1 | ${wcag}`);
});

// DARK MODE ANALYSIS
console.log('\n' + '='.repeat(80));
console.log('\n🌙 DARK MODE ANALYSIS\n');
console.log('-'.repeat(80));

const darkTests = [
  { name: 'Body text on background', fg: darkMode.text, bg: darkMode.background, size: 'normal' },
  { name: 'Secondary text on background', fg: darkMode.textSecondary, bg: darkMode.background, size: 'normal' },
  { name: 'Primary button text', fg: '#ffffff', bg: darkMode.primary, size: 'normal' },
  { name: 'Success button text', fg: '#000000', bg: darkMode.success, size: 'normal' },
  { name: 'Warning button text', fg: '#000000', bg: darkMode.warning, size: 'normal' },
  { name: 'Error button text', fg: '#000000', bg: darkMode.error, size: 'normal' },
  { name: 'Icon on background', fg: darkMode.icon, bg: darkMode.background, size: 'large' },
  { name: 'Stage cleared badge', fg: '#ffffff', bg: darkMode.stageCleared, size: 'large' },
  { name: 'Stage perfect badge text', fg: '#000000', bg: darkMode.stagePerfect, size: 'large' },
  { name: 'Revision icon text', fg: darkMode.revisionIconText, bg: darkMode.revisionIconBg, size: 'large' },
  { name: 'Text on surface', fg: darkMode.text, bg: darkMode.surface, size: 'normal' },
  { name: 'Border on background', fg: darkMode.border, bg: darkMode.background, size: 'large' },
  { name: 'Flame active on surface', fg: darkMode.flameActive, bg: darkMode.surface, size: 'large' },
];

darkTests.forEach(test => {
  const ratio = getContrastRatio(test.fg, test.bg);
  if (ratio === null) {
    console.log(`${test.name.padEnd(35)} | ERROR: Invalid color`);
    return;
  }
  const wcag = checkWCAG(ratio, test.size === 'large');
  console.log(`${test.name.padEnd(35)} | ${ratio.toFixed(2)}:1 | ${wcag}`);
});

console.log('\n' + '='.repeat(80));
console.log('\n📊 WCAG STANDARDS:\n');
console.log('  Normal text (< 18pt):  AA = 4.5:1  |  AAA = 7:1');
console.log('  Large text (≥ 18pt):   AA = 3:1    |  AAA = 4.5:1');
console.log('  Interactive elements:  AA = 3:1 minimum');
console.log('\n' + '='.repeat(80));
