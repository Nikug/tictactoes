import { AuthSession, createClient } from '@supabase/supabase-js'
import { createSignal } from 'solid-js'

const supababaseConfig = {
  url: 'https://zihrtjayxcvskvepootb.supabase.co',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaHJ0amF5eGN2c2t2ZXBvb3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2MzMxNjksImV4cCI6MTk5NzIwOTE2OX0.kgEzUX6z-8Qw6IJlsLRGGaqWUBtNMBiesIUpUnQQZZQ',
}

export const supabase = createClient(supababaseConfig.url, supababaseConfig.anonKey)

export const [authSession, setAuthSession] = createSignal<AuthSession | null>(null)
