export const dynamic = "force-dynamic";
import {
  ClerkProvider,
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { LogIn } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://next-clerk-postgresql.vercel.app"),
  title: "CGFJ Bible Quiz",
  description:
    "Test your Bible knowledge and challenge your friends with this interactive quiz.",
  openGraph: {
    title: "CGFJ Bible Quiz",
    description:
      "Take this fun Bible quiz and see how well you know the Word of God.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/bible-quiz.png",
        width: 1200,
        height: 630,
        alt: "CGFJ Bible Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CGFJ Bible Quiz",
    description:
      "Challenge yourself with this Bible quiz and share your score!",
    images: ["/bible-quiz.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-200`}
      >
        <ClerkProvider>

          {/* Header */}
          <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-base-300 bg-base-200/80 backdrop-blur">

            {/* Left: App Name */}
            <h1 className="text-sm sm:text-base font-semibold">
              CGFJ Quiz
            </h1>

            {/* Right: Auth */}
            <div className="flex items-center gap-2">

              <Show when="signed-out">
                <SignInButton>
                  <button className="btn btn-sm btn-primary gap-2">
                    <LogIn size={16} />
                    Sign In
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>

            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-64px)]">
            {children}
          </main>

        </ClerkProvider>
      </body>
    </html>
  );
}