import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default async function UserCard() {
  const user = await currentUser()
  console.info('Current User in UserCard:', user);
  if (!user) return null

  return (
    <div style={{ /* card styles */ }}>
      <Image
        src={user.imageUrl}
        alt="Profile"
        width={72}
        height={72}
        className="rounded-full"
      />
      <p>{user.fullName}</p>
      <p>{user.lastName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <p>{user.id}</p>

      {/* Clerk's built-in sign out button */}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}