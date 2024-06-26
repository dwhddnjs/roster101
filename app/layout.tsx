import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { MainHeader } from "@/components/main-header"
import { ModalProvider } from "@/providers/modal-provider"
import icon from "../public/images/esport_icon.svg"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Roster101",
  description: "당신의 로스터를 만들어 보세요!",
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VALUE,
  },
  keywords:
    "roster101, lck, 로스터, 롤선수, 롤구단, 로스터101, 로스터만들기, 구단만들기",
  openGraph: {
    title: "roster101",
    type: "website",
    url: "https://roster101.vercel.app/",
    images: icon,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <MainHeader />
          <ModalProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
