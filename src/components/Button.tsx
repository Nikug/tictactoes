import { Component, JSX, splitProps } from 'solid-js'

const classes = `
  rounded
  bg-amber-600
  hover:bg-amber-700
  text-white
  font-bold
  px-4
  py-2
`

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  const combinedClasses = () => (local.class ? `${classes} ${local.class}` : classes)

  return (
    <button class={combinedClasses()} {...others}>
      {local.children}
    </button>
  )
}
