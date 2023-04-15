import { Component, Show } from 'solid-js'
import { getActivePlayer, getWinner, isGameActive, isGameTied } from '../GameLogic'

export const GameInformation: Component = () => {
  return (
    <div>
      <Show when={isGameActive()}>
        <h3 class="text-3xl font-bold text-white">
          Play: {getActivePlayer().name} ({getActivePlayer().mark})
        </h3>
      </Show>
      <Show when={getWinner()}>
        <h3 class="text-3xl font-bold text-white">
          Winner: {getWinner().name} ({getWinner().mark})!
        </h3>
      </Show>
      <Show when={isGameTied()}>
        <h3 class="text-3xl font-bold text-white">Tie!</h3>
      </Show>
    </div>
  )
}
