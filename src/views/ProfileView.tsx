import { useParams } from '@solidjs/router'
import { Component, createEffect, createResource } from 'solid-js'
import { getUserGames } from '../api/games'
import { getUserWithId } from '../api/profiles'
import { NavBar } from '../components/NavBar'

const ProfileView: Component = () => {
  const params = useParams<{ userId: string }>()
  const [user] = createResource(params.userId, getUserWithId)
  const [userGames] = createResource(params.userId, getUserGames)

  return (
    <>
      <NavBar />
      <div class="flex justify-center gap-8 bg-stone-700 p-8 rounded-xl divide-x-2 w-5xl">
        <h3 class="text-5xl font-bold">{user()?.username}</h3>
      </div>
    </>
  )
}

export default ProfileView
