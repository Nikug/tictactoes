import { useParams } from '@solidjs/router'
import { Component, createMemo, createResource, For } from 'solid-js'
import { getUserGames } from '../api/games'
import { getUserWithId } from '../api/profiles'
import { GameSummary } from '../components/GameSummary'
import { LabeledValue } from '../components/LabeledValue'
import { NavBar } from '../components/NavBar'

const ProfileView: Component = () => {
  const params = useParams<{ userId: string }>()
  const [user] = createResource(params.userId, getUserWithId)
  const [userGames] = createResource(params.userId, getUserGames)

  const wonGames = createMemo(() => userGames()?.filter((game) => game.winnerId === params.userId))

  return (
    <>
      <NavBar />
      <div class="bg-stone-700 p-8 rounded-xl w-5xl">
        <h3 class="text-5xl font-bold text-center mb-8">{user()?.username}</h3>
        <div class="w-full flex justify-center gap-32">
          <LabeledValue value={wonGames()?.length ?? 0} label="Won games" />
          <LabeledValue value={userGames()?.length ?? 0} label="Total games" />
        </div>
        <h3 class="text-5xl font-bold text-center mt-16 mb-8">History</h3>
        <p class="mb-2">
          Profile is <span class="font-bold">bolded</span>
        </p>
        <For each={userGames()}>
          {(game) => <GameSummary game={game} playerId={params.userId} />}
        </For>
      </div>
    </>
  )
}

export default ProfileView
