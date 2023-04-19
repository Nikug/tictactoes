import { Component } from 'solid-js'
import { Slider } from './Slider'
import { gameSettings, limits, setGameSettings } from '../GameSettings'
import { clamp } from '../mathUtils'

export const GameSettings: Component = () => {
  const handleDimensionChange = (value: number) => {
    const clamped = clamp(value, limits.dimension.min, limits.dimension.max)
    setGameSettings({ ...gameSettings(), dimensions: { x: clamped, y: clamped } })
  }

  const handleDimensionWheel = (event: WheelEvent) => {
    event.preventDefault()
    handleDimensionChange(
      event.deltaY < 0 ? gameSettings().dimensions.x + 1 : gameSettings().dimensions.x - 1
    )
  }

  const handleWinLengthChange = (value: number) => {
    const clamped = clamp(value, limits.winLength.min, limits.winLength.max)
    setGameSettings({ ...gameSettings(), winLength: clamped })
  }

  const handleWinLengthWheel = (event: WheelEvent) => {
    event.preventDefault()
    handleWinLengthChange(
      event.deltaY < 0 ? gameSettings().winLength + 1 : gameSettings().winLength - 1
    )
  }

  return (
    <div class="flex flex-col items-center gap-4 mb-4">
      <h3 class="font-bold text-xl">Rules</h3>
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
          class="w-48"
          value={gameSettings().winLength}
          min={limits.winLength.min}
          max={limits.winLength.max}
          step={1}
          onInput={(event) => handleWinLengthChange(Number(event.target.value))}
        />
      </div>
    </div>
  )
}
