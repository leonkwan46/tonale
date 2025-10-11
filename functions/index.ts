import * as admin from 'firebase-admin'

// Import function modules
import * as userDataFunctions from './userData'

admin.initializeApp()

// Export userData CRUD functions
export const createUserData = userDataFunctions.createUserData
export const getUserData = userDataFunctions.getUserData
export const updateUserData = userDataFunctions.updateUserData
export const deleteUserData = userDataFunctions.deleteUserData

// Add more Cloud Functions here as needed

