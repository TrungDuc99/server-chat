const { default: mongoose } = require('mongoose')

import connectDBs from '../utils/connectDatabase'
import UserSchema, { UserDoc } from './User'
const { chatBoxDB, uniDentalDB } = connectDBs()

const UserModel = uniDentalDB.model<UserDoc>('User', UserSchema)

export { UserModel }
