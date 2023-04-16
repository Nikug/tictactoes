import { Component, createResource, createSignal } from 'solid-js'
import { getUser } from '../Auth'
import { supabase } from '../supabaseClient'
import { Button } from './Button'
import { TextInput } from './TextInput'

const getUserName = async (): Promise<string | null> => {
  try {
    const user = getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
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

export const Username: Component = () => {
  const [loading, setLoading] = createSignal(false)
  const [userName, { mutate }] = createResource(getUserName)
  const [newUserName, setNewUserName] = createSignal<string | null>(null)

  const updateUserName = async () => {
    try {
      setLoading(true)
      const user = getUser()
      if (!user) return

      const updates = {
        id: user.id,
        username: newUserName(),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      mutate(newUserName())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 class="font-bold text-xl mb-4">Name: {userName()}</h3>
      <div class="mb-4">
        <label for="user-name" class="block">
          New name
        </label>
        <TextInput
          id="user-name"
          value={newUserName()}
          onInput={(event) => setNewUserName(event.target.value)}
        />
      </div>
      <Button onClick={() => updateUserName()}>Set name</Button>
    </div>
  )
}
