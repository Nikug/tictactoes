import { useParams } from '@solidjs/router'
import { Component, createEffect, on, Show } from 'solid-js'
import { getUser } from '../Auth'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'
import { userName } from '../components/Username'
import { isGameInit, setGameState } from '../GameLogic'
import { supabase } from '../supabaseClient'
import { Game } from '../types'

const GameView: Component = () => {
  const params = useParams<{ gameId: string }>()

  createEffect(
    on(
      () => params.gameId,
      async () => {
        try {
          const { data, error } = await supabase
            .from('active-games')
            .select<'', Game>()
            .eq('id', params.gameId)
            .single()

          if (!data) return

          if (!data.players.some((player) => player.id === getUser().id)) {
            // Join the game
            data.players.push({ id: getUser().id, name: userName(), mark: 'o' })

            const update = await supabase
              .from('active-games')
              .update({ players: data.players, state: 'active' })
              .eq('id', params.gameId)
            if (update.error) throw update.error
          }

          if (error) throw error
        } catch (error) {
          console.error(error)
        }

        const channel = supabase
          .channel('changes')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'active-games',
              filter: `id=eq.${params.gameId}`,
            },
            (payload) => setGameState(payload.new)
          )
          .subscribe()

        return () => channel.unsubscribe()
      }
    )
  )

  return (
    <div class="mx-auto flex flex-col justify-center items-center bg-stone-700 rounded-xl py-8 px-32">
      <div class="mb-8">
        <GameInformation />
      </div>
      <Show when={isGameInit()}>Waiting on an opponent...</Show>
      <Show when={!isGameInit()}>
        <GameBoard />
      </Show>
    </div>
  )
}

export default GameView
