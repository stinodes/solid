import cx from 'classnames'
import { JSX } from 'solid-js'

const backgrounds = {
  slate: ['bg-slate-900/50', 'hover:bg-slate-900/100', 'border-slate-900/50'],
  red: ['bg-red-900/20', 'hover:bg-red-900/40', 'border-red-900/40'],
}

type StyleProps = {
  bg?: keyof typeof backgrounds
}
type Props = StyleProps & JSX.IntrinsicElements['div']
export const Card = ({ bg = 'slate', ...props }: Props) => {
  return (
    <div
      {...props}
      class={cx(
        'px-4',
        'py-2',
        'sm:px-8',
        'sm:py-4',
        'border-2',
        'transition-colors',
        'flex',
        backgrounds[bg],
        props.class,
      )}
    />
  )
}
