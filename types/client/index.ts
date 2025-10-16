// Client-side types for lesson progress caching
export type LessonProgressCache = {
  userId: string
  timestamp: number
  data: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
}

