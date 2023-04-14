import { Component, createSignal, For } from 'solid-js'
import type { Board, Vector2, Box as BoxType } from '../types'
import { Box } from './Box'

const createBoard = (size: Vector2): Board => {
  const board: Board = {
    dimensions: size,
    board: [],
  }

  for (let y = 0, yLimit = size.y; y < yLimit; y++) {
    const row: BoxType[] = Array(size.x)
      .fill(null)
      .map((_, x) => ({ position: { x, y } }))
    board.board.push(row)
  }

  return board
}

export const GameBoard: Component = () => {
  const [board, setBoard] = createSignal<Board>(createBoard({ x: 20, y: 20 }))

  return (
    <div class="w-[800px] h-[800px] flex flex-col">
      <For each={board().board}>
        {(row) => (
          <div class="flex h-full">
            <For each={row}>{(box) => <Box state={box} onClick={console.log} />}</For>
          </div>
        )}
      </For>
    </div>
  )
}
