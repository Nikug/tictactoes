import { Component, Show } from 'solid-js'
import { isSignedIn } from '../Auth'
import { Button } from '../components/Button'
import { GameSettings } from '../components/GameSettings'
import { Login } from '../components/Login'
import { Username } from '../components/Username'

const MainView: Component = () => {
  return (
    <div class="flex justify-center gap-8 bg-stone-700 p-8 rounded-xl divide-x-2">
      <div class="w-lg flex flex-col items-center divide-y-2">
        <h2 class="font-bold text-3xl mb-8">Play!</h2>
        <Show when={isSignedIn()}>
          <Button class="mb-8">Join game</Button>
          <div class="pt-4 flex flex-col items-center">
            <GameSettings />
            <Button class="mt-4">Create game</Button>
          </div>
        </Show>
      </div>
      <div class="w-lg flex justify-center">
        <div class="flex flex-col items-center">
          <h2 class="font-bold text-3xl mb-8">Settings</h2>
          <Show when={isSignedIn()}>
            <Username />
          </Show>
          <Show when={!isSignedIn()}>
            <Login />
          </Show>
        </div>
      </div>
    </div>
  )
}

export default MainView
