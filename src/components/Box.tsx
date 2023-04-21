import { Component } from 'solid-js'
import type { Vector2, Box as BoxType } from '../types'
import { Mark } from './Mark'

const classes = (hasMark: boolean, isWinning: boolean, isLatestTurn: boolean) => {
  let background = 'hover:bg-white/20'
  if (hasMark) background = 'bg-white/20'
  if (isWinning) background = 'bg-orange-400'
  if (isLatestTurn) background = 'bg-amber-400'

  return `
  w-full
  h-full
  border
  flex
  justify-center
  items-center
  ${hasMark ? 'cursor-not-allowed' : 'cursor-pointer'}
  ${background}
`
}

interface Props {
  state: BoxType
  isWinning?: boolean
  isLatestTurn?: boolean
  onClick(position: Vector2): void
}

export const Box: Component<Props> = (props) => {
  return (
    <div
      class={classes(!!props.state.mark, !!props.isWinning, !!props.isLatestTurn)}
      onClick={() => props.onClick(props.state.position)}
    >
      <Mark mark={props.state.mark} />
    </div>
  )
}
