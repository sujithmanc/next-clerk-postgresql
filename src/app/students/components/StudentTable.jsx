import Link from 'next/link'
import StudentDeleteButton from './StudentDeleteButton'

export default function StudentTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>fullName</th>
            <th>email</th>
            <th>enrolled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.enrolled ? 'Yes' : 'No'}</td>
              <td className="flex gap-2">
                <Link href={`/students/${row.id}`} className="btn btn-xs btn-info">View</Link>
                <Link href={`/students/${row.id}/edit`} className="btn btn-xs btn-warning">Edit</Link>
                <StudentDeleteButton id={row.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
