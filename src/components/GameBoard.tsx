import { Component, For } from 'solid-js'
import { gameState, setMark } from '../GameLogic'
import { Box } from './Box'
import { Box as BoxType } from '../types'

interface Props {
  showWinningBoxes: boolean
  latestTurn: BoxType | undefined
}

export const GameBoard: Component<Props> = (props) => {
  const isWinningBox = (box: BoxType): boolean => {
    return gameState.winningBoxes.some(
      (winningBox) => winningBox.x === box.position.x && winningBox.y === box.position.y
    )
  }

  const isLatestTurn = (box: BoxType): boolean => {
    if (!props.latestTurn) return false

    return (
      props.latestTurn.position.x === box.position.x &&
      props.latestTurn.position.y === box.position.y
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
                  isLatestTurn={isLatestTurn(box)}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
