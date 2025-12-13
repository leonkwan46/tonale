import type {
    QuestionInterface,
    RevisionQuestionsResponse,
    StoreRevisionQuestionPayload,
    StoreRevisionQuestionResponse,
    StoreRevisionQuestionsPayload
} from '@types'
import {
    deleteRevisionQuestionFromFirestore,
    deleteRevisionQuestionsByLessonFromFirestore,
    deleteRevisionQuestionsFromFirestore,
    getRevisionQuestionsFromFirestore,
    storeRevisionQuestionInFirestore,
    storeRevisionQuestionsInFirestore,
    type RevisionQuestionInput
} from './firestore'

/**
 * Compress questionInterface by removing undefined/null/empty fields
 * This reduces storage size while preserving all essential data
 */
function compressQuestionInterface(questionInterface?: QuestionInterface): QuestionInterface | undefined {
  if (!questionInterface) return undefined
  
  const compressed: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(questionInterface)) {
    // Only include defined, non-null, non-empty values
    if (value !== undefined && value !== null && value !== '') {
      // Handle arrays - only include if non-empty
      if (Array.isArray(value)) {
        if (value.length > 0) {
          compressed[key] = value
        }
      } else {
        compressed[key] = value
      }
    }
  }
  
  return Object.keys(compressed).length > 0 ? (compressed as unknown as QuestionInterface) : undefined
}

export function validateStoreRevisionQuestionPayload(
  data: StoreRevisionQuestionPayload
): void {
  const { id, lessonId, title, correctAnswer, choices, answerInterface } = data

  if (!id || typeof id !== 'string') {
    throw new Error('id is required and must be a string')
  }

  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }

  if (!title || typeof title !== 'string') {
    throw new Error('title is required and must be a string')
  }

  if (!correctAnswer || typeof correctAnswer !== 'string') {
    throw new Error('correctAnswer is required and must be a string')
  }

  if (!Array.isArray(choices)) {
    throw new Error('choices is required and must be an array')
  }

  if (!answerInterface || !['multipleChoice', 'trueFalse', 'keyPress'].includes(answerInterface)) {
    throw new Error('answerInterface must be "multipleChoice", "trueFalse", or "keyPress"')
  }
}

export async function storeRevisionQuestionService(
  userId: string,
  payload: StoreRevisionQuestionPayload
): Promise<StoreRevisionQuestionResponse> {
  validateStoreRevisionQuestionPayload(payload)
  
  // Compress questionInterface before storing
  const compressedPayload: RevisionQuestionInput = {
    id: payload.id,
    lessonId: payload.lessonId,
    title: payload.title,
    correctAnswer: payload.correctAnswer,
    choices: payload.choices,
    explanation: payload.explanation,
    answerInterface: payload.answerInterface,
    questionInterface: compressQuestionInterface(payload.questionInterface),
    correctCount: payload.correctCount
  }
  
  await storeRevisionQuestionInFirestore(userId, compressedPayload)
  
  return {
    success: true,
    message: 'Revision question stored successfully'
  }
}

export async function getRevisionQuestionsService(
  userId: string
): Promise<RevisionQuestionsResponse> {
  // Always return all revision questions
  const revisionQuestions = await getRevisionQuestionsFromFirestore(userId)
  
  return {
    success: true,
    data: revisionQuestions
  }
}

export async function storeRevisionQuestionsService(
  userId: string,
  payload: StoreRevisionQuestionsPayload
): Promise<StoreRevisionQuestionResponse> {
  if (!payload.questions || !Array.isArray(payload.questions)) {
    throw new Error('questions is required and must be an array')
  }
  
  if (payload.questions.length === 0) {
    return {
      success: true,
      message: 'No revision questions to store'
    }
  }
  
  // Validate each question
  payload.questions.forEach(question => {
    validateStoreRevisionQuestionPayload(question)
  })
  
  // Compress questionInterface for each question
  const compressedQuestions: RevisionQuestionInput[] = payload.questions.map(question => ({
    id: question.id,
    lessonId: question.lessonId,
    title: question.title,
    correctAnswer: question.correctAnswer,
    choices: question.choices,
    explanation: question.explanation,
    answerInterface: question.answerInterface,
    questionInterface: compressQuestionInterface(question.questionInterface),
    correctCount: question.correctCount
  }))
  
  await storeRevisionQuestionsInFirestore(userId, compressedQuestions)
  
  return {
    success: true,
    message: `Successfully stored ${compressedQuestions.length} revision question(s)`
  }
}

export async function deleteRevisionQuestionService(
  userId: string,
  id: string
): Promise<StoreRevisionQuestionResponse> {
  if (!id || typeof id !== 'string') {
    throw new Error('id is required and must be a string')
  }
  
  await deleteRevisionQuestionFromFirestore(userId, id)
  
  return {
    success: true,
    message: 'Revision question deleted successfully'
  }
}

export async function deleteRevisionQuestionsService(
  userId: string,
  ids: string[]
): Promise<StoreRevisionQuestionResponse> {
  if (!Array.isArray(ids)) {
    throw new Error('ids is required and must be an array')
  }
  
  if (ids.length === 0) {
    return {
      success: true,
      message: 'No revision questions to delete'
    }
  }
  
  await deleteRevisionQuestionsFromFirestore(userId, ids)
  
  return {
    success: true,
    message: `Successfully deleted ${ids.length} revision question(s)`
  }
}

export async function deleteRevisionQuestionsByLessonService(
  userId: string,
  lessonId: string
): Promise<StoreRevisionQuestionResponse> {
  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }
  
  await deleteRevisionQuestionsByLessonFromFirestore(userId, lessonId)
  
  return {
    success: true,
    message: 'Revision questions deleted successfully'
  }
}

