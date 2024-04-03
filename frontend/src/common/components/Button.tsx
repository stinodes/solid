import cx from 'classnames'
import { JSX } from 'solid-js'
import { focusRing } from '../styles/focus'

const backgrounds = {
  violet: ['bg-violet-700', 'hover:bg-violet-500', 'active:bg-violet-900'],
  slate: ['bg-slate-700', 'hover:bg-slate-500', 'active:bg-slate-900'],
  sky: ['bg-sky-700', 'hover:bg-sky-500', 'active:bg-sky-900'],
  blue: ['bg-blue-700', 'hover:bg-blue-500', 'active:bg-blue-900'],
}

type Props = {
  bg?: keyof typeof backgrounds
  size?: 'sm' | 'md' | 'lg'
}
export const Button = ({
  bg = 'sky',
  size = 'md',
  ...props
}: JSX.IntrinsicElements['button'] & Props) => {
  return (
    <button
      {...props}
      class={cx(
        backgrounds[bg],
        [
          'flex',
          'text-gray-200',
          'px-4',
          'rounded-md',
          'font-medium',
          'transition-colors',
          'justify-center',

          focusRing(),
          props.class,
        ],
        {
          'py-2': size === 'sm',
          'py-4': size === 'md',
          'py-8': size === 'lg',
        },
      )}
    />
  )
}
