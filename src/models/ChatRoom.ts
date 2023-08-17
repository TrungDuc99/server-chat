import { Document, Schema } from 'mongoose'
import defaultType from '../utils/defaultType'

require('dotenv').config()

interface Message {
  id: string
  content: string
  user: object
  createdAt: string
}

export interface ChatRoomDoc extends Document {
  id: string
  name: string
  messages: Message[]
  users: {
    name: string
    id: string
    imageUri: string
  }[]
}

const ChatRoomSchema = new Schema<ChatRoomDoc>({
  id: defaultType.string,
  name: defaultType.string,
  messages: [
    {
      id: defaultType.string,
      content: defaultType.string,
      user: {
        name: defaultType.string,
        id: defaultType.string,
        imageUri: defaultType.string,
      },
      createdAt: defaultType.date_now,
    },
  ],
  users: [
    {
      name: defaultType.string,
      id: defaultType.string,
      imageUri: defaultType.string,
    },
  ],
})
export default ChatRoomSchema
