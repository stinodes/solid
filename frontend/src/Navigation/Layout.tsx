import { JSX } from 'solid-js'
import cx from 'classnames'
import { Nav } from './Nav'

type Props = {
  children?: JSX.Element
}
export const Layout = (props: Props) => {
  return (
    <>
      <div
        class={cx([
          'w-full',
          'min-h-svh',
          'max-h-svh',
          'bg-gray-950',
          'bg-gradient-to-bl',
          'from-slate-900',
          'via-gray-950',
          'to-gray-950',
          'pt-20',
          'flex',
          'flex-col',
          'overflow-auto',
        ])}
      >
        {props.children}
      </div>
      <Nav />
    </>
  )
}
