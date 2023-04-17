import { createStore, produce } from 'solid-js/store'
import { updateAfterTurn } from './api/activeGames'
import { getUser } from './Auth'
import { checkBoard, isBoardFull } from './boardUtils'
import { gameSettings } from './GameSettings'
import { nextIndex } from './listUtils'
import { Board, Box, Game, Vector2, GameSettings } from './types'

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
  players: [],
  playerTurn: 0,
  turns: [],
  board: createBoard(settings.dimensions),
  state: 'init',
  winLength: settings.winLength,
  winnerId: null,
  winningBoxes: [],
})

export const [gameState, setGameState] = createStore<Game>(createGame(gameSettings()))

export const setMark = async (position: Vector2) => {
  if (!isYourTurn() || gameState.state !== 'active') return

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

  await updateAfterTurn(gameState)
}

export const startGame = () => {
  setGameState(createGame(gameSettings()))
}

export const getActivePlayer = () => gameState.players[gameState.playerTurn]
export const isYourTurn = () => gameState.players[gameState.playerTurn].id === getUser()?.id
export const getWinner = () =>
  gameState.state === 'end' && gameState.winnerId
    ? gameState.players.find((player) => player.id === gameState.winnerId)
    : undefined
export const isGameActive = () => gameState.state === 'active'
export const isGameEnd = () => gameState.state === 'end'
export const isGameInit = () => gameState.state === 'init'
export const isGameTied = () => gameState.state === 'end' && !gameState.winnerId
