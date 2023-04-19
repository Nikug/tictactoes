import { Component, JSX, splitProps } from 'solid-js'

const classes = (secondary: boolean | undefined) => `
  rounded
  ${secondary ? 'bg-stone-500 hover:bg-stone-600' : 'bg-amber-600 hover:bg-amber-700'}
  text-white
  font-bold
  px-4
  py-2
`

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  const combinedClasses = () =>
    local.class ? `${classes(props.secondary)} ${local.class}` : classes(props.secondary)

  return (
    <button class={combinedClasses()} {...others}>
      {local.children}
    </button>
  )
}
