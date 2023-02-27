CREATE TABLE IF NOT EXISTS "books"(
  "id" TEXT NOT NULL PRIMARY KEY,

  "title" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "authorId" TEXT NOT NULL,
  
  "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

-- ALTER TABLE books ADD CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES users("id");