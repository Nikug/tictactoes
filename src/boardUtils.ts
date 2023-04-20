import { Board, Box, Player, Vector2 } from './types'

interface CheckLine {
  playerId: Player['id'] | null
  positions: Vector2[]
}

export const isBoardFull = (board: Board): boolean => {
  return board.board.every((row) => row.every((box) => box.playerId))
}

export const checkBoard = (board: Board, winLength: number) => {
  if (winLength <= 0) return []

  const wins = checkLines(board, winLength, 'horizontal')

  if (winLength > 1) {
    const verticalWins = checkLines(board, winLength, 'vertical')
    if (verticalWins.length) wins.push(...verticalWins)

    const diagonalWins = checkDiagonals(board, winLength, 'topRightToBottomLeft')
    if (diagonalWins.length) wins.push(...diagonalWins)

    const otherDiagonalWins = checkDiagonals(board, winLength, 'bottomRightToTopLeft')
    if (otherDiagonalWins.length) wins.push(...otherDiagonalWins)
  }

  return wins
}

export const checkLines = (
  board: Board,
  winLength: number,
  direction: 'horizontal' | 'vertical'
): CheckLine[] => {
  const wins: CheckLine[] = []
  const outerLimit = direction === 'horizontal' ? board.dimensions.y : board.dimensions.x
  const innerLimit = direction === 'horizontal' ? board.dimensions.x : board.dimensions.y

  for (let outer = 0; outer < outerLimit; outer++) {
    let checkLine: CheckLine = emptyCheckLine()

    for (let inner = 0; inner < innerLimit; inner++) {
      const x = direction === 'horizontal' ? inner : outer
      const y = direction === 'horizontal' ? outer : inner
      const box = board.board[y][x]

      checkLine = checkBox(checkLine, wins, box, winLength)
    }

    if (checkLine.positions.length >= winLength) {
      wins.push({ ...checkLine })
    }
  }

  return wins
}

export const checkDiagonals = (
  board: Board,
  winLength: number,
  direction: 'topRightToBottomLeft' | 'bottomRightToTopLeft'
): CheckLine[] => {
  const wins: CheckLine[] = []
  const trtbl = direction === 'topRightToBottomLeft'

  for (let x = 0; x < board.dimensions.x; x++) {
    let checkLine: CheckLine = emptyCheckLine()
    let innerY = trtbl ? 0 : board.dimensions.y - 1
    let innerX = x
    while (isInBounds(innerX, innerY, board.dimensions)) {
      const box = board.board[innerY][innerX]
      innerX++
      innerY += trtbl ? 1 : -1

      checkLine = checkBox(checkLine, wins, box, winLength)
    }

    if (checkLine.positions.length >= winLength) {
      wins.push({ ...checkLine })
    }
  }

  // Don't re-check the longest diagonal, so start at 1 or length-2.
  let y = trtbl ? 1 : board.dimensions.y - 2
  for (; y < board.dimensions.y && y >= 0; y += trtbl ? 1 : -1) {
    let checkLine: CheckLine = emptyCheckLine()
    let innerY = y
    let innerX = 0
    while (isInBounds(innerX, innerY, board.dimensions)) {
      const box = board.board[innerY][innerX]
      innerX++
      innerY += trtbl ? 1 : -1

      checkLine = checkBox(checkLine, wins, box, winLength)
    }

    if (checkLine.positions.length >= winLength) {
      wins.push({ ...checkLine })
    }
  }

  return wins
}

/**
 * Checks current box and updates check line and wins accordingly.
 * Note: mutates check line and win arrays.
 */
const checkBox = (
  checkLine: CheckLine,
  wins: CheckLine[],
  box: Box,
  winLength: number
): CheckLine => {
  if (!box.playerId || box.playerId !== checkLine.playerId) {
    if (checkLine.positions.length >= winLength) {
      wins.push({ ...checkLine })
    }

    if (box.playerId) {
      checkLine.playerId = box.playerId
      checkLine.positions = [{ x: box.position.x, y: box.position.y }]
    } else {
      checkLine = emptyCheckLine()
    }
  } else {
    checkLine.playerId = box.playerId ?? null
    checkLine.positions.push({ x: box.position.x, y: box.position.y })
  }

  return checkLine
}

const isInBounds = (x: number, y: number, dimensions: Vector2) =>
  x >= 0 && x < dimensions.x && y >= 0 && y < dimensions.y

const emptyCheckLine = (): CheckLine => ({ playerId: null, positions: [] })
