import { useNavigate } from '@solidjs/router'
import { Component, createEffect, createSignal, Show } from 'solid-js'
import { authSession } from '../Auth'
import { supabase } from '../supabase'
import { Button } from './Button'
import { TextInput } from './TextInput'

export const Login: Component = () => {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal<string | null>(null)
  const [password, setPassword] = createSignal<string | null>(null)
  const [signInError, setSignInError] = createSignal<string | null>(null)
  const navigate = useNavigate()

  const signUp = async () => {
    const inputEmail = email()
    const inputPassword = password()
    if (!inputEmail || !inputPassword) {
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email: inputEmail, password: inputPassword })

      if (error) {
        setSignInError(`Could not sign up. ${error.message}`)
      }
    } catch (error) {
      setSignInError('Unknown error.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async () => {
    const inputEmail = email()
    const inputPassword = password()
    if (!inputEmail || !inputPassword) {
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: inputEmail,
        password: inputPassword,
      })

      if (error) {
        setSignInError(`Could not sign in. ${error.message}`)
      }
    } catch (error) {
      setSignInError('Unknown error.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  createEffect(() => {
    if (authSession()?.user) {
      navigate('/')
    }
  })

  return (
    <div class="rounded-xl bg-stone-700 p-8 w-96">
      <h3 class="text-4xl font-bold mb-8 text-center">Sign in/up</h3>
      <div class="flex flex-col gap-4 mb-8">
        <div>
          <label for="login-email" class="block">
            Email
          </label>
          <TextInput
            id="login-email"
            class="w-full"
            type="text"
            value={email()}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label for="login-password" class="block">
            Password
          </label>
          <TextInput
            id="login-password"
            class="w-full"
            type="password"
            value={password()}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Show when={signInError()}>
          <p>{signInError()}</p>
        </Show>
      </div>
      <div class="flex flex-col gap-4">
        <Button onClick={() => signIn()}>Sign in</Button>
        <Button secondary onClick={() => signUp()}>
          Sign up
        </Button>
      </div>
    </div>
  )
}
