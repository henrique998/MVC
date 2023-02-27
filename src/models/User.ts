import { randomUUID } from "node:crypto"

import { createConnection } from "../db/connection"

interface UserData {
  userId: string
  name: string
  email: string
}

export class User {
  private name: string
  private email: string

  set setName(name: string) {
    this.name = name
  }

  set setEmail(email: string) {
    this.email = email
  }

  async create() {
    const id = randomUUID()
    const name = this.name
    const email = this.email

    if (!name || !email) {
      throw new Error("missing data!")
    }

    const client = await createConnection()  

    const findUserSql = `SELECT * FROM users WHERE id = $1`

    const userAlreadyExists = await client.query(findUserSql, [id])

    if (userAlreadyExists) {
      throw new Error("User already exists!")
    }

    const createUserSql = `INSERT INTO users(id, name, email) VALUES($1, $2, $3)`

    await client.query(createUserSql, [id, name, email])
  }

  async getInfo(userId: string) {
    if (!userId) {
      throw new Error("User id is required!");
    }

    const client = await createConnection()

    const findUserSql = `SELECT * FROM users WHERE id = $1`

    const userExists = await client.query(findUserSql, [userId])

    if (!userExists.rows) {
      throw new Error("User not found!")
    }

    const { rows } = userExists

    return rows[0]
  }

  async update({ userId, name, email }: UserData) {
    if (!userId || !name || !email) {
      throw new Error("missing data!")
    }

    const client = await createConnection()

    const updateUserSql = `UPDATE users SET name = $1, email = $2 WHERE id = $3`

    const { rows } = await client.query(updateUserSql, [name, email, userId])

    return rows[0]
  }
}