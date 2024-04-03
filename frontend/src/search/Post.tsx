import cx from 'classnames'
import { Post as PostType } from '../api'
import { Text } from '../common/components/Typo'
import { createEffect, createMemo, createSignal } from 'solid-js'
import { Button } from '../common/components/Button'
import './Post.css'

type Props = {
  post: PostType
}

const urlForMedia = (src: string) => {
  const url = new URL(src)
  return `https://i.redd.it${url.pathname}`
}

export const Post = ({ post }: Props) => {
  const [isFullsize, setFullsize] = createSignal(
    localStorage.getItem('post-image-fullsize') === 'true' || false,
  )

  createEffect(() => {
    localStorage.setItem('post-image-fullsize', String(isFullsize()))
  })

  const media = createMemo(() => {
    if (post.media_metadata) {
      return Object.values(post.media_metadata).map(m => ({
        url: urlForMedia(m.s.u),
        width: m.s.x,
        height: m.s.y,
      }))
    }
    if (post.preview) {
      return post.preview.images.map(m => ({
        url: urlForMedia(m.source.url),
        width: m.source.width,
        height: m.source.height,
      }))
    }
    return null
  })

  const content = createMemo(() => {
    const doc = new DOMParser().parseFromString(post.selftext_html, 'text/html')
    return doc.documentElement.textContent || ''
  })

  return (
    <>
      <div class={cx('flex', 'flex-1', 'flex-col', 'max-w-full')}>
        <Text size="md" class="font-bold mb-4">
          {post.title}
        </Text>
        <Text size="md" class="" innerHTML={content() || ''}></Text>
        {media()?.length && (
          <div class="flex flex-wrap relative">
            {media()?.map((m, i, arr) => (
              <img
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setFullsize(p => !p)
                }}
                class={cx(
                  'self-center',
                  'mt-8',
                  'rounded-md',
                  'max-w-full',
                  isFullsize() ? 'w-full' : ['max-h-96', 'max-w-96'],
                  { 'mr-4': i !== arr.length - 1 },
                )}
                src={urlForMedia(m.url) || ''}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
