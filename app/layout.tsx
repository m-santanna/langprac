import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { Provider } from "jotai"

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
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
