// Project: Student Management System
// Track student profiles, courses and enrollment status

import Link from 'next/link'
import { getAllStudents } from './service'
import StudentTable from './components/StudentTable'
import { auth, currentUser } from "@clerk/nextjs/server";
import UserCard from './components/UserCard';



export default async function StudentListPage() {
  const authDetails = await auth();
  const currentUserDetails = await currentUser();
  const rows = await getAllStudents()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management System</h1>
        <Link href="/students/new" className="btn btn-primary">Create New</Link>
      </div>
      <UserCard />
      
      <StudentTable rows={rows} />
    </div>
  )
}
