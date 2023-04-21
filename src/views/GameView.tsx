import { useParams } from '@solidjs/router'
import { RealtimeChannel } from '@supabase/supabase-js'
import { Component, createEffect, createSignal, on, Show } from 'solid-js'
import { addPlayerToGameAndStart, getGameWithId, subscribeToGame } from '../api/games'
import { getUser } from '../Auth'
import { Button } from '../components/Button'
import { GameBoard } from '../components/GameBoard'
import { GameInformation } from '../components/GameInformation'
import { GameNavBar } from '../components/GameNavBar'
import { GameRuleInformation } from '../components/GameRuleInformation'
import { ReplayInformation } from '../components/ReplayInformation'
import { userName } from '../components/Username'
import {
  isGameEnd,
  isGameInit,
  startReplay,
  setGameState,
  replayPlayTurn,
  replayUndoTurn,
  gameState,
  isGameReplay,
} from '../GameLogic'
import { clamp } from '../mathUtils'
import { Box, Game } from '../types'

const GameView: Component = () => {
  const params = useParams<{ gameId: string }>()
  const [replayTurnIndex, setReplayTurnIndex] = createSignal(0)

  createEffect(
    on(
      () => params.gameId,
      async () => {
        let game: Game | null = null
        let channel: RealtimeChannel | null = null
        const user = getUser()
        if (!user) return

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

  const handleShowReplay = () => {
    setReplayTurnIndex(0)
    startReplay()
    replayPlayTurn(replayTurnIndex())
  }

  const handleStopShowingReplay = async () => {
    const game = await getGameWithId(gameState.id)
    if (!game) return
    setGameState(game)
  }

  const changeReplayTurn = (increment: -1 | 1) => {
    const newIndex = clamp(replayTurnIndex() + increment, 0, gameState.turns.length - 1)
    if (newIndex === replayTurnIndex()) {
      return
    } else {
      setReplayTurnIndex(newIndex)
    }

    if (increment === 1) replayPlayTurn(replayTurnIndex())
    if (increment === -1) replayUndoTurn(replayTurnIndex() + 1)
  }

  const isLastReplayTurn = () => replayTurnIndex() + 1 === gameState.turns.length

  const getLatestTurn = (): Box | undefined => {
    if (isGameReplay()) {
      return gameState.turns[replayTurnIndex()]
    } else {
      return gameState.turns?.at(-1)
    }
  }

  return (
    <>
      <GameNavBar />
      <div class="mx-auto flex flex-col justify-center items-center bg-stone-700 rounded-xl py-8 px-32">
        <div class="mb-8 flex flex-col items-center">
          <Show
            when={!isGameReplay()}
            fallback={
              <ReplayInformation
                turnIndex={replayTurnIndex()}
                turn={gameState.turns[replayTurnIndex()]}
              />
            }
          >
            <GameInformation />
          </Show>
          <Show when={isGameEnd()}>
            <Button class="mt-4" onclick={() => handleShowReplay()}>
              Show replay
            </Button>
          </Show>
          <Show when={isGameReplay()}>
            <div class="flex gap-4 mt-4">
              <div />
              <Button secondary onclick={() => handleStopShowingReplay()}>
                Close replay
              </Button>
              <Button onclick={() => changeReplayTurn(-1)}>Previous move</Button>
              <Button onclick={() => changeReplayTurn(1)}>Next move</Button>
            </div>
          </Show>
        </div>
        <Show when={isGameInit()}>
          <p class="text-xl font-bold">Waiting on an opponent...</p>
        </Show>
        <Show when={!isGameInit()}>
          <GameBoard
            showWinningBoxes={isGameEnd() || isLastReplayTurn()}
            latestTurn={getLatestTurn()}
          />
          <GameRuleInformation />
        </Show>
      </div>
    </>
  )
}

export default GameView
