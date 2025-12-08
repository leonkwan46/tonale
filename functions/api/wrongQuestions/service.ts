import type {
  FailedQuestionsResponse,
  StoreFailedQuestionPayload,
  StoreFailedQuestionResponse,
  StoreFailedQuestionsPayload,
  VisualComponentData
} from '@types'
import {
  deleteFailedQuestionFromFirestore,
  deleteFailedQuestionsByLessonFromFirestore,
  getFailedQuestionsFromFirestore,
  storeFailedQuestionInFirestore,
  storeFailedQuestionsInFirestore,
  type FailedQuestionInput
} from './firestore'

/**
 * Compress visualComponent by removing undefined/null/empty fields
 * This reduces storage size while preserving all essential data
 */
function compressVisualComponent(visualComponent?: VisualComponentData): VisualComponentData | undefined {
  if (!visualComponent) return undefined
  
  const compressed: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(visualComponent)) {
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
  
  return Object.keys(compressed).length > 0 ? compressed : undefined
}

export function validateStoreFailedQuestionPayload(
  data: StoreFailedQuestionPayload
): void {
  const { id, lessonId, question, correctAnswer, choices, type } = data

  if (!id || typeof id !== 'string') {
    throw new Error('id is required and must be a string')
  }

  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }

  if (!question || typeof question !== 'string') {
    throw new Error('question is required and must be a string')
  }

  if (!correctAnswer || typeof correctAnswer !== 'string') {
    throw new Error('correctAnswer is required and must be a string')
  }

  if (!Array.isArray(choices)) {
    throw new Error('choices is required and must be an array')
  }

  if (!type || !['multipleChoice', 'trueFalse', 'keyPress'].includes(type)) {
    throw new Error('type must be "multipleChoice", "trueFalse", or "keyPress"')
  }
}

export async function storeFailedQuestionService(
  userId: string,
  payload: StoreFailedQuestionPayload
): Promise<StoreFailedQuestionResponse> {
  validateStoreFailedQuestionPayload(payload)
  
  // Compress visualComponent before storing
  const compressedPayload: FailedQuestionInput = {
    id: payload.id,
    lessonId: payload.lessonId,
    question: payload.question,
    correctAnswer: payload.correctAnswer,
    choices: payload.choices,
    explanation: payload.explanation,
    type: payload.type,
    visualComponent: compressVisualComponent(payload.visualComponent)
  }
  
  await storeFailedQuestionInFirestore(userId, compressedPayload)
  
  return {
    success: true,
    message: 'Failed question stored successfully'
  }
}

export async function getFailedQuestionsService(
  userId: string
): Promise<FailedQuestionsResponse> {
  // Always return all failed questions
  const failedQuestions = await getFailedQuestionsFromFirestore(userId)
  
  return {
    success: true,
    data: failedQuestions
  }
}

export async function storeFailedQuestionsService(
  userId: string,
  payload: StoreFailedQuestionsPayload
): Promise<StoreFailedQuestionResponse> {
  if (!payload.questions || !Array.isArray(payload.questions)) {
    throw new Error('questions is required and must be an array')
  }
  
  if (payload.questions.length === 0) {
    return {
      success: true,
      message: 'No failed questions to store'
    }
  }
  
  // Validate each question
  payload.questions.forEach(question => {
    validateStoreFailedQuestionPayload(question)
  })
  
  // Compress visualComponent for each question
  const compressedQuestions: FailedQuestionInput[] = payload.questions.map(question => ({
    id: question.id,
    lessonId: question.lessonId,
    question: question.question,
    correctAnswer: question.correctAnswer,
    choices: question.choices,
    explanation: question.explanation,
    type: question.type,
    visualComponent: compressVisualComponent(question.visualComponent)
  }))
  
  await storeFailedQuestionsInFirestore(userId, compressedQuestions)
  
  return {
    success: true,
    message: `Successfully stored ${compressedQuestions.length} failed question(s)`
  }
}

export async function deleteFailedQuestionService(
  userId: string,
  id: string
): Promise<StoreFailedQuestionResponse> {
  if (!id || typeof id !== 'string') {
    throw new Error('id is required and must be a string')
  }
  
  await deleteFailedQuestionFromFirestore(userId, id)
  
  return {
    success: true,
    message: 'Failed question deleted successfully'
  }
}

export async function deleteFailedQuestionsByLessonService(
  userId: string,
  lessonId: string
): Promise<StoreFailedQuestionResponse> {
  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }
  
  await deleteFailedQuestionsByLessonFromFirestore(userId, lessonId)
  
  return {
    success: true,
    message: 'Failed questions deleted successfully'
  }
}

