/**
 * Calculates the next index in the list and wraps around when necessary.
 */
export const nextIndex = (index: number, length: number, step = 1): number => {
  return (index + step) % length
}
