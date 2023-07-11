import { Router } from 'express'

import UserCallback from '../controller/User'
import { authenticateToken } from '../middleware/AuthenticateToken'
const UserRouter = Router()

UserRouter.get('/', authenticateToken, UserCallback.get)
UserRouter.get('/:id', authenticateToken, UserCallback.getOne)
UserRouter.post('/', authenticateToken, UserCallback.create)
UserRouter.put('/:id', authenticateToken, UserCallback.update)
UserRouter.delete('/:id', authenticateToken, UserCallback.delete)

export default UserRouter
