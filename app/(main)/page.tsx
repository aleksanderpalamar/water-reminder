import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import WaterIntakeDisplay from "@/components/WaterIntakeDisplay";
import AddReminderForm from "@/components/AddReminderForm";
import Notifications from "@/components/Notifications";
import HourlyNotifications from "@/components/HourlyNotifications";
import { Header } from "@/components/ui/header";
import WaterCupsDisplay from "@/components/WaterCupsDisplay";
import { getReminders } from "@/lib/reminders";

export default async function Home() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const reminders = await getReminders(userId)
  const hasReminders = reminders.length > 0

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 mt-20">
        <div className="w-full h-full">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid grid-cols-1 gap-4">
                <WaterIntakeDisplay userId={userId} />
                {hasReminders ? (
                  <WaterCupsDisplay userId={userId} />
                ) : (
                  <AddReminderForm userId={userId} />
                )}
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
