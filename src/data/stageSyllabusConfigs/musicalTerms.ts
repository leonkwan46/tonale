// Stage One musical terms configuration
export const STAGE_ONE_MUSICAL_TERMS = {
  tempo: {
    'Allegro': 'Fast tempo',
    'Andante': 'Walking pace',
    'Largo': 'Very slow'
  },
  dynamics: {
    'Piano': 'Soft',
    'Forte': 'Loud',
    'Crescendo': 'Gradually getting louder',
    'Diminuendo': 'Gradually getting softer'
  },
  articulation: {
    'Legato': 'Smooth and connected',
    'Staccato': 'Short and detached'
  }
}

// Helper function to get all terms as a flat object
export const getAllStageOneTerms = () => {
  return Object.values(STAGE_ONE_MUSICAL_TERMS).reduce((acc, category) => {
    return { ...acc, ...category }
  }, {})
}

// Helper function to get terms by category
export const getStageOneTermsByCategory = (category: keyof typeof STAGE_ONE_MUSICAL_TERMS) => {
  return STAGE_ONE_MUSICAL_TERMS[category]
}
