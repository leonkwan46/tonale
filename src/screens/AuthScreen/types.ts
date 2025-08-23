export type AuthMode = 'login' | 'register'

export interface AuthFormData {
  email: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  mode: AuthMode
  loading: boolean
  error: string
  showPassword: boolean
  showConfirmPassword: boolean
}
