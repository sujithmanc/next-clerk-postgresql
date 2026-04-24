
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  // 1. Add this to handle automatic URL resolution
  metadataBase: new URL("https://next-clerk-postgresql.vercel.app"),

  title: "CGFJ Bible Quiz",
  description: "Test your Bible knowledge and challenge your friends with this interactive quiz.",

  openGraph: {
    title: "CGFJ Bible Quiz",
    description: "Take this fun Bible quiz and see how well you know the Word of God.",
    url: "/", // Uses metadataBase
    type: "website",
    images: [
      {
        url: "/bible-quiz.png", // Simplified relative path
        width: 1200,
        height: 630,
        alt: "CGFJ Bible Quiz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CGFJ Bible Quiz",
    description: "Challenge yourself with this Bible quiz and share your score!",
    images: ["/bible-quiz.png"], // Simplified relative path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-end items-center gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
