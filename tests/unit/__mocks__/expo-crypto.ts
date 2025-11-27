// Mock for expo-crypto package
let counter = 0

export const randomUUID = (): string => {
  counter++
  return `mock-uuid-${counter}-${Date.now()}`
}

