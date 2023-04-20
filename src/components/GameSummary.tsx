import { useNavigate } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { Game } from '../types'
import { Button } from './Button'

interface Props {
  game: Game
  playerId: string
}

export const GameSummary: Component<Props> = (props) => {
  const navigate = useNavigate()

  const player = () => props.game.players.find((player) => player.id === props.playerId)
  const opponent = () => props.game.players.find((player) => player.id !== props.playerId)
  const isWin = () => props.game.winnerId === props.playerId
  const isLeave = () => props.game.leaverId === props.playerId

  const handleViewGame = () => {
    navigate(`/games/${props.game.id}`)
  }

  return (
    <div class="border rounded py-2 px-4 hover:bg-white/10 flex justify-between items-center mb-1">
      <div class="basis-1/2">
        <p class="text-xl mb-2">
          <span class="font-bold">
            {player()?.name ?? 'Unknown'} ({player()?.mark})
          </span>{' '}
          vs. {opponent()?.name ?? 'Unknown'} ({opponent()?.mark})
        </p>
        <span class="mr-4">
          Grid: {props.game.board.dimensions.x}x{props.game.board.dimensions.y}
        </span>
        <span class="mr-4">Win length: {props.game.winLength}</span>
        <span>Total turns: {props.game.turns.length}</span>
      </div>
      <div class="basis-1/4 text-lg text-stone-300 font-bold">
        <Show when={isWin()} fallback={<p>Defeat</p>}>
          <p class="text-2xl text-orange-300">Victory</p>
        </Show>
        <Show when={isLeave()}>You left</Show>
      </div>
      <Button class="shrink-0" onClick={() => handleViewGame()}>
        View game
      </Button>
    </div>
  )
}
