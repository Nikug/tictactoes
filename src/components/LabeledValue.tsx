import { Component } from 'solid-js'

interface Props {
  label: string
  value: string | number | null | undefined
}

export const LabeledValue: Component<Props> = (props) => {
  return (
    <div class="text-center">
      <p class="text-4xl font-bold">{props.value}</p>
      <p class="text-xl">{props.label}</p>
    </div>
  )
}
