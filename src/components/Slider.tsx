import { Component, JSX, splitProps } from 'solid-js'

const classes = `
  h-2
  rounded
  bg-stone-800
  accent-amber-500
`

type Props = JSX.InputHTMLAttributes<HTMLInputElement>

export const Slider: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['class'])

  const combinedClasses = () => (local.class ? `${classes} ${local.class}` : classes)

  return <input type="range" class={combinedClasses()} {...others} />
}
