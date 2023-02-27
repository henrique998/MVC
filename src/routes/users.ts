import { Router } from "express"
import { UserController } from "../controllers/UserController"

const userRouter = Router()

const userController = new UserController()

userRouter.post('/users', userController.create)
userRouter.get('/users/profile', userController.profile)
userRouter.put('/users/update', userController.update)

export { userRouter as userRoutes }
