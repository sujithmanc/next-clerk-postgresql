'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema } from '../validations'
import Link from 'next/link'

export default function StudentForm({ action, initialData = null, cancelHref = '/students', studentId }) {
  const isEdit = initialData !== null
  const [prevState, setPrevState] = useState({ success: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    clearErrors,
    setValue,
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: initialData?.fullName || '',
      email: initialData?.email || '',
      age: initialData?.age || '',
      dob: initialData?.dob || '',
      enrolled: initialData?.enrolled || false,
    },
  })



  const onSubmit = async (data) => {
    clearErrors()
    const result = await action(studentId, data)

    if (!result?.success) {
      if (result?.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (messages?.length > 0) {
            setError(field, { type: 'server', message: messages[0] })
          }
        })
      }
      if (result?.values) {
        Object.entries(result.values).forEach(([key, value]) => {
          setValue(key, value, { shouldValidate: false })
        })
      }
      setPrevState({ success: false, message: result.message })
      return
    }

    setPrevState(result)
  }

  const inputClass = (field) =>
    `input input-bordered w-full ${errors[field] ? 'input-error' : touchedFields[field] ? 'input-success' : ''}`

  return (
    <div className="card w-full max-w-lg shadow-md bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{isEdit ? 'Edit Student' : 'New Student'}</h2>

        {prevState.message && (
          <div className={`alert ${prevState.success ? 'alert-success' : 'alert-error'} text-sm`}>
            {prevState.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          
          {/* fullName */}
          <div className="form-control">
            <label className="label font-semibold">fullName</label>
            <input type="text" {...register('fullName')} className={inputClass('fullName')} />
            {errors.fullName && <span className="text-error text-xs">{errors.fullName.message}</span>}
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label font-semibold">email</label>
            <input type="text" {...register('email')} className={inputClass('email')} />
            {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
          </div>

          {/* age */}
          <div className="form-control">
            <label className="label font-semibold">age</label>
            <input type="number" {...register('age')} className={inputClass('age')} />
            {errors.age && <span className="text-error text-xs">{errors.age.message}</span>}
          </div>

          {/* dob */}
          <div className="form-control">
            <label className="label font-semibold">dob</label>
            <input type="date" {...register('dob')} className={inputClass('dob')} />
            {errors.dob && <span className="text-error text-xs">{errors.dob.message}</span>}
          </div>

          {/* enrolled */}
          <div className="form-control">
            <label className="label font-semibold">enrolled</label>
            <input type="checkbox" {...register('enrolled')}
              className={`toggle ${errors.enrolled ? 'toggle-error' : 'toggle-primary'}`} />
            {errors.enrolled && <span className="text-error text-xs">{errors.enrolled.message}</span>}
          </div>

          <div className="card-actions justify-end mt-4 gap-2">
            <Link href={cancelHref} className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
