import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import { FileText } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <Logo />
      <Link href="/history" className="text-[#5DCCFC] hover:text-sky-400 transition-colors text-sm font-medium mb-4 block">
        <FileText className="h-6 w-6 inline mr-2" />
        View Water Intake History
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}