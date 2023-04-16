import { Component, JSX, splitProps } from 'solid-js'

const classes = `
  appearance-none
  bg-stone-800
  rounded
  accent-amber-500
  caret-amber-500
  h-8
  px-2
`

type Props = JSX.InputHTMLAttributes<HTMLInputElement>

export const TextInput: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['class', 'type'])

  const combinedClasses = () => (local.class ? `${classes} ${local.class}` : classes)

  return <input class={combinedClasses()} type={local.type ?? 'text'} {...others} />
}
