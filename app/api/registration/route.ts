import { randomBytes } from "node:crypto";
import mongoose, { type ClientSession } from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/events";
import Registration from "@/models/registration";

interface RegistrationInput {
  eventId: string;
  name: string;
  department: string;
  level: string;
}

function isRegistrationInput(value: unknown): value is RegistrationInput {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;

  return (
    typeof body.eventId === "string" &&
    /^[\da-f]{24}$/i.test(body.eventId) &&
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    body.name.trim().length <= 120 &&
    typeof body.department === "string" &&
    body.department.trim().length > 0 &&
    body.department.trim().length <= 120 &&
    typeof body.level === "string" &&
    body.level.trim().length > 0 &&
    body.level.trim().length <= 30
  );
}

export async function POST(request: Request) {
  let session: ClientSession | undefined;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    if (!isRegistrationInput(body)) {
      return NextResponse.json(
        { error: "Provide a valid event, full name, department, and level." },
        { status: 400 },
      );
    }

    await connectToDatabase();
    const transactionSession = await mongoose.startSession();
    session = transactionSession;

    let ticketId = "";
    let registrationId = "";

    await transactionSession.withTransaction(async () => {
      const existingRegistration = await Registration.findOne({
        userId,
        eventId: body.eventId,
      })
        .select("_id")
        .session(transactionSession)
        .exec();

      if (existingRegistration) {
        throw new RegistrationRequestError(
          "You are already registered for this event.",
          400,
        );
      }

      const event = await Event.findOneAndUpdate(
        {
          _id: body.eventId,
          status: "live",
          endsAt: { $gte: new Date() },
          $expr: {
            $lt: [{ $ifNull: ["$registeredCount", 0] }, "$capacity"],
          },
        },
        { $inc: { registeredCount: 1 } },
        { new: true, session: transactionSession },
      ).exec();

      if (!event) {
        const existingEvent = await Event.findById(body.eventId)
          .session(transactionSession)
          .exec();
        if (!existingEvent || existingEvent.status !== "live") {
          throw new RegistrationRequestError("This event is not available.", 404);
        }
        if (existingEvent.endsAt < new Date()) {
          throw new RegistrationRequestError(
            "Registration for this event has closed.",
            400,
          );
        }
        throw new RegistrationRequestError("This event is full.", 400);
      }

      ticketId = `TKT-${randomBytes(16).toString("hex").toUpperCase()}`;
      const [registration] = await Registration.create(
        [
          {
            userId,
            eventId: body.eventId,
            ticketId,
            name: body.name.trim(),
            department: body.department.trim(),
            level: body.level.trim(),
            status: "CONFIRMED",
          },
        ],
        { session: transactionSession },
      );
      registrationId = registration._id.toString();
    });

    return NextResponse.json(
      { message: "Successfully registered.", ticketId, registrationId },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof RegistrationRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "You are already registered for this event." },
        { status: 400 },
      );
    }

    console.error("Registration request failed.", error);
    return NextResponse.json(
      { error: "We could not complete your registration." },
      { status: 500 },
    );
  } finally {
    await session?.endSession();
  }
}

class RegistrationRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "RegistrationRequestError";
  }
}
