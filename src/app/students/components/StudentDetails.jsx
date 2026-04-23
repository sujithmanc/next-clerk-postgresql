import Link from 'next/link'

export default function StudentDetails({ record, id }) {
  return (
    <div className="card w-full max-w-2xl shadow-md bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-xl">Student Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">fullName</div>
        <div className="stat-value text-lg">{record.fullName}</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">email</div>
        <div className="stat-value text-lg">{record.email}</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">age</div>
        <div className="stat-value text-lg">{record.age}</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">dob</div>
        <div className="stat-value text-lg">{record.dob}</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">enrolled</div>
        <div className="stat-value text-lg">{record.enrolled ? 'Yes' : 'No'}</div>
      </div>
        </div>
        <div className="card-actions justify-end mt-6 gap-2">
          <Link href="/students" className="btn btn-ghost">Back</Link>
          <Link href={`/students/${id}/edit`} className="btn btn-warning">Edit</Link>
        </div>
      </div>
    </div>
  )
}
