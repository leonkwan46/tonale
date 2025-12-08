import * as admin from 'firebase-admin'

// Import handlers directly
import {
    createUserData,
    deleteUserData,
    getUserData,
    updateUserData
} from './api/userData/handlers'

import {
    deleteLessonProgress,
    getAllLessonProgress,
    getLessonProgress,
    updateLessonProgress
} from './api/lessonProgress/handlers'

import {
    deleteFailedQuestion,
    deleteFailedQuestionsByLesson,
    getFailedQuestions,
    storeFailedQuestion,
    storeFailedQuestions
} from './api/wrongQuestions/handlers'

admin.initializeApp()

// Export userData CRUD functions
export { createUserData, deleteUserData, getUserData, updateUserData }

// Export lessonProgress CRUD functions
export { deleteLessonProgress, getAllLessonProgress, getLessonProgress, updateLessonProgress }

// Export wrongQuestions CRUD functions
export { deleteFailedQuestion, deleteFailedQuestionsByLesson, getFailedQuestions, storeFailedQuestion, storeFailedQuestions }

