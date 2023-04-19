export interface Vector2 {
  x: number
  y: number
}

export type Mark = 'x' | 'o'
export type GameState = 'init' | 'active' | 'end' | 'replay'

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
  id?: number
  players: Player[]
  playerTurn: number
  turns: Box[]
  board: Board
  state: GameState
  winLength: number
  winningBoxes: Vector2[]
  winnerId: Player['id'] | null
  leaverId: Player['id'] | null
}

export interface Player {
  id: string
  name: string
  mark: Mark
}

export interface GameSettings {
  dimensions: Vector2
  winLength: number
}
