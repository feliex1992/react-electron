import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { makeDashboard, makeLogin } from '../factories/pages'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoute, currentAccountState } from '@/presentation/components'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <PrivateRoute path="/" exact component={makeDashboard} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
