import { RealtimeChannel } from '@supabase/supabase-js'
import { getUser } from '../Auth'
import { supabase, tables } from '../supabase'
import { Game, Player } from '../types'

export const getGameWithId = async (id: string): Promise<Game> => {
  const { data, error } = await supabase.from(tables.games).select<'', Game>().eq('id', id).single()

  if (error) throw error

  return data
}

export const addPlayerToGameAndStart = async (id: string, players: Player[]): Promise<Game> => {
  const { data, error } = await supabase
    .from(tables.games)
    .update({ players: players, state: 'active' })
    .eq('id', id)
    .select<'', Game>()
    .single()

  if (error) throw error
  return data
}

export const subscribeToGame = (
  id: string,
  updateGame: (newGame: Game) => void
): RealtimeChannel => {
  const channel = supabase
    .channel('changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: tables.games,
        filter: `id=eq.${id}`,
      },
      (payload) => updateGame(payload.new as Game)
    )
    .subscribe()

  return channel
}

export const updateAfterTurn = async (game: Game): Promise<void> => {
  if (!game.id) return

  const updates: Partial<Game> = {
    playerTurn: game.playerTurn,
    board: game.board,
    turns: game.turns,
  }

  if (game.state === 'end') {
    updates.state = game.state
    updates.winnerId = game.winnerId
    updates.winningBoxes = game.winningBoxes
  }

  const result = await supabase.from(tables.games).update(updates).eq('id', game.id)

  if (result.error) throw result.error
}

export const leaveGame = async (game: Game) => {
  const user = getUser()
  if (!game.id || !user) return

  const theOtherPlayer = game.players.find((player) => player.id !== user.id)

  const updates: Partial<Game> = {
    state: 'end',
    winnerId: theOtherPlayer?.id,
    leaverId: user.id,
  }

  const result = await supabase.from(tables.games).update(updates).eq('id', game.id)
  if (result.error) throw result.error
}
