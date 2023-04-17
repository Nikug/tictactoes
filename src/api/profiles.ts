import { getUser } from '../Auth'
import { supabase, tables } from '../supabase'

export const getUserName = async (): Promise<string | null> => {
  try {
    const user = getUser()
    if (!user) return

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

export const updateUserName = async (newUserName: string): Promise<void> => {
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
