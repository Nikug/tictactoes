import { Component, Show } from 'solid-js'
import { Mark as MarkType } from '../types'

interface Props {
  mark?: MarkType
}

export const Mark: Component<Props> = (props) => {
  return (
    <div class="h-full w-full">
      <Show when={props.mark === 'x'}>
        <div class="i-ri-close-line w-full h-full text-blue-900" />
      </Show>
      <Show when={props.mark === 'o'}>
        <div class="i-ri-checkbox-blank-circle-line w-full h-full text-red-900" />
      </Show>
    </div>
  )
}
