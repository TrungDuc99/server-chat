import { Request, Response } from 'express'
import { UserModel } from '../models'
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const secretKey: any = process.env.TOKEN_SECRET_KEY

export default class AuthCallback {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email: email }) // find the user by email

      if (!user) {
        return res.status(401).send({ message: 'Invalid username or password' }) // return the error message when the user does not exist
      }
      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid username or password' })
      }
      // Tạo JWT token và trả về cho client
      const token = jwt.sign(
        {
          user: {
            uid: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
          },
        },
        secretKey
        // {
        //   expiresIn: '30s', // expires in 30 days
        // }
      )
      return res.status(200).send({ token })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const { email, name, password, phone, address, avatarUrl } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const payload = await UserModel.create({
        email,
        name,
        password: hashedPassword,
        phone,
        avatarUrl,
        address,
      })

      return res.json({ success: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const { name, description, image, id } = req.body

      const payload = await UserModel.create({
        name,
        id,
        description,
        image,
      })
      return res.json({ success: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async me(req: any, res: Response) {
    const userID = req.user.user._id // Lấy id của user.
    const payload = await UserModel.findOne({ _id: userID })
    if (!payload) {
      return res.status(404).send({ message: 'User not found' })
    }
    return res.send(payload) // Trả về thông tin user.
  }
}
