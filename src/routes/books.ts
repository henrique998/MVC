import { Router } from "express"
import { BookController } from "../controllers/BookController"

const bookRouter = Router()

const bookController = new BookController()

bookRouter.post('/books', bookController.create)
bookRouter.get('/books', bookController.find)
bookRouter.delete('/books/delete', bookController.delete)

export { bookRouter as bookRoutes }
