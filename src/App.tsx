import { Component, createEffect } from 'solid-js'
import { Route, Routes } from '@solidjs/router'
import { MainView } from './views/MainView'
import '@unocss/reset/tailwind.css'
import { LoginView } from './views/LoginView'
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
    <div class="w-screen min-h-screen overflow-auto flex flex-col justify-center items-center bg-stone-800 text-white p-8">
      <NavBar />
      <Routes>
        <Route path="/" component={MainView} />
        <Route path="/login" component={LoginView} />
      </Routes>
    </div>
  )
}

export default App
