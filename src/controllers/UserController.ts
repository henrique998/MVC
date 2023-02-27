import { Request, Response } from "express"
import { User } from "../models/User"

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body

    const user = new User()

    user.setName = name
    user.setEmail = email

    try {
      await user.create()
      
      return res.send({ ok: true })
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }

  async profile(req: Request, res: Response) {
    const { userId } = req.body

    const user = new User()

    try {
      const userData = await user.getInfo(userId)

      return res.json(userData)
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }

  async update(req: Request, res: Response) {
    const { userId, name, email } = req.body

    const user = new User()

    try {
      const userData = await user.update({ userId, name, email })

      return res.json(userData)
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
}