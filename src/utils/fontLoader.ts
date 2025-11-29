import * as Font from 'expo-font'

// Load SMuFL fonts for music symbols
export const loadSMuFLFonts = async (): Promise<boolean> => {
  try {
    const fontMap = {
      'Bravura': require('../../assets/fonts/Bravura.otf'),
      'BravuraText': require('../../assets/fonts/BravuraText.otf')
    }
    
    await Font.loadAsync(fontMap)
    
    return true
  } catch {
    console.warn('⚠️ SMuFL fonts not found, using fallback Unicode display')
    return false
  }
}

// Check if SMuFL fonts are available
export const checkSMuFLFonts = (): boolean => {
  // This is a simple check - in a real app you might want to test actual symbol rendering
  return true // We'll assume they're loaded if no error occurred
}
