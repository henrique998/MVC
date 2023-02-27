import { randomUUID } from "node:crypto"
import { createConnection } from "../db/connection"

export class Book {
  private title: string
  private description: string
  private authorId: string

  set setTitle(title: string) {
    this.title = title
  }

  set setDescription(description: string) {
    this.description = description
  }

  set setAuthorId(authorId: string) {
    this.authorId = authorId
  }

  async create() {
    const id = randomUUID()
    const title = this.title
    const description = this.description
    const authorId = this.authorId

    const client = await createConnection()

    const findBookSql = `SELECT id FROM books WHERE title = $1`

    const bookAlreadyExists = await client.query(findBookSql, [title])

    if (bookAlreadyExists) {
      throw new Error("Book already exists!")
    }

    const createBookSql = `INSERT INTO books("id", "title", "description", "authorId") VALUES($1, $2, $3, $4)`

    client.query(createBookSql, [id, title, description, authorId])
  }

  async findOne(bookId: string) {
    if (!bookId) {
      throw new Error("Book id is required!")
    }

    const client = await createConnection()

    const findBookSql = `SELECT * FROM books INNER JOIN users ON "books"."authorId" = "users"."id" WHERE "books"."id" = $1`

    const { rows } = await client.query(findBookSql, [bookId])

    return rows[0]
  }

  async delete(bookId: string) {
    if (!bookId) {
      throw new Error("Book id is required!")
    }

    const client = await createConnection()

    const deleteBookSql = `DELETE FROM books WHERE id = $1`

    await client.query(deleteBookSql, [bookId])
  }
} 