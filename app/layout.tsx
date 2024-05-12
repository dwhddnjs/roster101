import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { MainHeader } from "@/components/main-header"
import { usePathname } from "next/navigation"
import { headers } from "next/headers"
import { ModalProvider } from "@/providers/modal-provider"
import Seo from "./seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LolStar",
  description: "당신의 로스터를 만들어 보세요!",
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VALUE,
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
        <Seo title="lolstar" />
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
