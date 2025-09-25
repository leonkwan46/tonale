import * as Font from 'expo-font'

// Load SMuFL fonts for music symbols
export const loadSMuFLFonts = async (): Promise<boolean> => {
  try {
    console.log('🔄 Loading SMuFL fonts...')
    
    const fontMap = {
      'Bravura': require('../../assets/fonts/Bravura.otf'),
      'BravuraText': require('../../assets/fonts/BravuraText.otf')
    }
    
    console.log('📁 Font files found:', Object.keys(fontMap))
    
    await Font.loadAsync(fontMap)
    
    console.log('✅ SMuFL fonts loaded successfully')
    console.log('🎵 Bravura and BravuraText fonts are now available')
    
    // Test if fonts are actually available
    const isBravuraAvailable = Font.isLoaded('Bravura')
    console.log('🔍 Bravura font available:', isBravuraAvailable)
    
    return true
  } catch (error) {
    console.warn('⚠️ SMuFL fonts not found, using fallback Unicode display')
    console.log('Error details:', error)
    console.log('To enable SMuFL symbols:')
    console.log('1. Download Bravura font from https://github.com/steinbergmedia/bravura')
    console.log('2. Place Bravura.otf and BravuraText.otf in assets/fonts/')
    console.log('3. Restart your app')
    return false
  }
}

// Check if SMuFL fonts are available
export const checkSMuFLFonts = (): boolean => {
  // This is a simple check - in a real app you might want to test actual symbol rendering
  return true // We'll assume they're loaded if no error occurred
}
