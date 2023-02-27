import { Pool } from "pg"

export const createConnection = async () => {
  const client = new Pool({
    host: 'localhost',
    user: 'henrique',
    password: '123456',
    database: 'mydb'
  })

  await client.connect()

  return client
}