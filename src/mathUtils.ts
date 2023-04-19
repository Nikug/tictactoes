/**
 * Calculates the next index in the list and wraps around when necessary.
 */
export const nextIndex = (index: number, length: number, step = 1): number => {
  return (index + step) % length
}

/**
 * Clamps the value between min and max values.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(value, min))
}
