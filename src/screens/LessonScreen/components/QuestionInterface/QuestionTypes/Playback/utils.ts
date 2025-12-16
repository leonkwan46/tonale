/**
 * Converts an array of durations to an array of timestamps.
 * Each timestamp represents when that note should be played relative to the start.
 * 
 * @param durations - Array of note durations (e.g., [1, 0.5, 0.5, 1])
 * @returns Array of timestamps (e.g., [0, 1, 1.5, 2])
 */
export const convertDurationsToTimestamps = (durations: number[]): number[] => {
  const timestamps: number[] = [0]
  let cumulativeTime = 0
  for (let i = 0; i < durations.length - 1; i++) {
    cumulativeTime += durations[i]
    timestamps.push(cumulativeTime)
  }
  return timestamps
}

