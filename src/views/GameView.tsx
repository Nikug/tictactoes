import { Component } from 'solid-js'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'

const GameView: Component = () => {
  return (
    <div class="mx-auto flex flex-col justify-center items-center bg-stone-700 rounded-xl py-8 px-32">
      <div class="mb-8">
        <GameInformation />
      </div>
      <GameBoard />
    </div>
  )
}

export default GameView
