import cx from 'classnames'

export const focusRing = (offsetColor: string = 'ring-offset-slate-950') =>
  cx(
    'focus:outline-none',
    'focus:ring',
    'focus:ring-sky-700',
    offsetColor,
    'ring-offset-2',
  )
