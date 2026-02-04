export const convertDurationsToTimestamps = (durations: number[]): number[] => {
  const timestamps: number[] = [0]
  let cumulativeTime = 0
  for (let i = 0; i < durations.length - 1; i++) {
    cumulativeTime += durations[i]
    timestamps.push(cumulativeTime)
  }
  return timestamps
}
