
import {
  boolean, date, integer, pgTable, varchar,
  text,
  timestamp,
  json,
  unique,
} from "drizzle-orm/pg-core"




export const students = pgTable('students', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  userId: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  dob: date('dob'),
  enrolled: boolean('enrolled').default(false),
})


export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),       // clerkId IS the PK
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id", { length: 191 }).primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),   // generated from title at insert
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  questions: json("questions").notNull(),                           // { id, question, options[], answerIndex }[]
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attempts = pgTable("attempts", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 })
    .notNull()
    .references(() => users.id),
  quizId: varchar("quiz_id", { length: 191 })
    .notNull()
    .references(() => quizzes.id),
  score: integer("score").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
}, (t) => ({
  unq: unique().on(t.userId, t.quizId), // one attempt per user per quiz
}));

export const lessons = pgTable("lessons", {
  id: varchar("id", { length: 191 }).primaryKey(),

  quizId: varchar("quiz_id", { length: 191 })
    .notNull()
    .unique()
    .references(() => quizzes.id),

  content: text("content").notNull(), // 👈 add this

  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});


