'use client'

import { useTransition } from 'react'
import { deleteStudentAction } from '../actions'

export default function StudentDeleteButton({ id }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this Student?')) return
    startTransition(async () => {
      await deleteStudentAction(id)
    })
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="btn btn-xs btn-error">
      {isPending ? <span className="loading loading-spinner loading-xs" /> : 'Delete'}
    </button>
  )
}
