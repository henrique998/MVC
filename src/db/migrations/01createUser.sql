CREATE TABLE IF NOT EXISTS "users"(
  "id" TEXT NOT NULL PRIMARY KEY,

  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,

  "created_at" TIMESTAMP DEFAULT now()
);