import { createSignal } from 'solid-js'
import { GameSettings as GameSettingsType } from './types'

export const defaultSettings = (): GameSettingsType => ({
  dimensions: { x: 20, y: 20 },
  winLength: 5,
})

export const [gameSettings, setGameSettings] = createSignal<GameSettingsType>(defaultSettings())

export const limits = {
  dimension: {
    min: 1,
    max: 50,
  },
  winLength: {
    min: 1,
    max: 10,
  },
}
