import type{ objectInput } from './objectInput'

export interface propsModal {
  open: boolean
  header: string
  inputs?: objectInput[]
  image?: string
  action: string
  action2: string
  error: string
}
