// Project: Student Management System
// Track student profiles, courses and enrollment status

import { findAll, findById, insert, update, remove } from './repository'

export async function getAllStudents() {
  return findAll()
}

export async function getStudentById(id) {
  const record = await findById(Number(id))
  if (!record) throw new Error('Student not found')
  return record
}

export async function createStudent(data) {
  return insert(data)
}

export async function updateStudent(id, data) {
  await getStudentById(id)
  return update(Number(id), data)
}

export async function deleteStudent(id) {
  await getStudentById(id)
  return remove(Number(id))
}
