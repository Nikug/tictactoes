import { Component, createSignal } from 'solid-js'
import { startGame } from '../GameLogic'
import { Button } from './Button'
import { Slider } from './Slider'
import { GameSettings as GameSettingsType } from '../types'

export const defaultSettings = (): GameSettingsType => ({
  dimensions: { x: 20, y: 20 },
  winLength: 5,
})

export const [gameSettings, setGameSettings] = createSignal<GameSettingsType>(defaultSettings())

export const GameSettings: Component = () => {
  const handleDimensionChange = (value: number) =>
    setGameSettings({ ...gameSettings(), dimensions: { x: value, y: value } })

  const handleWinLengthChange = (value: number) =>
    setGameSettings({ ...gameSettings(), winLength: value })

  return (
    <div class="flex items-center gap-8">
      <div class="flex flex-col items-center">
        <label for="dimension-slider" class="mb-4 text-xl">
          Grid size: {gameSettings().dimensions.x}x{gameSettings().dimensions.y}
        </label>
        <Slider
          id="dimension-slider"
          class="w-48"
          value={gameSettings().dimensions.x}
          min={1}
          max={50}
          step={1}
          onInput={(event) => handleDimensionChange(Number(event.target.value))}
        />
      </div>
      <div class="flex flex-col items-center">
        <label for="win-length-slider" class="mb-4 text-xl">
          Win length: {gameSettings().winLength}
        </label>
        <Slider
          id="win-length-slider"
          class="w-32"
          value={gameSettings().winLength}
          min={1}
          max={10}
          step={1}
          onInput={(event) => handleWinLengthChange(Number(event.target.value))}
        />
      </div>
      <Button class="mt-8" onClick={() => startGame()}>
        New game
      </Button>
    </div>
  )
}
