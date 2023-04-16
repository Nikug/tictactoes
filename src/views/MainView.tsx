import { Component } from 'solid-js'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'
import { GameSettings } from '../components/GameSettings'

export const MainView: Component = () => {
  return (
    <div class="mx-auto w-7xl flex flex-col justify-center items-center bg-stone-700 rounded-xl p-8">
      <div class="mb-8">
        <GameInformation />
      </div>
      <GameBoard />
      <div class="mt-8">
        <GameSettings />
      </div>
    </div>
  )
}
