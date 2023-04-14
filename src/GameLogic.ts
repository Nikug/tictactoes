import { createStore, produce } from 'solid-js/store'
import { nextIndex } from './listUtils'
import { Board, Box, Game, Vector2, Mark, Player } from './types'

const createBoard = (size: Vector2): Board => {
  const board: Board = {
    dimensions: size,
    board: [],
  }

  for (let y = 0; y < size.y; y++) {
    const row: Box[] = Array(size.x)
      .fill(null)
      .map((_, x) => ({ position: { x, y } }))
    board.board.push(row)
  }

  return board
}

const createGame = (size: Vector2): Game => ({
  players: [createPlayer('p1', 'Player 1', 'x'), createPlayer('p2', 'Player 2', 'o')],
  playerTurn: 0,
  board: createBoard(size),
  state: 'init',
  winLength: 5,
})

const createPlayer = (id: string, name: string, mark: Mark): Player => ({ id, name, mark })

export const [gameState, setGameState] = createStore<Game>(createGame({ x: 20, y: 20 }))

export const setMark = (position: Vector2) => {
  const player = gameState.players[gameState.playerTurn]
  setGameState(
    produce((state) => {
      state.playerTurn = nextIndex(state.playerTurn, state.players.length)
      const box = state.board.board[position.y][position.x]
      box.mark = player.mark
      box.playerId = player.id
    })
  )
}
