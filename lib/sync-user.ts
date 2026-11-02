import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import User, { IUser } from "@/models/user";

/**
 * Synchronizes the currently authenticated Clerk user with a MongoDB profile document.
 * Retrieves verified identity directly from Clerk's server API to prevent client tampering.
 * Performs an atomic upsert to avoid duplicate profile records.
 */
export async function syncAuthenticatedUser(): Promise<IUser | null> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Cannot synchronize an unauthenticated request");
  }

  const clerkUser = await currentUser();

  const primaryEmail =
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    undefined;

  const fullName = clerkUser
    ? clerkUser.fullName ||
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.username ||
      undefined
    : undefined;

  await connectToDatabase();

  const updatedProfile = await User.findOneAndUpdate(
    { clerkId: userId },
    {
      $set: {
        clerkId: userId,
        ...(fullName ? { name: fullName } : {}),
        ...(primaryEmail ? { email: primaryEmail } : {}),
      },
    },
    {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    }
  );

  return updatedProfile;
}
