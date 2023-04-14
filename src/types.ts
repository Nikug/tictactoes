export interface Vector2 {
  x: number
  y: number
}

export type Mark = 'x' | 'o'

export interface Box {
  mark?: Mark
  position: Vector2
}

export interface Board {
  dimensions: Vector2
  board: Box[][]
}
