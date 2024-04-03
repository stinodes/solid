import { HashRouter, Route } from '@solidjs/router'
import { Layout } from './Layout'
import { Search } from '../search'

export const Routes = (props: {}) => {
  return (
    <HashRouter root={Layout}>
      <Route path="/search" component={Search} />
    </HashRouter>
  )
}
