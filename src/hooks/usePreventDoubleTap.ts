import { useRef } from 'react'

/**
 * Custom hook to prevent double taps by debouncing function calls
 * @param callback The function to debounce
 * @param delay The debounce delay in milliseconds (default: 500ms)
 * @returns A debounced version of the callback
 */
export const usePreventDoubleTap = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T => {
  const lastCallTime = useRef<number>(0)

  return ((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCallTime.current > delay) {
      lastCallTime.current = now
      return callback(...args)
    }
  }) as T
}