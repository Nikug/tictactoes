import { Board, Player, Vector2 } from './types'

interface CheckLine {
  playerId: Player['id'] | null
  positions: Vector2[]
}

export const checkBoard = (board: Board, winLength: number) => {
  const horizontalWins = checkHorizontal(board, winLength)

  return horizontalWins
}

const checkHorizontal = (board: Board, winLength: number) => {
  const wins: CheckLine[] = []

  for (let y = 0; y < board.dimensions.y; y++) {
    let checkLine: CheckLine = emptyCheckLine()

    for (let x = 0; x < board.dimensions.x; x++) {
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
}

const emptyCheckLine = (): CheckLine => ({ playerId: null, positions: [] })
