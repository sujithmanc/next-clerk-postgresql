
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
  title: "CGFJ Bible Quiz",
  description: "Test your Bible knowledge and challenge your friends!",

  openGraph: {
    title: "CGFJ Bible Quiz",
    description: "Play the quiz and see your score!",
    url: "https://next-clerk-postgresql.vercel.app/quiz",
    type: "website",

    images: [
      {
        url: "https://next-clerk-postgresql.vercel.app/bible-quiz.png",
        width: 1200,
        height: 630,
        alt: "CGFJ Bible Quiz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CGFJ Bible Quiz",
    description: "Try this quiz!",
    images: ["https://next-clerk-postgresql.vercel.app/bible-quiz.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
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
