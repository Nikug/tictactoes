import { Board, Player, Vector2 } from './types'

interface CheckLine {
  playerId: Player['id'] | null
  positions: Vector2[]
}

export const checkBoard = (board: Board, winLength: number) => {
  const wins = checkLines(board, winLength, 'horizontal')
  if (winLength > 1) {
    const verticalWins = checkLines(board, winLength, 'vertical')
    if (verticalWins.length) wins.push(...verticalWins)
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

      if (!box.playerId) {
        if (checkLine.positions.length >= winLength) {
          wins.push({ ...checkLine })
        }
        checkLine = emptyCheckLine()
        continue
      }

      if (box.playerId === checkLine.playerId || checkLine.playerId === null) {
        checkLine.playerId = box.playerId
        checkLine.positions.push({ x, y })
      } else {
        checkLine.playerId = box.playerId
        checkLine.positions = [{ x, y }]
      }
    }

    if (checkLine.positions.length >= winLength) {
      wins.push({ ...checkLine })
    }
  }

  return wins
}

const emptyCheckLine = (): CheckLine => ({ playerId: null, positions: [] })
