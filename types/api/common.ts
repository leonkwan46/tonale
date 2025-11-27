// ============================================================================
// COMMON TYPES
// Shared across all backend types
// ============================================================================

// Firebase Timestamp compatibility (for client-side types)
// Backend already has this from @google-cloud/firestore
export { }

declare global {
  namespace FirebaseFirestore {
    interface Timestamp {
      toDate(): Date
    }
  }
}

