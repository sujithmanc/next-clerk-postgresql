// Project: Student Management System
// Track student profiles, courses and enrollment status

import { students } from '@/db/schema'
import db from '@/index'
import { eq, and } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'

async function getUserId() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  return userId
}

export async function findAll() {
  const userId = await getUserId()
  return await db.select().from(students).where(eq(students.userId, userId))
}

export async function findById(id) {
  const userId = await getUserId()
  const rows = await db.select().from(students)
    .where(and(eq(students.id, id), eq(students.userId, userId)))
  return rows[0] ?? null
}

export async function insert(data) {
  const userId = await getUserId()
  return db.insert(students).values({ ...data, userId })
}

export async function update(id, data) {
  const userId = await getUserId()
  return db.update(students).set(data)
    .where(and(eq(students.id, id), eq(students.userId, userId)))
}

export async function remove(id) {
  const userId = await getUserId()
  return db.delete(students).where(and(eq(students.id, id), eq(students.userId, userId)))
}