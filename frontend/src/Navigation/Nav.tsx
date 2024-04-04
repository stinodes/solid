import { Search } from './Search'
import cx from 'classnames'
import LOGO from '../assets/solid-reader.png'

export const Nav = () => {
  return (
    <nav
      class={cx([
        'fixed',
        'top-0',
        'left-0',
        'right-0',
        'h-20',
        'bg-gray-50',
        'dark:bg-gray-950',
        'dark:border-b-gray-900',
        'dark:shadow-slate-900/40\n',
        'shadow-lg',
        'border-b-gray-50',
        'border-b-2',
        'border-solid',
        'px-12',
      ])}
    >
      <div class={cx(['flex', 'items-center', 'h-full', 'justify-between'])}>
        <div class={cx('hidden', 'sm:flex', 'items-center', 'w-64')}>
          <img
            class={cx('w-24', 'h-24', 'top-4', 'relative')}
            style={{
              // 'image-rendering': 'pixelated',
              filter: 'drop-shadow(0 10px 15px rgb(15 23 42))',
            }}
            alt="Blowpipe"
            src={LOGO}
          />
        </div>

        <div class="flex-1 sm:w-1/2 sm:flex-0">
          <Search />
        </div>

        <div class="hidden sm:flex w-64" />
      </div>
    </nav>
  )
}
