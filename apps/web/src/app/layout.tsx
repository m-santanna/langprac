import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "@repo/ui/globals.css"
import Navbar from "@/components/navbar"
import Providers from "@/components/providers"
import { Toaster } from "@repo/ui/components/sonner"

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LangPrac",
  description: "Practice and improve new alphabets that you are not fully familiar with.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
