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
    deleteRevisionQuestion,
    deleteRevisionQuestions,
    deleteRevisionQuestionsByLesson,
    getRevisionQuestions,
    storeRevisionQuestion,
    storeRevisionQuestions
} from './api/revisionQuestions/handlers'

admin.initializeApp()

// Export userData CRUD functions
export { createUserData, deleteUserData, getUserData, updateUserData }

// Export lessonProgress CRUD functions
export { deleteLessonProgress, getAllLessonProgress, getLessonProgress, updateLessonProgress }

// Export revisionQuestions CRUD functions
export { deleteRevisionQuestion, deleteRevisionQuestions, deleteRevisionQuestionsByLesson, getRevisionQuestions, storeRevisionQuestion, storeRevisionQuestions }

