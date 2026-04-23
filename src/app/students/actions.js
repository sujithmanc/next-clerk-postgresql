// Project: Student Management System
// Track student profiles, courses and enrollment status

'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { studentSchema } from './validations'
import { createStudent, updateStudent, deleteStudent } from './service'

export async function createStudentAction(prevState, formData) {
  const raw = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    age: formData.get('age'),
    dob: formData.get('dob'),
    enrolled: formData.get('enrolled') === 'on',
  }

  const parsed = studentSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors: parsed.error.flatten().fieldErrors,
      values: raw
    }
  }

  const { fullName, email, age, dob, enrolled } = parsed.data

  try {
    await createStudent({ fullName, email, age, dob, enrolled })
  } catch {
    return { success: false, message: 'Failed to create Student. Please try again.', errors: {}, values: raw }
  }

  revalidatePath('/students')
  redirect('/students')
}

export async function updateStudentAction(id, formData) {
  const raw = formData

  const parsed = studentSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors: parsed.error.flatten().fieldErrors,
      values: raw
    }
  }

  try {
    if (id) {
      await updateStudent(id, parsed.data)
    } else {
      await createStudent(parsed.data)
    }
  } catch {
    return { success: false, message: 'Failed to update Student. Please try again.', errors: {}, values: raw }
  }

  revalidatePath('/students')
  redirect('/students')
}

export async function deleteStudentAction(id) {
  try {
    await deleteStudent(id)
  } catch {
    return { success: false, message: 'Failed to delete Student.' }
  }
  revalidatePath('/students')
}
