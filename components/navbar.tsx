import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-10 rounded-2xl">
      <nav className="flex justify-between items-center p-4 bg-slate-900 text-white h-16">
        <Link href="/" className="font-bold hover:underline">
          practice-katakana
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/cheatsheet" className="hover:underline">
              Cheatsheet
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
