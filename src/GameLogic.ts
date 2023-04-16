import { createStore, produce } from 'solid-js/store'
import { checkBoard, isBoardFull } from './boardUtils'
import { gameSettings } from './GameSettings'
import { nextIndex } from './listUtils'
import { Board, Box, Game, Vector2, Mark, Player, GameSettings } from './types'

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

export const createGame = (settings: GameSettings): Game => ({
  players: [createPlayer('p1', 'Player 1', 'x'), createPlayer('p2', 'Player 2', 'o')],
  playerTurn: 0,
  turns: [],
  board: createBoard(settings.dimensions),
  state: 'active',
  winLength: settings.winLength,
  winnerId: null,
  winningBoxes: [],
})

const createPlayer = (id: string, name: string, mark: Mark): Player => ({ id, name, mark })

export const [gameState, setGameState] = createStore<Game>(createGame(gameSettings()))

export const setMark = (position: Vector2) => {
  if (gameState.state !== 'active') return

  const player = gameState.players[gameState.playerTurn]
  setGameState(
    produce((state) => {
      state.playerTurn = nextIndex(state.playerTurn, state.players.length)
      const box = state.board.board[position.y][position.x]
      box.mark = player.mark
      box.playerId = player.id
      state.turns.push({ ...box })

      const wins = checkBoard(state.board, state.winLength)
      if (wins.length) {
        state.state = 'end'
        state.winnerId = wins[0].playerId
        state.winningBoxes = wins.flatMap((win) => win.positions)
      } else if (isBoardFull(gameState.board)) {
        state.state = 'end'
      }
    })
  )
}

export const startGame = () => {
  setGameState(createGame(gameSettings()))
}

export const getActivePlayer = () => gameState.players[gameState.playerTurn]
export const getWinner = () =>
  gameState.state === 'end' && gameState.winnerId
    ? gameState.players.find((player) => player.id === gameState.winnerId)
    : undefined
export const isGameActive = () => gameState.state === 'active'
export const isGameTied = () => gameState.state === 'end' && !gameState.winnerId
