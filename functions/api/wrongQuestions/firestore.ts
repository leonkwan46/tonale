import type { FailedQuestion, VisualComponentData } from '@types'
import * as admin from 'firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export interface FailedQuestionInput {
  id: string
  lessonId: string
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress'
  visualComponent?: VisualComponentData
}

export async function storeFailedQuestionInFirestore(
  userId: string,
  failedQuestion: FailedQuestionInput
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  
  const questionWithTimestamp = {
    ...failedQuestion,
    failedAt: FieldValue.serverTimestamp()
  }
  
  await userRef.update({
    [`failedQuestions.${failedQuestion.id}`]: questionWithTimestamp,
    updatedAt: FieldValue.serverTimestamp()
  })
}

export async function storeFailedQuestionsInFirestore(
  userId: string,
  failedQuestions: FailedQuestionInput[]
): Promise<void> {
  if (failedQuestions.length === 0) return
  
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  
  const updates: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp()
  }
  
  failedQuestions.forEach(failedQuestion => {
    const questionWithTimestamp = {
      ...failedQuestion,
      failedAt: FieldValue.serverTimestamp()
    }
    updates[`failedQuestions.${failedQuestion.id}`] = questionWithTimestamp
  })
  
  if (doc.exists) {
    await userRef.update(updates)
  } else {
    await userRef.set(updates, { merge: true })
  }
}

export async function getFailedQuestionsFromFirestore(
  userId: string
): Promise<FailedQuestion[]> {
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  const userData = doc.data()
  
  const failedQuestionsMap = userData?.failedQuestions || {}
  
  // Convert object to array
  return Object.values(failedQuestionsMap) as FailedQuestion[]
}

export async function deleteFailedQuestionFromFirestore(
  userId: string,
  id: string
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  
  await userRef.update({
    [`failedQuestions.${id}`]: FieldValue.delete(),
    updatedAt: FieldValue.serverTimestamp()
  })
}

export async function deleteFailedQuestionsByLessonFromFirestore(
  userId: string,
  lessonId: string
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  const userData = doc.data()
  
  const failedQuestionsMap = userData?.failedQuestions || {}
  
  // Find all questionIds for this lesson
  const questionIdsToDelete: string[] = []
  for (const [questionId, question] of Object.entries(failedQuestionsMap)) {
    const failedQuestion = question as FailedQuestion
    if (failedQuestion.lessonId === lessonId) {
      questionIdsToDelete.push(questionId)
    }
  }
  
  // Delete all matching questions
  if (questionIdsToDelete.length > 0) {
    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp()
    }
    
    questionIdsToDelete.forEach(questionId => {
      updates[`failedQuestions.${questionId}`] = FieldValue.delete()
    })
    
    await userRef.update(updates)
  }
}

