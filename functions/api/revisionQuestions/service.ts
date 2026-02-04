import type {
  RevisionQuestionsResponse,
  StoreRevisionQuestionPayload,
  StoreRevisionQuestionResponse,
  StoreRevisionQuestionsPayload,
  VisualComponent
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
 * Compress visualComponent by removing undefined/null/empty fields
 * This reduces storage size while preserving all essential data
 */
function compressVisualComponent(visualComponent?: VisualComponent): VisualComponent | undefined {
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
  
  return Object.keys(compressed).length > 0 ? (compressed as unknown as VisualComponent) : undefined
}

export function validateStoreRevisionQuestionPayload(
  data: StoreRevisionQuestionPayload
): void {
  const { id, lessonId, question, correctAnswer, choices, type, questionInterface } = data

  if (!id || typeof id !== 'string') {
    throw new Error('id is required and must be a string')
  }

  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('lessonId is required and must be a string')
  }

  if (!question || typeof question !== 'string') {
    throw new Error('question is required and must be a string')
  }

  if (type === 'rhythmTap') {
    if (!Array.isArray(correctAnswer) || correctAnswer.length === 0) {
      throw new Error('correctAnswer is required and must be a non-empty array for rhythmTap questions')
    }
    if (!questionInterface || questionInterface.type !== 'playback') {
      throw new Error('questionInterface is required for rhythmTap questions and must have type "playback"')
    }
    if (!questionInterface.rhythm && !questionInterface.audioFile) {
      throw new Error('questionInterface must have either rhythm or audioFile for rhythmTap questions')
    }
  } else {
    if (!correctAnswer || typeof correctAnswer !== 'string') {
      throw new Error('correctAnswer is required and must be a string for non-rhythmTap questions')
    }
  }

  if (!Array.isArray(choices)) {
    throw new Error('choices is required and must be an array')
  }

  if (!type || !['multipleChoice', 'trueFalse', 'keyPress', 'rhythmTap'].includes(type)) {
    throw new Error('type must be "multipleChoice", "trueFalse", "keyPress", or "rhythmTap"')
  }
}

export async function storeRevisionQuestionService(
  userId: string,
  payload: StoreRevisionQuestionPayload
): Promise<StoreRevisionQuestionResponse> {
  validateStoreRevisionQuestionPayload(payload)
  
  // Compress visualComponent before storing
  const compressedVisualComponent = compressVisualComponent(payload.visualComponent)
  const compressedPayload: RevisionQuestionInput = {
    id: payload.id,
    lessonId: payload.lessonId,
    question: payload.question,
    correctAnswer: payload.correctAnswer,
    choices: payload.choices,
    type: payload.type,
    ...(payload.explanation && { explanation: payload.explanation }),
    ...(compressedVisualComponent && { visualComponent: compressedVisualComponent }),
    ...(payload.questionInterface && { questionInterface: payload.questionInterface }),
    ...(payload.correctCount !== undefined && { correctCount: payload.correctCount })
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
  
  // Compress visualComponent for each question
  const compressedQuestions: RevisionQuestionInput[] = payload.questions.map(question => {
    const compressedVisualComponent = compressVisualComponent(question.visualComponent)
    return {
      id: question.id,
      lessonId: question.lessonId,
      question: question.question,
      correctAnswer: question.correctAnswer,
      choices: question.choices,
      type: question.type,
      ...(question.explanation && { explanation: question.explanation }),
      ...(compressedVisualComponent && { visualComponent: compressedVisualComponent }),
      ...(question.questionInterface && { questionInterface: question.questionInterface }),
      ...(question.correctCount !== undefined && { correctCount: question.correctCount })
    }
  })
  
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

