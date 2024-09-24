import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { FileText, GlassWater } from "lucide-react";
import { redirect } from "next/navigation";

import WaterIntakeDisplay from "@/components/WaterIntakeDisplay";
import AddReminderForm from "@/components/AddReminderForm";
import Notifications from "@/components/Notifications";
import Link from "next/link";
import HourlyNotifications from "@/components/HourlyNotifications";


export default function Home() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <header className="flex w-full items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <GlassWater className="h-10 w-10 text-blue-500" />
          <div className="space-y-1 flex flex-col">
            <h1 className="text-3xl font-bold">Water Reminder</h1>
            <p className="text-sm text-gray-500">Acompanhe sua ingestão de água.</p>
          </div>
        </div>
        <Link href="/history" className="text-blue-600 hover:text-blue-800 mb-4 block">
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
      <main className="flex flex-col items-center justify-center p-4 mt-20">
        <div className="w-full h-full">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <WaterIntakeDisplay userId={userId} />
                <AddReminderForm userId={userId} />
              </div>
              <div>
                <Notifications userId={userId} />
              </div>
            </div>
          </div>
        </div>
        <HourlyNotifications userId={userId} />
      </main>
    </div>
  );
}
