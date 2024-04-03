import { createResource, createSignal } from 'solid-js'
import { TextInput } from '../common/components/TextInput'
import { Button } from '../common/components/Button'
import { A, useNavigate, useSearchParams } from '@solidjs/router'
import cx from 'classnames'

const toSearchParams = (search: string) => new URLSearchParams([['q', search]])

export const Search = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = createSignal<string>(params.q || '', {
    name: 'Search value',
  })
  const [isFocused, setFocused] = createSignal(false, { name: 'Focus' })
  const [isHovered, setHovered] = createSignal(false, { name: 'Hover' })

  const [results] = createResource<{ suggestions: string[] }, string>(
    searchValue,
    () => ({ suggestions: [] }),
  )

  const suggestions = () => results()?.suggestions

  const onSearch = (e: Event) => {
    e.preventDefault()
    navigate(`/search?${toSearchParams(searchValue())}`)
  }

  return (
    <form class={cx('w-full', 'relative', 'flex')} onSubmit={onSearch}>
      <div class={cx('w-full', 'flex', 'flex-col', 'mr-2')}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 50)}
          class={cx('w-full', 'font-medium')}
          value={searchValue()}
          onInput={v => setSearchValue(v.target.value)}
          placeholder="Search..."
        />
        {(isHovered() || isFocused()) && suggestions()?.length && (
          <div class="relative">
            <div
              class={cx(
                'absolute',
                'left-0',
                'right-0',
                'top-2',
                'px-4',
                'py-2',
                'rounded-md',
                'bg-slate-900',
              )}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {suggestions()?.map(str => {
                return (
                  <A
                    onClick={() => setSearchValue(str)}
                    href={`/search?${toSearchParams(str)}`}
                    class={cx(
                      'block',
                      'rounded-md',
                      'hover:bg-slate-800/40',
                      'px-4',
                      'py-2',
                      'text-gray-200',
                    )}
                  >
                    {str}
                  </A>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <Button size="sm" type="submit">
        Search
      </Button>
    </form>
  )
}
