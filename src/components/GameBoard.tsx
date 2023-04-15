import { Component, For } from 'solid-js'
import { gameState, setMark } from '../GameLogic'
import { Box } from './Box'
import { Box as BoxType } from '../types'

export const GameBoard: Component = () => {
  const isWinningBox = (box: BoxType) => {
    return gameState.winningBoxes.some(
      (winningBox) => winningBox.x === box.position.x && winningBox.y === box.position.y
    )
  }

  return (
    <div class="w-[800px] h-[800px] flex flex-col bg-orange-300 rounded-xl border overflow-hidden">
      <For each={gameState.board.board}>
        {(row) => (
          <div class="flex h-full">
            <For each={row}>
              {(box) => (
                <Box
                  state={box}
                  onClick={(position) => setMark(position)}
                  isWinning={isWinningBox(box)}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
