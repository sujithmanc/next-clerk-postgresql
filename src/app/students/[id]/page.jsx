import { getStudentById } from '../service'
import StudentDetails from '../components/StudentDetails'
import { formatDate } from '../util/util'

export default async function StudentViewPage({ params }) {
  const { id } = await params
  const record = await getStudentById(id)

  record.dob = formatDate(record.dob)
  return (
    <div className="p-6 flex justify-center">
      <StudentDetails record={record} id={id} />
    </div>
  )
}
