import { Request, Response } from "express"
import { Book } from "../models/Book"

export class BookController {
  async create(req: Request, res: Response) {
    const { title, description, authorId } = req.body

    if (!title || !description || !authorId) {
      throw new Error("missing data!")
    }
    
    const book = new Book()

    book.setTitle = title
    book.setDescription = description
    book.setAuthorId = authorId

    try {
      await book.create()
      
      return res.send({ ok: true })
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }

  async find(req: Request, res: Response) {
    const { bookId } = req.body

    const book = new Book()

    try {
      const books = await book.findOne(bookId)

      return res.json(books)
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { bookId } = req.body

    const book = new Book()

    try {
      await book.delete(bookId)

      return res.json({ ok: true })
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
}