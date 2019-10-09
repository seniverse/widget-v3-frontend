import { SwLayoutOptions, SwConfigOptions } from 'TYPES/Widget'

export interface BarProps {
  config: SwLayoutOptions
  options: SwConfigOptions
  open: boolean
  setOpen: (openState: boolean) => void
}
