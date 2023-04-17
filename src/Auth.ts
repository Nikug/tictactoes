import { AuthSession } from '@supabase/supabase-js'
import { createSignal } from 'solid-js'
import { supabase } from './supabase'

export const [authSession, setAuthSession] = createSignal<AuthSession | null>(null)

export const getUser = () => authSession()?.user

export const isSignedIn = (): boolean => !!authSession()?.user

export const signOut = async () => {
  if (!isSignedIn()) return

  await supabase.auth.signOut()
}
