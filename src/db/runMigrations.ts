import fs from "fs"
import path from "path"
import { createConnection } from "./connection"

(async () => {
  const client = await createConnection()

  const fileDatabaseDir = path.join(__dirname, "migrations")

  fs.readdir(fileDatabaseDir, (err, files) => {
    if (err) {
      console.log(err)
    }

    files.forEach(file => {
      fs.readFile(path.join(fileDatabaseDir, file), async (err, content) => {
        if (err) {
          console.log(err)
        }

        const migrationsQuery = content.toString()

        await client.query(migrationsQuery)
      })
    })
  })
})()