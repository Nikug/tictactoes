import { useNavigate } from '@solidjs/router'
import { Component, createSignal, Show } from 'solid-js'
import { getUser, isSignedIn } from '../Auth'
import { Button } from '../components/Button'
import { GameSettings } from '../components/GameSettings'
import { Login } from '../components/Login'
import { NavBar } from '../components/NavBar'
import { userName, Username } from '../components/Username'
import { createGame } from '../GameLogic'
import { gameSettings } from '../GameSettings'
import { Player } from '../types'
import { createGame as apiCreateGame, getWaitingGame } from '../api/games'

const MainView: Component = () => {
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null)
  const navigate = useNavigate()

  const createNewGame = async () => {
    const user = getUser()
    if (!user) return

    const name = userName()
    const player: Player = { id: user.id, name, mark: 'x' }

    const game = createGame(gameSettings())
    game.players.push(player)

    try {
      const gameId = await apiCreateGame(game)
      navigate(`/games/${gameId}`)
    } catch (error) {
      console.error(error)
    }
  }

  const joinGame = async () => {
    try {
      const gameId = await getWaitingGame()
      if (!gameId) {
        setErrorMessage('No games found!')
        return
      }

      navigate(`/games/${gameId}`)
    } catch (error) {
      setErrorMessage('No games found!')
      console.error(error)
    }
  }

  return (
    <>
      <NavBar />
      <div class="flex justify-center gap-8 bg-stone-700 p-8 rounded-xl divide-x-2">
        <div class="w-lg">
          <h2 class="font-bold text-3xl mb-8 text-center">Play!</h2>
          <div class="divide-y-2 flex flex-col items-center">
            <Show when={isSignedIn()} fallback={'Sign in to play!'}>
              <div class="mb-8 flex flex-col items-center">
                <Button onClick={() => joinGame()}>Join a random game</Button>
                <Show when={errorMessage()}>
                  <p>{errorMessage()}</p>
                </Show>
              </div>
              <div class="pt-4 flex flex-col items-center">
                <GameSettings />
                <Button onClick={() => createNewGame()} class="mt-4">
                  Create game
                </Button>
              </div>
            </Show>
          </div>
        </div>
        <div class="w-lg">
          <Show when={isSignedIn()}>
            <h2 class="font-bold text-3xl mb-8 text-center">Settings</h2>
          </Show>
          <div class="flex flex-col items-center">
            <Show when={isSignedIn()}>
              <Username />
            </Show>
            <Show when={!isSignedIn()}>
              <Login />
            </Show>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainView
