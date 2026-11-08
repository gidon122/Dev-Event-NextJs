import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncAuthenticatedUser } from "@/lib/sync-user";
import { getUserDashboardData } from "@/features/dashboard/service.server";
import DashboardClient from "./DashboardClient";

export default async function StudentDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  // Ensure authenticated Clerk user is synchronized to MongoDB profile
  try {
    await syncAuthenticatedUser();
  } catch (error) {
    console.error("User profile sync failed:", error);
  }

  const user = await currentUser();
  const userName =
    user?.firstName ||
    user?.fullName?.split(" ")[0] ||
    user?.username ||
    "there";
  const dashboardData = await getUserDashboardData(userId);

  return <DashboardClient userName={userName} data={dashboardData} />;
}
