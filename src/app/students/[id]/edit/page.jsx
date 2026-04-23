import { updateStudentAction } from '../../actions'
import { getStudentById } from '../../service'
import StudentForm from '../../components/StudentForm'

export default async function EditStudentPage({ params }) {
  const { id } = await params
  const raw = await getStudentById(id)

  const dobFormatted = new Date(raw.dob).toISOString().split('T')[0]
  const record = { ...raw, dob: dobFormatted }

  return (
    <div className="p-6 flex justify-center">
      <StudentForm action={updateStudentAction} initialData={record} studentId={id} cancelHref="/students" />
    </div>
  )
}
