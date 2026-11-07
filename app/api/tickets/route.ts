import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { listUserTickets } from "@/features/tickets/service.server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await listUserTickets(userId);
    return NextResponse.json({ registrations }, { status: 200 });
  } catch (error) {
    console.error("Could not load tickets.", error);
    return NextResponse.json(
      { error: "We could not load your tickets." },
      { status: 500 },
    );
  }
}
