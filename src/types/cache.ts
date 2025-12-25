export type LessonProgressCache = {
  userId: string
  timestamp: number
  data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
}
