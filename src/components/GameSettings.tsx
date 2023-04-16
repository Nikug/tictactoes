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

const limits = {
  dimension: {
    min: 1,
    max: 50,
  },
  winLength: {
    min: 1,
    max: 10,
  },
}

export const GameSettings: Component = () => {
  const handleDimensionChange = (value: number) => {
    const clamped = Math.min(limits.dimension.max, Math.max(value, limits.dimension.min))
    setGameSettings({ ...gameSettings(), dimensions: { x: clamped, y: clamped } })
  }

  const handleDimensionWheel = (event: WheelEvent) => {
    event.preventDefault()
    handleDimensionChange(
      event.deltaY < 0 ? gameSettings().dimensions.x + 1 : gameSettings().dimensions.x - 1
    )
  }

  const handleWinLengthChange = (value: number) => {
    const clamped = Math.min(limits.winLength.max, Math.max(value, limits.winLength.min))
    setGameSettings({ ...gameSettings(), winLength: clamped })
  }

  const handleWinLengthWheel = (event: WheelEvent) => {
    event.preventDefault()
    handleWinLengthChange(
      event.deltaY < 0 ? gameSettings().winLength + 1 : gameSettings().winLength - 1
    )
  }

  return (
    <div class="flex items-center gap-8">
      <div class="flex flex-col items-center" onWheel={handleDimensionWheel}>
        <label for="dimension-slider" class="mb-4 text-xl">
          Grid size: {gameSettings().dimensions.x}x{gameSettings().dimensions.y}
        </label>
        <Slider
          id="dimension-slider"
          class="w-48"
          value={gameSettings().dimensions.x}
          min={limits.dimension.min}
          max={limits.dimension.max}
          step={1}
          onInput={(event) => handleDimensionChange(Number(event.target.value))}
        />
      </div>
      <div class="flex flex-col items-center" onWheel={handleWinLengthWheel}>
        <label for="win-length-slider" class="mb-4 text-xl">
          Win length: {gameSettings().winLength}
        </label>
        <Slider
          id="win-length-slider"
          class="w-32"
          value={gameSettings().winLength}
          min={limits.winLength.min}
          max={limits.winLength.max}
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
