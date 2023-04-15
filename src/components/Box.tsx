import { Component, Show } from 'solid-js'
import type { Vector2, Box as BoxType } from '../types'

const classes = (hasMark: boolean, isWinning: boolean) => `
  w-full
  h-full
  border
  flex
  justify-center
  items-center
  ${!isWinning ? 'hover:bg-white/25' : ''}
  ${hasMark ? 'cursor-not-allowed' : 'cursor-pointer'}
  ${hasMark && !isWinning ? 'bg-white/20' : ''}
  ${isWinning ? 'bg-green-500' : ''}
`

interface Props {
  state: BoxType
  isWinning?: boolean
  onClick(position: Vector2): void
}

export const Box: Component<Props> = (props) => {
  return (
    <div
      class={classes(!!props.state.mark, props.isWinning)}
      onClick={() => props.onClick(props.state.position)}
    >
      <Show when={props.state.mark === 'x'}>
        <div class="i-ri-close-line w-9 h-9 text-blue-900" />
      </Show>
      <Show when={props.state.mark === 'o'}>
        <div class="i-ri-checkbox-blank-circle-line w-7 h-7 text-red-900" />
      </Show>
    </div>
  )
}
