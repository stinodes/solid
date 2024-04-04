import { useSearchParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { createPostsResource } from '../api'
import { Button } from '../common/components/Button'
import { Result } from './Result'
import { Spinner } from '../common/components/Spinner'
import { Text } from '../common/components/Typo'
import { Card } from '../common/components/Card'

export const Search = (props: {}) => {
  const [params] = useSearchParams()

  const { posts, fetchMore, isLoading, hasError } = createPostsResource(params)

  createEffect(() => {
    console.log(isLoading())
  })

  return (
    <div class="max-w-4xl w-full mx-auto pb-32">
      {posts().map(p => (
        <Result post={p} />
      ))}

      <div class="flex flex-col pb-8">
        {hasError() && (
          <Card bg="red" class="my-2">
            <Text>
              The request might have timed out, or the requested data does not
              exist
            </Text>
            <Text>Try again later, or look up something else!</Text>
          </Card>
        )}

        <Button bg="sky" disabled={isLoading()} onClick={fetchMore}>
          {isLoading()}
          {isLoading() ? <Spinner color="white" /> : 'More!'}
        </Button>
      </div>
    </div>
  )
}
