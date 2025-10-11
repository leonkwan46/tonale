// User profile data model
export interface UserProfile {
  email: string
  progress?: Record<string, unknown>
  createdAt?: unknown
  updatedAt?: unknown
}

// Response types for user data operations
export interface UserDataSuccessResponse {
  success: boolean
  message: string
}

export interface GetUserDataResponse {
  success: boolean
  data: UserProfile
}

