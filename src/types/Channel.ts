import type { UserMongo } from './userMongo'
import type { Message } from './message'

export interface Channel {
  _id: string
  uuid: string
  name: string
  participants: UserMongo[]
  active: boolean
  lastMessage: Message
  __v: number
}
