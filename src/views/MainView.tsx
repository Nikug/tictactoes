import { Component } from 'solid-js'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'

export const MainView: Component = () => {
  return (
    <div class="w-screen h-screen overflow-hidden flex justify-center items-center bg-stone-800">
      <div class="mx-auto w-6xl flex flex-col justify-center items-center bg-stone-700 rounded-xl p-8">
        <div class="mb-16 mt-8">
          <GameInformation />
        </div>
        <GameBoard />
      </div>
    </div>
  )
}
