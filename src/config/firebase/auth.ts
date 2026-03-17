import {
  applyActionCode,
  confirmPasswordReset,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode
} from 'firebase/auth'
import type { ActionCodeSettings, User } from 'firebase/auth'

import { auth } from './firebase'

// HTTPS URL from authorized domain (required by Firebase API)
// Note: To bypass Firebase's default page, configure Action URL in Firebase Console:
// Authentication → Email Templates → Password Reset → Set to: https://tonale.firebaseapp.com/auth-action
export const ACTION_URL = process.env.EXPO_PUBLIC_AUTH_ACTION_URL!

const withMode = (baseUrl: string, mode: string): string => {
  const url = new URL(baseUrl)
  url.searchParams.set('mode', mode)
  return url.toString()
}

const actionCodeSettings: ActionCodeSettings = {
  url: ACTION_URL,
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.leonkwan46.tonale'
  },
  android: {
    packageName: 'com.leonkwan46.tonale',
    installApp: true,
    minimumVersion: '1'
  }
}

const requireCurrentUser = (): User => {
  const user = auth.currentUser
  if (!user) throw new Error('No user is currently signed in')
  return user
}

const requireCurrentUserWithEmail = (): User & { email: string } => {
  const user = requireCurrentUser()
  if (!user.email) throw new Error('User does not have an email address')
  return user as User & { email: string }
}

// ============================================================================
// EMAIL ACTIONS
// ============================================================================

export const sendEmailVerificationToUser = async () => {
  const user = requireCurrentUserWithEmail()
  await sendEmailVerification(user, {
    ...actionCodeSettings,
    url: withMode(ACTION_URL, 'verifyEmail')
  })
}

/** Send password reset email. Pass an email for forgot-password (e.g. login); omit to use the current user's email. */
export const sendPasswordResetEmailToUser = async (email?: string) => {
  const to = email ?? requireCurrentUserWithEmail().email
  await sendPasswordResetEmail(auth, to, {
    ...actionCodeSettings,
    url: withMode(ACTION_URL, 'resetPassword')
  })
}

// ============================================================================
// AUTH ACTION CODE HANDLERS
// ============================================================================

export const applyActionCodeToUser = async (code: string) => {
  await applyActionCode(auth, code)
}

export const verifyPasswordResetCodeForUser = async (code: string): Promise<string> => {
  return await verifyPasswordResetCode(auth, code)
}

export const confirmPasswordResetForUser = async (code: string, newPassword: string) => {
  await confirmPasswordReset(auth, code, newPassword)
}

// ============================================================================
// ACCOUNT UPDATES
// ============================================================================

export const reauthenticateUser = async (password: string) => {
  const user = requireCurrentUserWithEmail()
  const credential = EmailAuthProvider.credential(user.email, password)
  await reauthenticateWithCredential(user, credential)
}

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = requireCurrentUser()
  await reauthenticateUser(currentPassword)
  await updatePassword(user, newPassword)
}

export const updateUserEmailAddress = async (currentPassword: string, newEmail: string) => {
  const user = requireCurrentUser()
  await reauthenticateUser(currentPassword)
  await verifyBeforeUpdateEmail(user, newEmail, {
    url: withMode(ACTION_URL, 'verifyAndChangeEmail'),
    handleCodeInApp: false
  })
}

export const updateUserDisplayName = async (displayName: string) => {
  const user = requireCurrentUser()
  await updateProfile(user, { displayName })
}

// ============================================================================
// SESSION
// ============================================================================

export const signOutUser = async () => {
  await signOut(auth)
}

export const deleteUserAccount = async () => {
  const user = requireCurrentUser()
  await deleteUser(user)
}
