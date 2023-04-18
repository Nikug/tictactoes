import { useNavigate } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { leaveGame } from '../api/games'
import { gameState, isGameActive, isGameEnd, isGameInit } from '../GameLogic'
import { Button } from './Button'

export const GameNavBar: Component = () => {
  const navigate = useNavigate()

  const handleLeaveGame = async () => {
    try {
      await leaveGame(gameState)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div class="h-16" />
      <div class="absolute top-0 left-0 right-0 h-16 grid grid-col-3 grid-cols-auto items-end px-16">
        <div class="col-start-2 col-span-1">
          <h1 class="font-bold text-5xl text-center">TicTacToes</h1>
        </div>
        <div class="col-start-3 col-span-1 flex justify-end">
          <Show when={isGameActive() || isGameInit()}>
            <Button onClick={() => handleLeaveGame()}>Leave game</Button>
          </Show>
          <Show when={isGameEnd()}>
            <Button onClick={() => navigate('/')}>Return to main menu</Button>
          </Show>
        </div>
      </div>
    </>
  )
}
