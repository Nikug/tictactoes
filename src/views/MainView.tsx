import { Component } from 'solid-js'
import { GameBoard } from '../components/GameBoard'

export const MainView: Component = () => {
  return (
    <div class="w-screen h-screen overflow-hidden flex justify-center items-center bg-stone-800">
      <div class="mx-auto w-6xl flex justify-center items-center bg-stone-700 rounded-xl p-8">
        <GameBoard />
      </div>
    </div>
  )
}
