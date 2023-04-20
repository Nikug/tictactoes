import { Component } from 'solid-js'
import { Player } from '../types'
import { Mark } from './Mark'

interface Props {
  player: Player | undefined
}

export const PlayerNameWithMark: Component<Props> = (props) => {
  return (
    <p class="inline-block">
      {props.player?.name ?? 'Unknown'}{' '}
      <span class="inline-block w-8 h-8 bg-orange-300 rounded -mb-1">
        <Mark mark={props.player?.mark} />
      </span>
    </p>
  )
}
