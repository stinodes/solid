import { HashRouter, Route } from '@solidjs/router'
import cx from 'classnames'
import { Layout } from './Layout'
import { Search } from '../search'
import { Text } from '../common/components/Typo'

const Home = () => {
  return (
    <div
      class={cx(
        'max-w-2xl',
        'w-full',
        'sm:mx-auto',
        'sm:rounded-lg',
        'bg-slate-900/50',
        'border-2',
        'border-slate-900/50',
        'p-8',
        'mt-12',
      )}
    >
      <Text class="mb-2">
        To get started, search for content in the search bar.
      </Text>
      <Text class="mb-2">
        <strong>sub:</strong> filters by specific subreddits.
      </Text>
      <Text class="mb-8">
        <strong>sub:crows are they friends</strong> would search the{' '}
        <a class="text-sky-500 underline" href="/search?q=sub:crows">
          "crows"
        </a>{' '}
        subreddit for{' '}
        <a
          class="text-sky-500 underline"
          href="/search?q=sub:crows Are they friends"
        >
          "are they friends"
        </a>
      </Text>
      <Text size="sm" class="opacity-20">
        I think they are.
      </Text>
      .
    </div>
  )
}
export const Routes = (props: {}) => {
  return (
    <HashRouter root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
    </HashRouter>
  )
}
