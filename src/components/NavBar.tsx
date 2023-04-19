import { useLocation, useNavigate } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { getUser, isSignedIn, signOut } from '../Auth'
import { Button } from './Button'

export const NavBar: Component = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isProfilesPage = () => location.pathname.includes('profiles')

  const handleProfile = () => {
    const user = getUser()
    if (!user) return

    navigate(`/profiles/${user.id}`)
  }

  return (
    <>
      <div class="h-16" />
      <div class="absolute top-0 left-0 right-0 h-16 grid grid-col-3 grid-cols-auto items-end px-16">
        <div class="col-start-2 col-span-1">
          <h1 class="font-bold text-5xl text-center">TicTacToes</h1>
        </div>
        <div class="col-start-3 col-span-1 flex justify-end gap-4">
          <Show
            when={isProfilesPage()}
            fallback={<Button onClick={() => handleProfile()}>View profile</Button>}
          >
            <Button onClick={() => navigate('/')}>Return to main menu</Button>
          </Show>

          <Show when={isSignedIn()}>
            <Button secondary onClick={() => signOut()}>
              Sign out
            </Button>
          </Show>
        </div>
      </div>
    </>
  )
}
