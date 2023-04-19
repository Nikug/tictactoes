import { Component, For } from 'solid-js'
import { gameState, setMark } from '../GameLogic'
import { Box } from './Box'
import { Box as BoxType } from '../types'

interface Props {
  showWinningBoxes: boolean
}

export const GameBoard: Component<Props> = (props) => {
  const isWinningBox = (box: BoxType) => {
    return gameState.winningBoxes.some(
      (winningBox) => winningBox.x === box.position.x && winningBox.y === box.position.y
    )
  }

  return (
    <div class="w-[700px] h-[700px] flex flex-col bg-orange-300 rounded-xl border overflow-hidden">
      <For each={gameState.board.board}>
        {(row) => (
          <div class="flex h-full">
            <For each={row}>
              {(box) => (
                <Box
                  state={box}
                  onClick={(position) => setMark(position)}
                  isWinning={props.showWinningBoxes && isWinningBox(box)}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
