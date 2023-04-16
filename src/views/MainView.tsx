import { Component } from 'solid-js'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'
import { GameSettings } from '../components/GameSettings'

export const MainView: Component = () => {
  return (
    <div class="w-screen h-screen overflow-auto flex justify-center items-center bg-stone-800 text-white">
      <div class="mx-auto w-6xl flex flex-col justify-center items-center bg-stone-700 rounded-xl p-16">
        <div class="mb-16">
          <GameInformation />
        </div>
        <GameBoard />
        <div class="mt-16">
          <GameSettings />
        </div>
      </div>
    </div>
  )
}
