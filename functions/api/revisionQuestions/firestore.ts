import type { QuestionInterface, RevisionQuestion } from '@types'
import * as admin from 'firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export interface RevisionQuestionInput {
  id: string
  lessonId: string
  title: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  answerInterface: 'multipleChoice' | 'trueFalse' | 'keyPress'
  questionInterface?: QuestionInterface
  correctCount?: number
}

export async function storeRevisionQuestionInFirestore(
  userId: string,
  revisionQuestion: RevisionQuestionInput
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  
  const questionWithTimestamp = {
    ...revisionQuestion,
    failedAt: FieldValue.serverTimestamp()
  }
  
  await userRef.update({
    [`revisionQuestions.${revisionQuestion.id}`]: questionWithTimestamp,
    updatedAt: FieldValue.serverTimestamp()
  })
}

export async function storeRevisionQuestionsInFirestore(
  userId: string,
  revisionQuestions: RevisionQuestionInput[]
): Promise<void> {
  if (revisionQuestions.length === 0) return
  
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  
  const updates: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp()
  }
  
  revisionQuestions.forEach(revisionQuestion => {
    const questionWithTimestamp = {
      ...revisionQuestion,
      failedAt: FieldValue.serverTimestamp()
    }
    updates[`revisionQuestions.${revisionQuestion.id}`] = questionWithTimestamp
  })
  
  if (doc.exists) {
    await userRef.update(updates)
  } else {
    await userRef.set(updates, { merge: true })
  }
}

export async function getRevisionQuestionsFromFirestore(
  userId: string
): Promise<RevisionQuestion[]> {
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  const userData = doc.data()
  
  const revisionQuestionsMap = userData?.revisionQuestions || {}
  
  // Convert object to array
  return Object.values(revisionQuestionsMap) as RevisionQuestion[]
}

export async function deleteRevisionQuestionFromFirestore(
  userId: string,
  id: string
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  
  await userRef.update({
    [`revisionQuestions.${id}`]: FieldValue.delete(),
    updatedAt: FieldValue.serverTimestamp()
  })
}

export async function deleteRevisionQuestionsFromFirestore(
  userId: string,
  ids: string[]
): Promise<void> {
  if (ids.length === 0) return

  const userRef = admin.firestore().collection('users').doc(userId)
  
  const updates: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp()
  }
  
  ids.forEach(id => {
    updates[`revisionQuestions.${id}`] = FieldValue.delete()
  })
  
  await userRef.update(updates)
}

export async function deleteRevisionQuestionsByLessonFromFirestore(
  userId: string,
  lessonId: string
): Promise<void> {
  const userRef = admin.firestore().collection('users').doc(userId)
  const doc = await userRef.get()
  const userData = doc.data()
  
  const revisionQuestionsMap = userData?.revisionQuestions || {}
  
  // Find all questionIds for this lesson
  const questionIdsToDelete: string[] = []
  for (const [questionId, question] of Object.entries(revisionQuestionsMap)) {
    const revisionQuestion = question as RevisionQuestion
    if (revisionQuestion.lessonId === lessonId) {
      questionIdsToDelete.push(questionId)
    }
  }
  
  // Delete all matching questions
  if (questionIdsToDelete.length > 0) {
    await deleteRevisionQuestionsFromFirestore(userId, questionIdsToDelete)
  }
}

