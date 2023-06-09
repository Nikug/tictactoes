import { getUser } from '../Auth'
import { supabase, tables } from '../supabase'
import { User } from '../types'

export const getUserName = async (): Promise<string | null> => {
  try {
    const user = getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from(tables.profiles)
      .select('username')
      .eq('id', user.id)
      .single()
    if (error) throw error
    return data.username
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateUserName = async (newUserName: string | undefined): Promise<void> => {
  const user = getUser()
  if (!user) return

  const updates = {
    id: user.id,
    username: newUserName,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from(tables.profiles).upsert(updates)
  if (error) throw error
}

export const getUserWithId = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from(tables.profiles)
      .select<'', User>()
      .eq('id', userId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
