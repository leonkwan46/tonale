import * as admin from 'firebase-admin'

// Import function modules
import * as lessonProgressFunctions from './lessonProgress'
import * as userDataFunctions from './userData'

admin.initializeApp()

// Export userData CRUD functions
export const createUserData = userDataFunctions.createUserData
export const getUserData = userDataFunctions.getUserData
export const updateUserData = userDataFunctions.updateUserData
export const deleteUserData = userDataFunctions.deleteUserData

// Export lessonProgress CRUD functions
export const updateLessonProgress = lessonProgressFunctions.updateLessonProgress
export const getLessonProgress = lessonProgressFunctions.getLessonProgress
export const getAllLessonProgress = lessonProgressFunctions.getAllLessonProgress
export const deleteLessonProgress = lessonProgressFunctions.deleteLessonProgress

// Add more Cloud Functions here as needed

