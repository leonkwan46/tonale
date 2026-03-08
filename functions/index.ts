import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

import * as admin from 'firebase-admin'

// Import V2 handlers (2nd gen functions)
import {
    createUserDataV2,
    deleteUserDataV2,
    getUserDataV2,
    updateUserDataV2
} from './api/userData/handlers'

import {
    deleteLessonProgressV2,
    getAllLessonProgressV2,
    getLessonProgressV2,
    updateLessonProgressV2
} from './api/lessonProgress/handlers'

import {
    deleteRevisionQuestionV2,
    deleteRevisionQuestionsByLessonV2,
    deleteRevisionQuestionsV2,
    getRevisionQuestionsV2,
    storeRevisionQuestionV2,
    storeRevisionQuestionsV2
} from './api/revisionQuestions/handlers'

admin.initializeApp()

// Export userData CRUD functions (2nd Gen - V2 suffix for migration)
export { createUserDataV2, deleteUserDataV2, getUserDataV2, updateUserDataV2 }

// Export lessonProgress CRUD functions (2nd Gen - V2 suffix for migration)
export { deleteLessonProgressV2, getAllLessonProgressV2, getLessonProgressV2, updateLessonProgressV2 }

// Export revisionQuestions CRUD functions (2nd Gen - V2 suffix for migration)
export { deleteRevisionQuestionV2, deleteRevisionQuestionsByLessonV2, deleteRevisionQuestionsV2, getRevisionQuestionsV2, storeRevisionQuestionV2, storeRevisionQuestionsV2 }

