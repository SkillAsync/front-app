export interface Message {
  _id: string
  user: string
  channel: string
  message: string
  read: boolean
  sent: boolean
  delivered: boolean
  edited: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
