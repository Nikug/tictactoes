import { Component, createResource, createSignal } from 'solid-js'
import { getUserName, updateUserName as apiUpdateUserName } from '../api/profiles'
import { Button } from './Button'
import { TextInput } from './TextInput'

export const [userName, { mutate }] = createResource(getUserName)

export const Username: Component = () => {
  const [loading, setLoading] = createSignal(false)
  const [newUserName, setNewUserName] = createSignal<string | null>(null)

  const updateUserName = async () => {
    try {
      setLoading(true)
      await apiUpdateUserName(newUserName())
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
