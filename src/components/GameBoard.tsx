import { Component, For } from 'solid-js'
import { gameState, setMark } from '../GameLogic'
import { Box } from './Box'

export const GameBoard: Component = () => {
  return (
    <div class="w-[800px] h-[800px] flex flex-col">
      <For each={gameState.board.board}>
        {(row) => (
          <div class="flex h-full">
            <For each={row}>
              {(box) => <Box state={box} onClick={(position) => setMark(position)} />}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
