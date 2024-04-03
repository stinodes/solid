import { Route, Router } from '@solidjs/router'
import { Layout } from './Layout'
import { Search } from '../search'

export const Routes = (props: {}) => {
  return (
    <Router root={Layout}>
      <Route path="/search" component={Search} />
    </Router>
  )
}
