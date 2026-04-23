import { updateStudentAction } from '../actions'
import StudentForm from '../components/StudentForm'

export default function NewStudentPage() {
  return (
    <div className="p-6 flex justify-center">
      <StudentForm action={updateStudentAction} />
    </div>
  )
}
