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
  verifyPasswordResetCode
} from 'firebase/auth'

import { auth } from './firebase'

// HTTPS URL from authorized domain (required by Firebase API)
// Note: To bypass Firebase's default page, configure Action URL in Firebase Console:
// Authentication → Email Templates → Password Reset → Set to: https://tonale.firebaseapp.com/auth-action
export const ACTION_URL = process.env.EXPO_PUBLIC_AUTH_ACTION_URL!

/**
 * Send email verification to the current user
 * Opens app directly via deep link (handleCodeInApp: true)
 */
export async function sendEmailVerificationToUser() {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }
  if (!user.email) {
    throw new Error('User does not have an email address')
  }

  await sendEmailVerification(user, {
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
  })
}

/**
 * Send password reset email to the user
 * Opens app directly via deep link (handleCodeInApp: true)
 */
export async function sendPasswordResetEmailToUser() {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }
  if (!user.email) {
    throw new Error('User does not have an email address')
  }

  await sendPasswordResetEmail(auth, user.email, {
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
  })
}

export async function applyActionCodeToUser(code: string) {
  await applyActionCode(auth, code)
}

export async function verifyPasswordResetCodeForUser(code: string): Promise<string> {
  return await verifyPasswordResetCode(auth, code)
}

export async function confirmPasswordResetForUser(code: string, newPassword: string) {
  await confirmPasswordReset(auth, code, newPassword)
}

export async function reauthenticateUser(password: string) {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }
  if (!user.email) {
    throw new Error('User does not have an email address')
  }

  const credential = EmailAuthProvider.credential(user.email, password)
  await reauthenticateWithCredential(user, credential)
}

export async function updateUserPassword(currentPassword: string, newPassword: string) {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }

  await reauthenticateUser(currentPassword)
  await updatePassword(user, newPassword)
}

export async function updateUserDisplayName(displayName: string) {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }
  await updateProfile(user, { displayName })
}

export async function signOutUser() {
  await signOut(auth)
}

export async function deleteUserAccount() {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No user is currently signed in')
  }
  await deleteUser(user)
}
