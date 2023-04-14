export interface Vector2 {
  x: number
  y: number
}

export type Mark = 'x' | 'o'
export type GameState = 'init' | 'active' | 'end'

export interface Box {
  mark?: Mark
  playerId?: string
  position: Vector2
}

export interface Board {
  dimensions: Vector2
  board: Box[][]
}

export interface Game {
  players: Player[]
  playerTurn: number
  board: Board
  state: GameState
  winLength: number
}

export interface Player {
  id: string
  name: string
  mark: Mark
}
