export { }

declare global {
  namespace FirebaseFirestore {
    interface Timestamp {
      toDate(): Date
    }
  }
}

