import { Component, Show } from 'solid-js'
import { getActivePlayer, getWinner, isGameActive, isGameTied, isYourTurn } from '../GameLogic'
import { Mark } from './Mark'

export const GameInformation: Component = () => {
  return (
    <div>
      <Show when={isGameActive()}>
        <h3 class="text-3xl font-bold text-white">
          {isYourTurn() ? <span class="underline">Your turn</span> : 'Opponent turn'}:{' '}
          {getActivePlayer()?.name ?? 'Unknown'}{' '}
          <span class="inline-block w-8 h-8 bg-orange-300 rounded -mb-1">
            <Mark mark={getActivePlayer()?.mark} />
          </span>
        </h3>
      </Show>
      <Show when={getWinner()}>
        <h3 class="text-3xl font-bold text-white">
          Winner: {getWinner()?.name ?? 'Unknown'}!{' '}
          <span class="inline-block w-8 h-8 bg-orange-300 rounded -mb-1">
            <Mark mark={getActivePlayer()?.mark} />
          </span>
        </h3>
      </Show>
      <Show when={isGameTied()}>
        <h3 class="text-3xl font-bold text-white">Tie!</h3>
      </Show>
    </div>
  )
}
