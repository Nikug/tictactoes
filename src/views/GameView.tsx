import { useParams } from '@solidjs/router'
import { RealtimeChannel } from '@supabase/supabase-js'
import { Component, createEffect, on, Show } from 'solid-js'
import { addPlayerToGameAndStart, getGameWithId, subscribeToGame } from '../api/activeGames'
import { getUser } from '../Auth'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'
import { GameNavBar } from '../components/GameNavBar'
import { GameRuleInformation } from '../components/GameRuleInformation'
import { userName } from '../components/Username'
import { isGameInit, setGameState } from '../GameLogic'
import { Game } from '../types'

const GameView: Component = () => {
  const params = useParams<{ gameId: string }>()

  createEffect(
    on(
      () => params.gameId,
      async () => {
        let game: Game | null = null
        let channel: RealtimeChannel | null = null
        const user = getUser()

        try {
          game = await getGameWithId(params.gameId)
          if (!game) return
          setGameState(game)

          if (game.state === 'init' && !game.players.some((player) => player.id === user.id)) {
            const newGame = await addPlayerToGameAndStart(params.gameId, [
              ...game.players,
              { id: user.id, name: userName(), mark: 'o' },
            ])

            setGameState(newGame)
          }
        } catch (error) {
          console.error(error)
        }

        if (game && game.state !== 'end') {
          channel = subscribeToGame(params.gameId, setGameState)
        }

        return () => channel?.unsubscribe()
      }
    )
  )

  return (
    <>
      <GameNavBar />
      <div class="mx-auto flex flex-col justify-center items-center bg-stone-700 rounded-xl py-8 px-32">
        <div class="mb-8">
          <GameInformation />
        </div>
        <Show when={isGameInit()}>
          <p class="text-xl font-bold">Waiting on an opponent...</p>
        </Show>
        <Show when={!isGameInit()}>
          <GameBoard />
          <GameRuleInformation />
        </Show>
      </div>
    </>
  )
}

export default GameView
