import { Component, For } from 'solid-js'
import { gameState } from '../GameLogic'

export const GameRuleInformation: Component = () => {
  return (
    <div class="w-full">
      <div class="w-full flex gap-4 justify-center items-center text-xl mt-4">
        <p>
          Grid size:{' '}
          <span class="font-bold">
            {gameState.board.dimensions.x}x{gameState.board.dimensions.y}
          </span>
        </p>
        <p>
          Win length: <span class="font-bold">{gameState.winLength}</span>
        </p>
      </div>
      <div class="w-full flex gap-4 justify-center items-center text-xl mt-4">
        <p>
          Players:{' '}
          <For each={gameState.players}>
            {(player, index) => (
              <span class="font-bold mr-2">
                {player.name} ({player.mark}){index() + 1 != gameState.players.length ? ',' : ''}
              </span>
            )}
          </For>
        </p>
      </div>
    </div>
  )
}
