import { Component, Show } from 'solid-js'
import { getActivePlayer, getWinner, isGameActive, isGameTied, isYourTurn } from '../GameLogic'
import { PlayerNameWithMark } from './PlayerNameWithMark'

export const GameInformation: Component = () => {
  return (
    <div class="w-full text-center">
      <Show when={isGameActive()}>
        <h3 class="text-3xl font-bold">
          {isYourTurn() ? <span class="underline">Your turn</span> : 'Opponent turn'}:{' '}
          <PlayerNameWithMark player={getActivePlayer()} />
        </h3>
      </Show>
      <Show when={getWinner()}>
        <h3 class="text-3xl font-bold">
          Winner: <PlayerNameWithMark player={getWinner()} />{' '}
        </h3>
      </Show>
      <Show when={isGameTied()}>
        <h3 class="text-3xl font-bold">Tie!</h3>
      </Show>
    </div>
  )
}
