import { Component, Show } from 'solid-js'
import type { Vector2, Box as BoxType } from '../types'

interface Props {
  state: BoxType
  onClick(position: Vector2): void
}

export const Box: Component<Props> = (props) => {
  return (
    <div
      class="w-full h-full border hover:bg-white/25 cursor-pointer"
      onClick={() => props.onClick(props.state.position)}
    >
      <Show when={props.state.mark}>{props.state.mark}</Show>
    </div>
  )
}
