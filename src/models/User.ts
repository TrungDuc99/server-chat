import { Document, Schema } from 'mongoose'
import defaultType from '../utils/defaultType'

require('dotenv').config()

export interface UserDoc extends Document {
  email: string
  name: string
  password: string
  avatarUrl: string
  isAdmin: boolean
  phone: string
  address: string
  created: Date
  updated: Date
}

const UserSchema = new Schema<UserDoc>({
  email: defaultType.email,
  name: defaultType.string,
  avatarUrl: defaultType.string,
  password: defaultType.password,
  phone: defaultType.string,
  address: defaultType.string,
  created: defaultType.date_now,
  updated: defaultType.date,
})

export default UserSchema
