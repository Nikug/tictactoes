import { Component } from 'solid-js'
import type { Vector2, Box as BoxType } from '../types'
import { Mark } from './Mark'

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
  ${isWinning ? 'bg-orange-400' : ''}
`

interface Props {
  state: BoxType
  isWinning?: boolean
  onClick(position: Vector2): void
}

export const Box: Component<Props> = (props) => {
  return (
    <div
      class={classes(!!props.state.mark, !!props.isWinning)}
      onClick={() => props.onClick(props.state.position)}
    >
      <Mark mark={props.state.mark} />
    </div>
  )
}
