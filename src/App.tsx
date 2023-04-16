import { Component, createEffect } from 'solid-js'
import { Route, Routes } from '@solidjs/router'
import { GameView } from './views/GameView'
import '@unocss/reset/tailwind.css'
import { MainView } from './views/MainView'
import { supabase } from './supabaseClient'
import { NavBar } from './components/NavBar'
import { setAuthSession } from './Auth'

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
    <div class="w-screen min-h-screen overflow-auto flex flex-col justify-center items-center bg-stone-800 text-white p-8 border-black">
      <NavBar />
      <Routes>
        <Route path="/" component={MainView} />
        <Route path="/game" component={GameView} />
      </Routes>
    </div>
  )
}

export default App
