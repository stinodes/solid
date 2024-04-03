import { JSX } from 'solid-js'
import cx from 'classnames'

const sizes = {
  sm: ['sm:text-sm', 'text-xs'],
  md: ['sm:text-md', 'text-sm'],
  lg: ['sm:text-md', 'text-md'],
}

type TextStyle = { size: keyof typeof sizes }
type TextProps = TextStyle & JSX.IntrinsicElements['p']

export const Text = ({ size, ...props }: TextProps) => {
  return (
    <p
      {...props}
      class={cx(
        'text-slate-950',
        'dark:text-slate-200',
        sizes[size],
        props.class,
      )}
    />
  )
}
