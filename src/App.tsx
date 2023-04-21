import { Component, createEffect, lazy } from 'solid-js'
import { Route, Routes } from '@solidjs/router'
import '@unocss/reset/tailwind.css'
import { supabase } from './supabase'
import { setAuthSession } from './Auth'

const game = lazy(() => import('./views/GameView'))
const main = lazy(() => import('./views/MainView'))
const profile = lazy(() => import('./views/ProfileView'))

const classes = `
  w-screen
  min-h-screen
  overflow-auto
  flex
  flex-col
  justify-center
  items-center
  bg-stone-800
  text-white
  p-8
  border-black
`

const App: Component = () => {
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session)
    })
  })

  return (
    <div style={{ 'background-image': 'url("tic-tac-toe.svg")' }} class={classes}>
      <Routes>
        <Route path="/" component={main} />
        <Route path="/games/:gameId" component={game} />
        <Route path="/profiles/:userId" component={profile} />
      </Routes>
    </div>
  )
}

export default App
