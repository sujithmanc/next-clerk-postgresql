// Project: Student Management System
// Track student profiles, courses and enrollment status

import { students } from '@/db/schema'
import db from '@/index'
import { eq } from 'drizzle-orm'

export async function findAll() {
  const rows = await db.select().from(students)
  return rows
}

export async function findById(id) {
  const rows = await db.select().from(students).where(eq(students.id, id))
  return rows[0] ?? null
}

export async function insert(data) {
  return db.insert(students).values(data)
}

export async function update(id, data) {
  return db.update(students).set(data).where(eq(students.id, id))
}

export async function remove(id) {
  return db.delete(students).where(eq(students.id, id))
}
