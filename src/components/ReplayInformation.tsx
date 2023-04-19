import { Component } from 'solid-js'
import { gameState } from '../GameLogic'
import { Box } from '../types'
import { PlayerNameWithMark } from './PlayerNameWithMark'

interface Props {
  turn: Box
  turnIndex: number
}

export const ReplayInformation: Component<Props> = (props) => {
  const getPlayer = (playerId: string) => gameState.players.find((player) => player.id === playerId)

  return (
    <div class="w-full text-center">
      <h3 class="text-3xl font-bold">
        Turn {props.turnIndex + 1}: <PlayerNameWithMark player={getPlayer(props.turn.playerId)} />
      </h3>
    </div>
  )
}
