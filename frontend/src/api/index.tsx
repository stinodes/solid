import { createEffect, createMemo, createSignal } from 'solid-js'

const fetchJson = (url: string) => fetch(url).then(r => r.json())

const baseUrl = 'https://api.pullpush.io/reddit/search'

export type PostSearchConfig = {
  q?: string
  subreddit?: string
  sort?: 'score' | 'num_comments' | 'created_utc'
  after?: string
  before?: string
}
export type MediaType = { y: number; x: number; u: string }
export type MediaMeta = {
  e: string
  id: string
  m: string
  p: MediaType[]
  s: MediaType
}
export type PreviewImage = { url: string; width: number; height: number }
export type Preview = {
  images: {
    id: string
    source: PreviewImage
    resolutions: PreviewImage[]
  }[]
}
export type Post = {
  id: string
  subreddit: string
  subreddit_id: string
  author: string

  title: string
  selftext: string
  selftext_html: string
  thumbnail: string
  url: string
  score: number

  media_metadata: { [id: string]: MediaMeta }
  preview: Preview

  media: null
  permalink: string

  spoiler: boolean
  is_video: boolean
  over_18: boolean
  removed_by_category: null | string

  created_utc: number
}

export const fetchPosts = (config: PostSearchConfig) => {
  const params = new URLSearchParams()
  params.set('size', '' + 10)
  params.set('sort_type', 'created_utc')
  params.set('sort', 'desc')

  if (config.q) {
    const query = /(sub:[a-z0-9]+)/
    const q = config.q
    const matches = q.match(query)
    if (matches && matches[0])
      params.set('subreddit', matches[0].replace('sub:', ''))
    const cleanedQ = q.replace(query, '')

    cleanedQ && params.set('q', cleanedQ)
  }

  config.subreddit && params.set('subreddit', config.subreddit)
  config.sort && params.set('sort_type', config.sort)
  config.after && params.set('after', config.after)
  config.before && params.set('before', config.before)
  return fetchJson(`${baseUrl}/submission/?${params.toString()}`)
}

export const createPostsResource = (search: Partial<PostSearchConfig>) => {
  const [posts, setPosts] = createSignal<Post[]>([])
  const [isLoading, setLoading] = createSignal(false)

  const nextPage = createMemo(() => {
    const postsList = posts()
    const lastPost = postsList[postsList.length - 1]

    if (!lastPost) return null

    const diff = `${Math.floor(Date.now() / 1000) - lastPost.created_utc + 5}s`
    return diff
  })

  const fetchMore = async (next: boolean) => {
    setLoading(true)
    if (!next) setPosts([])

    const configObj = { ...search }
    if (next) configObj.before = nextPage() || undefined

    const { data } = await fetchPosts(configObj)

    setPosts(oldData => (configObj.before ? [...oldData, ...data] : data))
    setLoading(false)
  }

  createEffect(() => {
    if (search && (search.q || search.subreddit)) {
      fetchMore(false)
    }
  })

  return {
    posts,
    fetch: () => fetchMore(false),
    fetchMore: () => fetchMore(true),
    isLoading,
  }
}
