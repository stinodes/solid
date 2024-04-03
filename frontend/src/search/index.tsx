import { useSearchParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { createPostsResource } from '../api'
import { Button } from '../common/components/Button'
import { Result } from './Result'
import { Spinner } from '../common/components/Spinner'

export const Search = (props: {}) => {
  const [params] = useSearchParams()

  const { posts, fetchMore, isLoading } = createPostsResource(params)

  createEffect(() => console.log(posts()))

  return (
    <div class="max-w-4xl w-full mx-auto pb-32">
      {posts().map(p => (
        <Result post={p} />
      ))}
      <div class="flex flex-col pb-8">
        <Button bg="sky" onClick={!isLoading() ? fetchMore : undefined}>
          {console.log(isLoading())}
          {isLoading() ? <Spinner color="white" /> : 'More!'}
        </Button>
      </div>
    </div>
  )
}
