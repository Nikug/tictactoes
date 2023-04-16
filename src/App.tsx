import { Component, createEffect } from 'solid-js'
import { Route, Routes } from '@solidjs/router'
import { MainView } from './views/MainView'
import '@unocss/reset/tailwind.css'
import { LoginView } from './views/LoginView'
import { setAuthSession, supabase } from './supabaseClient'

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
    <div class="w-screen h-screen overflow-auto flex justify-center items-center bg-stone-800 text-white">
      <Routes>
        <Route path="/" component={MainView} />
        <Route path="/login" component={LoginView} />
      </Routes>
    </div>
  )
}

export default App
