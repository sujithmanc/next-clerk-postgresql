// Project: Student Management System
// Track student profiles, courses and enrollment status

import { z } from 'zod'

export const studentSchema = z.object({
  fullName: z.string().min(2, 'fullName is required').max(80, 'fullName must be at most 80 characters'),
  email: z.string().min(5, 'email is required').max(120, 'email must be at most 120 characters'),
  age: z.coerce.number().min(16, 'age must be at least 16').max(40, 'age must be at most 40'),
  dob: z.string().optional()
  .refine(v => new Date(v) >= new Date('1980-01-01'), 'dob must be after 1980-01-01')
  .refine(v => new Date(v) <= new Date('2010-12-31'), 'dob must be before 2010-12-31'),
  enrolled: z.literal(true, { errorMap: () => ({ message: 'enrolled must be enabled' }) }),
})
