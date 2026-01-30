/**
 * Convert note durations to timestamps.
 * Timestamps represent when each note should be played, starting from 0.
 *
 * @param durations - Array of note durations in beats
 * @returns Array of timestamps in beats when each note should be played
 *
 * @example
 * convertDurationsToTimestamps([1.0, 0.5, 0.5, 1.0])
 * // Returns: [0, 1.0, 1.5, 2.0]
 */
export const convertDurationsToTimestamps = (durations: number[]): number[] => {
  if (durations.length === 0) return []

  const timestamps: number[] = [0]
  let currentTime = 0

  for (let i = 0; i < durations.length - 1; i++) {
    currentTime += durations[i]
    timestamps.push(currentTime)
  }

  return timestamps
}
