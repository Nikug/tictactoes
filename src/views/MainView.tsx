import { Component, Show } from 'solid-js'
import { isSignedIn } from '../Auth'
import { Button } from '../components/Button'
import { GameSettings } from '../components/GameSettings'
import { Login } from '../components/Login'
import { Username } from '../components/Username'

export const MainView: Component = () => {
  return (
    <div class="flex justify-center gap-8 bg-stone-700 p-8 rounded-xl divide-x-2">
      <div class="w-lg flex flex-col items-center">
        <Show when={isSignedIn()}>
          <GameSettings />
          <Button>Join game</Button>
        </Show>
      </div>
      <div class="w-lg flex justify-center">
        <Show when={isSignedIn()}>
          <Username />
        </Show>
        <Show when={!isSignedIn()}>
          <Login />
        </Show>
      </div>
    </div>
  )
}
