import cx from 'classnames'

const colors = {
  slate: ['border-slate-950/30', 'border-t-slate-950'],
  white: ['border-slate-100/30', 'border-t-slate-100'],
  sky: ['border-sky-500/30', 'border-t-sky-500'],
}
type Props = {
  color?: keyof typeof colors
}

export const Spinner = ({ color = 'sky' }: Props) => {
  return (
    <div
      class={cx(
        'w-8',
        'h-8',
        'rounded-full',
        'border-4',
        'animate-spin',
        colors[color],
      )}
    />
  )
}
