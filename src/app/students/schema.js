// Project: Student Management System
// Track student profiles, courses and enrollment status

import { mysqlTable, int, varchar, text, date, boolean, serial, json } from 'drizzle-orm/mysql-core'

export const students = mysqlTable('students', {
  id: serial('id').primaryKey(),
  fullName: varchar('fullName', { length: 255 }),
  email: varchar('email', { length: 255 }),
  userId: varchar('userId', { length: 255 }).notNull(),
  age: int('age'),
  dob: date('dob'),
  enrolled: boolean('enrolled').default(false),
})
