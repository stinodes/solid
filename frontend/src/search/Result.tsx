import cx from 'classnames'
import { Post as PostType } from '../api'
import { Text } from '../common/components/Typo'
import { createSignal } from 'solid-js'
import { Post } from './Post'
import { Card } from '../common/components/Card'

type Props = {
  post: PostType
}
export const Result = ({ post }: Props) => {
  const [open, setOpen] = createSignal(false)

  const hasThumbnail = !['self', 'default', 'nsfw'].includes(post.thumbnail)
  const isDeleted =
    !!post.removed_by_category ||
    ['[removed]', '[deleted]'].includes(post.selftext)

  return (
    <a
      href={`/post/${post.id}`}
      onClick={e => {
        e.preventDefault()
        setOpen(o => !o)
      }}
    >
      <Card class={cx('my-2', { 'border-l-red-500': isDeleted })}>
        {open() && <Post post={post} />}
        {!open() && (
          <>
            {hasThumbnail && (
              <div
                class={cx(
                  'w-16',
                  'sm:w-24',
                  'flex-shrink-0',
                  'self-start',
                  'aspect-square',
                  'bg-cover',
                  'bg-center',
                  'bg-slate-800/30',
                  'mr-4',
                  'rounded-md',
                )}
                style={`background-image: url(${post.thumbnail === 'image' ? post.url : post.thumbnail})`}
              />
            )}
            <div class="flex-1 overflow-hidden">
              <Text size="md" class="font-bold mb-2">
                {post.title}
              </Text>
              <Text size="sm" class="line-clamp-2 opacity-70">
                {post.selftext.replace(/\*/g, '')}
              </Text>
            </div>
          </>
        )}
      </Card>
    </a>
  )
}
